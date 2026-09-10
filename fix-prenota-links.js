
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

const mappings = [
  { match: /<h2[^>]*>Metodo Renata França<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Metodo%20Renata%20Fran%C3%A7a&category=Trattamenti%20Corpo" },
  { match: /<h2[^>]*>Maderoterapia<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Maderoterapia&category=Trattamenti%20Corpo" },
  { match: /<h2[^>]*>Massaggio con il Bambù<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Massaggio%20con%20il%20Bamb%C3%B9&category=Trattamenti%20Corpo" },
  { match: /<h2[^>]*>Massaggio con Tecnica Vodder Addome<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Massaggio%20con%20Tecnica%20Vodder%20Addome&category=Trattamenti%20Corpo" },
  { match: /<h2[^>]*>Massaggio Anticellulite e Drenante Manuale<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Massaggio%20Anticellulite%20e%20Drenante&category=Trattamenti%20Corpo" },
  { match: /<h2[^>]*>Massaggio con la Coppetta<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Massaggio%20con%20la%20Coppetta&category=Trattamenti%20Corpo" },
  { match: /<h2[^>]*>Massaggio Donna in Gravidanza<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Massaggio%20Donna%20in%20Gravidanza&category=Trattamenti%20Corpo" },
  { match: /<h2[^>]*>Massaggio con Candela Calda<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Massaggio%20con%20Candela%20Calda&category=Trattamenti%20Corpo" },
  { match: /<h2[^>]*>Massaggio Connettivale al Viso<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Massaggio%20Connettivale%20al%20Viso&category=Trattamenti%20Viso" },
  { match: /<h2[^>]*>Massaggio Kobido Viso<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Massaggio%20Kobido%20Viso&category=Trattamenti%20Viso" },
  { match: /<h2[^>]*>Massaggio con le Gua Sha Viso<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Massaggio%20con%20Gua%20Sha%20Viso&category=Trattamenti%20Viso" },
  { match: /<h2[^>]*>Pressoterapia<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Pressoterapia&category=Trattamenti%20Corpo" },
  { match: /<h2[^>]*>Pulizia del Viso con Macchinario OZ<\/h2>[\s\S]*?href="\/prenota"/, url: "/prenota?service=Pulizia%20Viso%20Macchinario%20OZ&category=Trattamenti%20Viso" }
];

for (const map of mappings) {
  c = c.replace(map.match, (matched) => {
    return matched.replace(`href="/prenota"`, `href="${map.url}"`);
  });
}

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

