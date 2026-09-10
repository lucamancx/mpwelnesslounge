
const fs = require("fs");
let c = fs.readFileSync("src/app/prenota/page.tsx", "utf8");

const replacement = `const categories = [
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
  }
];`;

c = c.replace(/const categories = \[[\s\S]*?\];/, replacement);
fs.writeFileSync("src/app/prenota/page.tsx", c);
console.log("Done");

