"use client";

import { useState, useCallback, Suspense, useEffect } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Loader2,
  CalendarX2,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { SERVICE_CATEGORIES, findService } from "@/lib/services";

type Slot = { start: string; end: string; label: string };
type DayAvailability = { date: string; label: string; slots: Slot[] };

function PrenotaContent() {
  const [step, setStep] = useState(1);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Trattamenti Corpo");
  const [formData, setFormData] = useState({
    service: "",
    start: "",
    dateLabel: "",
    timeLabel: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
    website: "", // honeypot
  });

  const [availability, setAvailability] = useState<DayAvailability[] | null>(null);
  const [availLoading, setAvailLoading] = useState(false);
  const [availError, setAvailError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{
    service: string;
    dateLabel: string;
    timeLabel: string;
    invited: boolean;
  } | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    const service = searchParams.get("service");
    const category = searchParams.get("category");
    if (service && findService(service)) {
      setFormData((prev) => ({ ...prev, service }));
    }
    if (category) setExpandedCategory(category);
  }, [searchParams]);

  const loadAvailability = useCallback(async (serviceName: string) => {
    setAvailLoading(true);
    setAvailError(null);
    setAvailability(null);
    setSelectedDate(null);
    try {
      const res = await fetch(`/api/disponibilita?service=${encodeURIComponent(serviceName)}&days=30`);
      const data = await res.json();
      if (!res.ok) {
        setAvailError(data.error || "Impossibile caricare la disponibilità.");
        return;
      }
      setAvailability(data.days);
      if (data.days.length > 0) setSelectedDate(data.days[0].date);
    } catch {
      setAvailError("Errore di connessione. Riprova.");
    } finally {
      setAvailLoading(false);
    }
  }, []);

  const goToStep2 = () => {
    setStep(2);
    if (formData.service) loadAvailability(formData.service);
  };

  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));

  const selectSlot = (slot: Slot, dayLabel: string) => {
    setFormData((prev) => ({
      ...prev,
      start: slot.start,
      dateLabel: dayLabel,
      timeLabel: slot.label,
    }));
  };

  const canSubmit =
    formData.name.trim().length >= 2 &&
    formData.phone.replace(/\D/g, "").length >= 6 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) &&
    formData.start !== "";

  const submitBooking = async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/prenota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: formData.service,
          start: formData.start,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          notes: formData.notes.trim(),
          website: formData.website,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Non è stato possibile completare la prenotazione.");
        // se lo slot è saltato, torniamo allo step 2 e ricarichiamo
        if (res.status === 409) {
          setStep(2);
          loadAvailability(formData.service);
        }
        return;
      }
      setConfirmation({
        service: data.service,
        dateLabel: data.dateLabel,
        timeLabel: data.timeLabel,
        invited: Boolean(data.invited),
      });
      setStep(4);
    } catch {
      setSubmitError("Errore di connessione. Riprova.");
    } finally {
      setSubmitting(false);
    }
  };

  const currentDay = availability?.find((d) => d.date === selectedDate) || null;
  const selectedService = findService(formData.service);

  return (
    <div className="flex flex-col min-h-screen bg-brand-light">
      <section className="w-full py-16 px-6 md:px-12 text-center bg-white border-b border-border">
        <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">Prenota un Appuntamento</h1>
        <p className="text-muted-foreground font-light text-sm uppercase tracking-widest">
          Semplice, veloce, in 3 step
        </p>
      </section>

      <section className="flex-1 w-full max-w-4xl mx-auto py-12 px-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10"></div>
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center bg-brand-light px-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg mb-2 transition-colors ${
                  step >= num ? "bg-brand-dark text-white" : "bg-white border-2 border-border text-muted-foreground"
                }`}
              >
                {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
              </div>
              <span
                className={`text-xs uppercase tracking-wider ${
                  step >= num ? "text-brand-dark font-semibold" : "text-muted-foreground"
                }`}
              >
                {num === 1 ? "Servizio" : num === 2 ? "Data e Ora" : "Dati"}
              </span>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 md:p-12 rounded-2xl shadow-sm border border-border">
          {/* STEP 1 — Servizio */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-serif text-2xl text-brand-dark mb-6">Scegli il Trattamento</h2>
              <div className="mb-8 space-y-4">
                {SERVICE_CATEGORIES.map((cat) => (
                  <div key={cat.name} className="border border-border rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                      className="w-full flex items-center justify-between p-4 md:p-6 bg-brand-light/30 hover:bg-brand-light/60 transition-colors"
                    >
                      <h3 className="text-sm font-semibold tracking-widest text-brand-teal uppercase text-left">
                        {cat.name}
                      </h3>
                      {expandedCategory === cat.name ? (
                        <ChevronUp className="w-5 h-5 text-brand-teal shrink-0" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-brand-teal shrink-0" />
                      )}
                    </button>

                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        expandedCategory === cat.name ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 bg-white">
                        {cat.services.map((svc) => (
                          <button
                            key={svc.name}
                            onClick={() => setFormData({ ...formData, service: svc.name })}
                            className={`p-4 text-left border rounded-xl transition-all flex flex-col justify-between ${
                              formData.service === svc.name
                                ? "border-brand-dark bg-brand-light/50 ring-1 ring-brand-dark shadow-sm"
                                : "border-border hover:border-brand-teal hover:shadow-sm"
                            }`}
                          >
                            <div>
                              <span className="block font-medium text-brand-dark mb-1 text-sm md:text-base leading-tight">
                                {svc.name}
                              </span>
                              <span className="text-[11px] text-muted-foreground block mt-1">
                                Durata: {svc.time}
                              </span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                              <span className="text-xs font-bold text-brand-teal">{svc.price}</span>
                              {formData.service === svc.name && (
                                <CheckCircle2 className="w-4 h-4 text-brand-dark" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-8">
                <button
                  onClick={goToStep2}
                  disabled={!formData.service}
                  className="bg-brand-dark text-white px-8 py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Avanti <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 — Data e Ora */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-serif text-2xl text-brand-dark mb-2">Seleziona Data e Ora</h2>
              {selectedService && (
                <p className="text-sm text-muted-foreground mb-6">
                  {selectedService.name} · {selectedService.time} · {selectedService.price}
                </p>
              )}

              {availLoading && (
                <div className="py-16 flex flex-col items-center text-muted-foreground">
                  <Loader2 className="w-8 h-8 animate-spin mb-3" />
                  <p className="text-sm">Carico la disponibilità…</p>
                </div>
              )}

              {availError && !availLoading && (
                <div className="py-12 px-6 text-center border-2 border-dashed border-border rounded-xl">
                  <p className="text-muted-foreground mb-4">{availError}</p>
                  <button
                    onClick={() => loadAvailability(formData.service)}
                    className="text-brand-teal text-sm uppercase tracking-wider font-medium hover:text-brand-dark"
                  >
                    Riprova
                  </button>
                </div>
              )}

              {!availLoading && !availError && availability && availability.length === 0 && (
                <div className="py-12 px-6 text-center border-2 border-dashed border-border rounded-xl">
                  <CalendarX2 className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-muted-foreground">
                    Nessun orario disponibile al momento per questo trattamento. Riprova tra qualche
                    giorno oppure contattaci direttamente.
                  </p>
                </div>
              )}

              {!availLoading && !availError && availability && availability.length > 0 && (
                <div className="mb-8">
                  {/* Selettore giorni */}
                  <div className="flex gap-2 overflow-x-auto pb-3 -mx-1 px-1">
                    {availability.map((day) => (
                      <button
                        key={day.date}
                        onClick={() => setSelectedDate(day.date)}
                        className={`shrink-0 px-4 py-2 rounded-full text-xs md:text-sm capitalize border transition-colors ${
                          selectedDate === day.date
                            ? "bg-brand-dark text-white border-brand-dark"
                            : "bg-white text-brand-dark border-border hover:border-brand-teal"
                        }`}
                      >
                        {day.label}
                      </button>
                    ))}
                  </div>

                  {/* Griglia orari */}
                  {currentDay && (
                    <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-2 md:gap-3">
                      {currentDay.slots.map((slot) => (
                        <button
                          key={slot.start}
                          onClick={() => selectSlot(slot, currentDay.label)}
                          className={`py-3 rounded-lg border text-sm font-medium transition-all ${
                            formData.start === slot.start
                              ? "bg-brand-dark text-white border-brand-dark ring-1 ring-brand-dark"
                              : "bg-white text-brand-dark border-border hover:border-brand-teal"
                          }`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  className="text-muted-foreground hover:text-brand-dark text-sm uppercase tracking-wider font-medium flex items-center"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Indietro
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.start}
                  className="bg-brand-dark text-white px-8 py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Avanti <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Dati */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-serif text-2xl text-brand-dark mb-2">I Tuoi Dati</h2>
              {formData.start && (
                <p className="text-sm text-muted-foreground mb-6 capitalize">
                  {selectedService?.name} — {formData.dateLabel}, ore {formData.timeLabel}
                </p>
              )}
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">
                      Telefono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal"
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Riceverai qui la conferma con l&apos;invito al calendario.
                  </p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">
                    Note (opzionale)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal"
                  />
                </div>
                {/* Honeypot: nascosto ai clienti, riempito solo dai bot */}
                <input
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  className="hidden"
                  aria-hidden="true"
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3 mb-6">
                  {submitError}
                </p>
              )}

              <div className="flex justify-between mt-8">
                <button
                  onClick={handleBack}
                  disabled={submitting}
                  className="text-muted-foreground hover:text-brand-dark text-sm uppercase tracking-wider font-medium flex items-center disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" /> Indietro
                </button>
                <button
                  onClick={submitBooking}
                  disabled={!canSubmit || submitting}
                  className="bg-brand-dark text-white px-8 py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-teal transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Invio…
                    </>
                  ) : (
                    "Conferma Prenotazione"
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 — Conferma */}
          {step === 4 && confirmation && (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center text-brand-teal mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-serif text-3xl text-brand-dark mb-4">Prenotazione Confermata</h2>
              <div className="text-muted-foreground font-light mb-8 max-w-md mx-auto space-y-1">
                <p className="text-brand-dark font-medium">{confirmation.service}</p>
                <p className="capitalize">
                  {confirmation.dateLabel} — ore {confirmation.timeLabel}
                </p>
                <p className="text-sm pt-3">
                  {confirmation.invited
                    ? "Ti abbiamo inviato un'email di conferma con l'invito al calendario. A presto!"
                    : "Abbiamo registrato la tua richiesta. Ti contatteremo per confermare. A presto!"}
                </p>
              </div>
              <a
                href="/"
                className="inline-block bg-brand-dark text-white px-8 py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-teal transition-all"
              >
                Torna alla Home
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function PrenotaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-brand-light">Caricamento…</div>
      }
    >
      <PrenotaContent />
    </Suspense>
  );
}
