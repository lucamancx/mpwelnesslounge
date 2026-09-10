"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronDown, ChevronUp } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";


const categories = [
  {
    name: "Trattamenti Corpo",
    services: [
      { name: "Metodo Renata França", time: "60 min", price: "€ 80" },
      { name: "Maderoterapia", time: "60 min", price: "€ 70" },
      { name: "Massaggio con il Bambù", time: "50 min", price: "€ 60" },
      { name: "Massaggio con Tecnica Vodder Addome", time: "40 min", price: "€ 50" },
      { name: "Massaggio Anticellulite e Drenante Manuale", time: "50 min", price: "€ 60" },
      { name: "Massaggio con la Coppetta", time: "40 min", price: "€ 55" },
      { name: "Massaggio Donna in Gravidanza", time: "50 min", price: "€ 60" },
      { name: "Massaggio con Candela Calda", time: "50 min", price: "€ 65" },
      { name: "Pressoterapia", time: "30 min", price: "€ 35" }
    ]
  },
  {
    name: "Trattamenti Viso",
    services: [
      { name: "Pulizia del Viso con Macchinario OZ", time: "60 min", price: "€ 70" },
      { name: "Massaggio Kobido Viso", time: "40 min", price: "€ 50" },
      { name: "Massaggio Connettivale al Viso", time: "40 min", price: "€ 45" },
      { name: "Massaggio con le Gua Sha Viso", time: "30 min", price: "€ 40" }
    ]
  },
  {
    name: "Massoterapia (Ester Capoferri)",
    services: [
      { name: "Prima Seduta (Tariffa Promozionale)", time: "60 min", price: "€ 45" },
      { name: "Massaggio Decontratturante", time: "60 min", price: "€ 55" },
      { name: "Massaggio Decontratturante", time: "30 min", price: "€ 35" },
      { name: "Massaggio Decontratt. + Coppettazione", time: "40 min", price: "€ 45" },
      { name: "Massaggio Miorilassante", time: "60 min", price: "€ 55" },
      { name: "Massaggio Miorilassante (Distrettuale)", time: "30 min", price: "€ 35" },
      { name: "Linfodrenaggio Vodder Completo", time: "60 min", price: "€ 60" },
      { name: "Linfodrenaggio Vodder Addome", time: "40 min", price: "€ 45" },
      { name: "Linfodrenaggio Vodder Viso + Coppett.", time: "40 min", price: "€ 45" },
      { name: "Protocollo Linfedema", time: "60 min", price: "€ 60" },
      { name: "Protocollo Cervicalgia e Cefalea", time: "60 min", price: "€ 55" },
      { name: "Massaggio Sportivo Pre/Post Gara", time: "40 min", price: "€ 45" },
      { name: "Bendaggio Funzionale", time: "20 min", price: "€ 25" }
    ]
  },
  {
    name: "Beauty Essentials",
    services: [
      { name: "Pedicure", time: "60 min", price: "€ 45" }
    ]
  }
];

function PrenotaContent() {
  const [step, setStep] = useState(1);
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Trattamenti Corpo");
  const [formData, setFormData] = useState({
    service: "",
    specialist: "",
    date: "",
    time: "",
    name: "",
    phone: "",
    email: "",
    notes: ""
  });

  const searchParams = useSearchParams();
  
  useEffect(() => {
    const service = searchParams.get("service");
    const category = searchParams.get("category");
    if (service) {
      setFormData(prev => ({ ...prev, service }));
    }
    if (category) {
      setExpandedCategory(category);
    }
  }, [searchParams]);


  const handleNext = () => setStep(prev => Math.min(prev + 1, 4));
  const handleBack = () => setStep(prev => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col min-h-screen bg-brand-light">
      <section className="w-full py-16 px-6 md:px-12 text-center bg-white border-b border-border">
        <h1 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">Prenota un Appuntamento</h1>
        <p className="text-muted-foreground font-light text-sm uppercase tracking-widest">Semplice, veloce, in 3 step</p>
      </section>

      <section className="flex-1 w-full max-w-4xl mx-auto py-12 px-6">
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10"></div>
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center bg-brand-light px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-serif text-lg mb-2 transition-colors ${step >= num ? 'bg-brand-dark text-white' : 'bg-white border-2 border-border text-muted-foreground'}`}>
                {step > num ? <CheckCircle2 className="w-5 h-5" /> : num}
              </div>
              <span className={`text-xs uppercase tracking-wider ${step >= num ? 'text-brand-dark font-semibold' : 'text-muted-foreground'}`}>
                {num === 1 ? 'Servizio' : num === 2 ? 'Data e Ora' : 'Dati'}
              </span>
            </div>
          ))}
        </div>

        {/* Forms */}
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-serif text-2xl text-brand-dark mb-6">Scegli il Trattamento</h2>
              <div className="mb-8 space-y-4">
                {categories.map((cat) => (
                  <div key={cat.name} className="border border-border rounded-xl overflow-hidden bg-white">
                    <button 
                      onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                      className="w-full flex items-center justify-between p-4 md:p-6 bg-brand-light/30 hover:bg-brand-light/60 transition-colors"
                    >
                      <h3 className="text-sm font-semibold tracking-widest text-brand-teal uppercase">{cat.name}</h3>
                      {expandedCategory === cat.name ? <ChevronUp className="w-5 h-5 text-brand-teal" /> : <ChevronDown className="w-5 h-5 text-brand-teal" />}
                    </button>
                    
                    <div className={`transition-all duration-300 ease-in-out ${expandedCategory === cat.name ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 bg-white">
                        {cat.services.map((svc) => (
                          <button 
                            key={svc.name + svc.time}
                            onClick={() => setFormData({...formData, service: svc.name})}
                            className={`p-4 text-left border rounded-xl transition-all flex flex-col justify-between ${formData.service === svc.name ? "border-brand-dark bg-brand-light/50 ring-1 ring-brand-dark shadow-sm" : "border-border hover:border-brand-teal hover:shadow-sm"}`}
                          >
                            <div>
                              <span className="block font-medium text-brand-dark mb-1 text-sm md:text-base leading-tight">{svc.name}</span>
                              <span className="text-[11px] text-muted-foreground block mt-1">Durata: {svc.time}</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                              <span className="text-xs font-bold text-brand-teal">{svc.price}</span>
                              {formData.service === svc.name && <CheckCircle2 className="w-4 h-4 text-brand-dark" />}
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
                  onClick={handleNext}
                  disabled={!formData.service}
                  className="bg-brand-dark text-white px-8 py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Avanti <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-serif text-2xl text-brand-dark mb-6">Seleziona Data e Ora</h2>
              <div className="mb-8 p-12 text-center border-2 border-dashed border-border rounded-xl">
                <p className="text-muted-foreground mb-4">Qui andrà integrato il calendario Supabase per mostrare gli slot disponibili.</p>
                {/* Mock selection */}
                <button onClick={() => setFormData({...formData, date: '2023-11-20', time: '10:00'})} className="bg-brand-light text-brand-dark px-4 py-2 rounded-md border border-brand-teal text-sm">
                  Simula Selezione Slot (20 Nov, 10:00)
                </button>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={handleBack} className="text-muted-foreground hover:text-brand-dark text-sm uppercase tracking-wider font-medium flex items-center">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Indietro
                </button>
                <button 
                  onClick={handleNext}
                  disabled={!formData.date}
                  className="bg-brand-dark text-white px-8 py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-teal transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  Avanti <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-serif text-2xl text-brand-dark mb-6">I Tuoi Dati</h2>
              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Nome Completo</label>
                    <input type="text" className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Telefono</label>
                    <input type="tel" className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Email</label>
                  <input type="email" className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Note (opzionale)</label>
                  <textarea rows={3} className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal"></textarea>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button onClick={handleBack} className="text-muted-foreground hover:text-brand-dark text-sm uppercase tracking-wider font-medium flex items-center">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Indietro
                </button>
                <button 
                  onClick={() => setStep(4)}
                  className="bg-brand-dark text-white px-8 py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-teal transition-all flex items-center"
                >
                  Conferma Prenotazione
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12 animate-in zoom-in duration-500">
              <div className="w-20 h-20 bg-brand-light rounded-full flex items-center justify-center text-brand-teal mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="font-serif text-3xl text-brand-dark mb-4">Prenotazione Confermata</h2>
              <p className="text-muted-foreground font-light mb-8 max-w-md mx-auto">
                Grazie per aver scelto MP Wellness Lounge. Riceverai a breve un'email con i dettagli del tuo appuntamento.
              </p>
              <a href="/" className="inline-block bg-brand-dark text-white px-8 py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-teal transition-all">
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-brand-light">Caricamento...</div>}>
      <PrenotaContent />
    </Suspense>
  );
}
