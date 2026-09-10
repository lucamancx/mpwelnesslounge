import { DateTime, Interval } from "luxon";
import type { Service } from "@/lib/services";
import {
  AVAILABILITY_CALENDAR_ID,
  APPOINTMENTS_CALENDAR_ID,
  BUSINESS_TZ,
  listTimedEvents,
} from "@/lib/google/calendar";

// ---- Parametri di prenotazione ----
export const BOOKING_CONFIG = {
  bufferMin: 10, // pausa minima prima/dopo un appuntamento
  slotStepMin: 15, // granularità degli orari proposti
  minLeadHours: 12, // preavviso minimo per prenotare
  maxDays: 45, // quanto in là si può prenotare
};

export type Slot = { start: string; end: string; label: string };
export type DayAvailability = { date: string; label: string; slots: Slot[] };
export type AvailabilityResult = {
  timezone: string;
  service: { name: string; durationMin: number; price: string };
  days: DayAvailability[];
};

function overlaps(aStart: DateTime, aEnd: DateTime, bStart: DateTime, bEnd: DateTime): boolean {
  return aStart < bEnd && bStart < aEnd;
}

async function loadWindow(fromISO: string, toISO: string) {
  const from = new Date(fromISO);
  const to = new Date(toISO);
  const [availability, appointments] = await Promise.all([
    listTimedEvents(AVAILABILITY_CALENDAR_ID, from, to),
    listTimedEvents(APPOINTMENTS_CALENDAR_ID, from, to),
  ]);
  return { availability, appointments };
}

/**
 * Slot liberi per un servizio: fasce del calendario "Disponibilità" tagliate nella durata
 * del servizio, meno gli appuntamenti già presi, meno il preavviso minimo.
 */
export async function getAvailableSlots(service: Service, days: number): Promise<AvailabilityResult> {
  const now = DateTime.now().setZone(BUSINESS_TZ);
  const earliest = now.plus({ hours: BOOKING_CONFIG.minLeadHours });
  const horizonDays = Math.min(Math.max(days, 1), BOOKING_CONFIG.maxDays);
  const windowEnd = now.plus({ days: horizonDays }).endOf("day");

  const { availability, appointments } = await loadWindow(now.toISO()!, windowEnd.toISO()!);

  const duration = service.durationMin;
  const buffer = BOOKING_CONFIG.bufferMin;
  const step = BOOKING_CONFIG.slotStepMin;

  const busy = appointments.map((a) => ({
    start: DateTime.fromJSDate(a.start).setZone(BUSINESS_TZ),
    end: DateTime.fromJSDate(a.end).setZone(BUSINESS_TZ),
  }));

  const byDate = new Map<string, Set<string>>();

  for (const block of availability) {
    const blockStart = DateTime.fromJSDate(block.start).setZone(BUSINESS_TZ);
    const blockEnd = DateTime.fromJSDate(block.end).setZone(BUSINESS_TZ);

    // primo start allineato allo step
    let cursor = blockStart;
    const minuteOffset = cursor.minute % step;
    if (minuteOffset !== 0) cursor = cursor.plus({ minutes: step - minuteOffset }).startOf("minute");

    while (cursor.plus({ minutes: duration }) <= blockEnd) {
      const slotStart = cursor;
      const slotEnd = cursor.plus({ minutes: duration });

      if (slotStart >= earliest) {
        const clashes = busy.some((b) =>
          overlaps(
            slotStart.minus({ minutes: buffer }),
            slotEnd.plus({ minutes: buffer }),
            b.start,
            b.end
          )
        );
        if (!clashes) {
          const date = slotStart.toISODate()!;
          if (!byDate.has(date)) byDate.set(date, new Set());
          byDate.get(date)!.add(slotStart.toISO()!);
        }
      }
      cursor = cursor.plus({ minutes: step });
    }
  }

  const days_: DayAvailability[] = [...byDate.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, starts]) => {
      const slots: Slot[] = [...starts]
        .sort()
        .map((iso) => {
          const s = DateTime.fromISO(iso, { zone: BUSINESS_TZ });
          const e = s.plus({ minutes: duration });
          return { start: s.toISO()!, end: e.toISO()!, label: s.toFormat("HH:mm") };
        });
      const d = DateTime.fromISO(date, { zone: BUSINESS_TZ }).setLocale("it");
      return { date, label: d.toFormat("cccc d LLLL"), slots };
    });

  return {
    timezone: BUSINESS_TZ,
    service: { name: service.name, durationMin: duration, price: service.price },
    days: days_,
  };
}

export type BookingCheck = { ok: true } | { ok: false; reason: string };

/** Ricontrolla, al momento della conferma, che lo slot sia ancora prenotabile (anti race-condition). */
export async function verifySlotBookable(service: Service, startISO: string): Promise<BookingCheck> {
  const start = DateTime.fromISO(startISO, { zone: BUSINESS_TZ });
  if (!start.isValid) return { ok: false, reason: "Orario non valido." };

  const end = start.plus({ minutes: service.durationMin });
  const now = DateTime.now().setZone(BUSINESS_TZ);

  if (start < now.plus({ hours: BOOKING_CONFIG.minLeadHours })) {
    return { ok: false, reason: "Questo orario non è più prenotabile con il preavviso richiesto." };
  }
  if (start > now.plus({ days: BOOKING_CONFIG.maxDays })) {
    return { ok: false, reason: "Questo orario è troppo lontano nel tempo." };
  }

  const pad = 60; // minuti di margine per la query
  const { availability, appointments } = await loadWindow(
    start.minus({ minutes: pad }).toISO()!,
    end.plus({ minutes: pad }).toISO()!
  );

  const insideAvailability = availability.some((block) => {
    const bs = DateTime.fromJSDate(block.start).setZone(BUSINESS_TZ);
    const be = DateTime.fromJSDate(block.end).setZone(BUSINESS_TZ);
    return Interval.fromDateTimes(bs, be).engulfs(Interval.fromDateTimes(start, end));
  });
  if (!insideAvailability) {
    return { ok: false, reason: "Questa fascia oraria non è più disponibile." };
  }

  const buffer = BOOKING_CONFIG.bufferMin;
  const clash = appointments.some((a) => {
    const as = DateTime.fromJSDate(a.start).setZone(BUSINESS_TZ);
    const ae = DateTime.fromJSDate(a.end).setZone(BUSINESS_TZ);
    return overlaps(start.minus({ minutes: buffer }), end.plus({ minutes: buffer }), as, ae);
  });
  if (clash) {
    return { ok: false, reason: "Questo orario è appena stato prenotato da qualcun altro." };
  }

  return { ok: true };
}
