import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import { findService } from "@/lib/services";
import { verifySlotBookable } from "@/lib/booking";
import { insertAppointment, isCalendarConfigured, BUSINESS_TZ } from "@/lib/google/calendar";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clientIp(request: Request): string {
  const fwd = request.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limit = rateLimit(`prenota:${ip}`, 5, 60 * 60 * 1000); // 5 prenotazioni / ora / IP
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Troppe richieste. Riprova più tardi o contattaci direttamente." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSec) } }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida." }, { status: 400 });
  }

  // Honeypot anti-bot: campo nascosto che un umano non compila mai.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 }); // finge successo
  }

  const serviceName = String(body.service || "").trim();
  const startISO = String(body.start || "").trim();
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const email = String(body.email || "").trim();
  const notes = String(body.notes || "").trim().slice(0, 1000);

  const service = findService(serviceName);
  if (!service) return NextResponse.json({ error: "Servizio non riconosciuto." }, { status: 400 });
  if (name.length < 2) return NextResponse.json({ error: "Inserisci il nome completo." }, { status: 400 });
  if (phone.replace(/\D/g, "").length < 6)
    return NextResponse.json({ error: "Inserisci un numero di telefono valido." }, { status: 400 });
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ error: "Inserisci un indirizzo email valido." }, { status: 400 });

  const start = DateTime.fromISO(startISO, { zone: BUSINESS_TZ });
  if (!start.isValid) return NextResponse.json({ error: "Orario non valido." }, { status: 400 });

  if (!isCalendarConfigured()) {
    return NextResponse.json(
      { error: "Il sistema di prenotazione online non è ancora attivo." },
      { status: 503 }
    );
  }

  const check = await verifySlotBookable(service, startISO);
  if (!check.ok) {
    return NextResponse.json({ error: check.reason }, { status: 409 });
  }

  const end = start.plus({ minutes: service.durationMin });

  try {
    const event = await insertAppointment({
      summary: `${service.name} — ${name}`,
      description: [
        `Servizio: ${service.name} (${service.time}, ${service.price})`,
        `Cliente: ${name}`,
        `Telefono: ${phone}`,
        `Email: ${email}`,
        notes ? `Note: ${notes}` : null,
        "",
        "Prenotazione ricevuta dal sito mpwelnesslounge.vercel.app",
      ]
        .filter(Boolean)
        .join("\n"),
      start: start.toJSDate(),
      end: end.toJSDate(),
      attendeeEmail: email,
      attendeeName: name,
    });

    return NextResponse.json({
      ok: true,
      eventId: event.id,
      invited: event.invitedAttendee,
      service: service.name,
      start: start.toISO(),
      end: end.toISO(),
      dateLabel: start.setLocale("it").toFormat("cccc d LLLL yyyy"),
      timeLabel: start.toFormat("HH:mm"),
    });
  } catch (err) {
    console.error("[prenota] errore creazione evento:", err);
    return NextResponse.json(
      { error: "Non è stato possibile completare la prenotazione. Riprova o contattaci." },
      { status: 502 }
    );
  }
}
