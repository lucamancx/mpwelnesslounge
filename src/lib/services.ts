// Catalogo servizi condiviso tra la pagina /prenota e le API di prenotazione.
// L'identità del servizio è il `name` (gli stessi valori usati nei link ?service= da /servizi).

export type Service = {
  name: string;
  time: string; // etichetta leggibile, es. "60 min"
  durationMin: number; // durata effettiva usata per calcolare gli slot
  price: string;
};

export type ServiceCategory = {
  name: string;
  services: Service[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    name: "Trattamenti Corpo",
    services: [
      { name: "Metodo Renata França", time: "60 min", durationMin: 60, price: "€ 80" },
      { name: "Maderoterapia", time: "60 min", durationMin: 60, price: "€ 70" },
      { name: "Massaggio con il Bambù", time: "50 min", durationMin: 50, price: "€ 60" },
      { name: "Massaggio con Tecnica Vodder Addome", time: "40 min", durationMin: 40, price: "€ 50" },
      { name: "Massaggio Anticellulite e Drenante Manuale", time: "50 min", durationMin: 50, price: "€ 60" },
      { name: "Massaggio con la Coppetta", time: "40 min", durationMin: 40, price: "€ 55" },
      { name: "Massaggio Donna in Gravidanza", time: "50 min", durationMin: 50, price: "€ 60" },
      { name: "Massaggio con Candela Calda", time: "50 min", durationMin: 50, price: "€ 65" },
      { name: "Pressoterapia", time: "30 min", durationMin: 30, price: "€ 35" },
    ],
  },
  {
    name: "Trattamenti Viso",
    services: [
      { name: "Pulizia del Viso con Macchinario OZ", time: "60 min", durationMin: 60, price: "€ 70" },
      { name: "Massaggio Kobido Viso", time: "40 min", durationMin: 40, price: "€ 50" },
      { name: "Massaggio Connettivale al Viso", time: "40 min", durationMin: 40, price: "€ 45" },
      { name: "Massaggio con le Gua Sha Viso", time: "30 min", durationMin: 30, price: "€ 40" },
    ],
  },
  {
    name: "Massoterapia (Ester Capoferri)",
    services: [
      { name: "Prima Seduta (Tariffa Promozionale)", time: "60 min", durationMin: 60, price: "€ 45" },
      { name: "Massaggio Decontratturante", time: "60 min", durationMin: 60, price: "€ 55" },
      { name: "Massaggio Decontratturante (30 min)", time: "30 min", durationMin: 30, price: "€ 35" },
      { name: "Massaggio Decontratt. + Coppettazione", time: "40 min", durationMin: 40, price: "€ 45" },
      { name: "Massaggio Miorilassante", time: "60 min", durationMin: 60, price: "€ 55" },
      { name: "Massaggio Miorilassante (Distrettuale)", time: "30 min", durationMin: 30, price: "€ 35" },
      { name: "Linfodrenaggio Vodder Completo", time: "60 min", durationMin: 60, price: "€ 60" },
      { name: "Linfodrenaggio Vodder Addome", time: "40 min", durationMin: 40, price: "€ 45" },
      { name: "Linfodrenaggio Vodder Viso + Coppett.", time: "40 min", durationMin: 40, price: "€ 45" },
      { name: "Protocollo Linfedema", time: "60 min", durationMin: 60, price: "€ 60" },
      { name: "Protocollo Cervicalgia e Cefalea", time: "60 min", durationMin: 60, price: "€ 55" },
      { name: "Massaggio Sportivo Pre/Post Gara", time: "40 min", durationMin: 40, price: "€ 45" },
      { name: "Bendaggio Funzionale", time: "20 min", durationMin: 20, price: "€ 25" },
    ],
  },
  {
    name: "Beauty Essentials",
    services: [
      { name: "Manicure", time: "60 min", durationMin: 60, price: "€ 40" },
      { name: "Pedicure", time: "60 min", durationMin: 60, price: "€ 45" },
    ],
  },
];

export const ALL_SERVICES: Service[] = SERVICE_CATEGORIES.flatMap((c) => c.services);

export function findService(name: string | null | undefined): Service | undefined {
  if (!name) return undefined;
  return ALL_SERVICES.find((s) => s.name === name);
}

export function categoryOf(serviceName: string): string | undefined {
  return SERVICE_CATEGORIES.find((c) => c.services.some((s) => s.name === serviceName))?.name;
}
