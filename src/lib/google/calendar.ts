import { google, type calendar_v3 } from "googleapis";

// Fuso orario dell'attività. Tutti gli orari mostrati/prenotati sono in questo fuso.
export const BUSINESS_TZ = process.env.BOOKING_TIMEZONE || "Europe/Rome";

export const AVAILABILITY_CALENDAR_ID = process.env.GOOGLE_CALENDAR_AVAILABILITY_ID || "";
export const APPOINTMENTS_CALENDAR_ID = process.env.GOOGLE_CALENDAR_APPOINTMENTS_ID || "";

export function isCalendarConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_CLIENT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      AVAILABILITY_CALENDAR_ID &&
      APPOINTMENTS_CALENDAR_ID
  );
}

let cachedClient: calendar_v3.Calendar | null = null;

export function getCalendar(): calendar_v3.Calendar {
  if (cachedClient) return cachedClient;

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  // La private key nelle env di Vercel arriva con "\n" letterali: li riportiamo a newline.
  const privateKey = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    throw new Error("Credenziali Google Calendar mancanti (GOOGLE_CLIENT_EMAIL / GOOGLE_PRIVATE_KEY).");
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar.events", "https://www.googleapis.com/auth/calendar.readonly"],
  });

  cachedClient = google.calendar({ version: "v3", auth });
  return cachedClient;
}

export type BusyInterval = { start: Date; end: Date };

/** Eventi con orario (no all-day) di un calendario nella finestra indicata, ordinati per inizio. */
export async function listTimedEvents(
  calendarId: string,
  timeMin: Date,
  timeMax: Date
): Promise<Array<{ id: string; start: Date; end: Date; summary: string }>> {
  const calendar = getCalendar();
  const events: Array<{ id: string; start: Date; end: Date; summary: string }> = [];
  let pageToken: string | undefined;

  do {
    const res = await calendar.events.list({
      calendarId,
      timeMin: timeMin.toISOString(),
      timeMax: timeMax.toISOString(),
      singleEvents: true,
      orderBy: "startTime",
      maxResults: 2500,
      pageToken,
    });

    for (const ev of res.data.items || []) {
      if (ev.status === "cancelled") continue;
      const startStr = ev.start?.dateTime;
      const endStr = ev.end?.dateTime;
      if (!startStr || !endStr) continue; // salta eventi all-day
      events.push({
        id: ev.id || "",
        start: new Date(startStr),
        end: new Date(endStr),
        summary: ev.summary || "",
      });
    }
    pageToken = res.data.nextPageToken || undefined;
  } while (pageToken);

  return events;
}

export async function insertAppointment(params: {
  summary: string;
  description: string;
  start: Date;
  end: Date;
  attendeeEmail?: string;
  attendeeName?: string;
}): Promise<{ id: string; htmlLink: string | null; invitedAttendee: boolean }> {
  const calendar = getCalendar();
  const base: calendar_v3.Schema$Event = {
    summary: params.summary,
    description: params.description,
    start: { dateTime: params.start.toISOString(), timeZone: BUSINESS_TZ },
    end: { dateTime: params.end.toISOString(), timeZone: BUSINESS_TZ },
    reminders: { useDefault: true },
  };

  // Con un service account su un calendario Gmail senza Workspace, aggiungere invitati
  // può fallire (serve Domain-Wide Delegation). Proviamo con l'invitato e, se va male,
  // ricadiamo su un evento senza invitati: la prenotazione non deve mai perdersi.
  if (params.attendeeEmail) {
    try {
      const res = await calendar.events.insert({
        calendarId: APPOINTMENTS_CALENDAR_ID,
        sendUpdates: "all",
        requestBody: {
          ...base,
          attendees: [{ email: params.attendeeEmail, displayName: params.attendeeName }],
        },
      });
      return { id: res.data.id || "", htmlLink: res.data.htmlLink || null, invitedAttendee: true };
    } catch (err) {
      console.warn("[calendar] insert con invitato fallito, riprovo senza invitato:", err);
    }
  }

  const res = await calendar.events.insert({
    calendarId: APPOINTMENTS_CALENDAR_ID,
    sendUpdates: "none",
    requestBody: base,
  });
  return { id: res.data.id || "", htmlLink: res.data.htmlLink || null, invitedAttendee: false };
}
