
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// Massaggio Donna in Gravidanza section
c = c.replace(
  /<h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6">Massaggio Donna in Gravidanza<\/h2>[\s\S]*?<ExpandableText\s+mobileOnly/g,
  match => match.replace("mobileOnly", "")
);

// Pulizia del Viso con Macchinario OZ section
c = c.replace(
  /<h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6">Pulizia del Viso con Macchinario OZ<\/h2>[\s\S]*?<ExpandableText\s+mobileOnly/g,
  match => match.replace("mobileOnly", "")
);

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

