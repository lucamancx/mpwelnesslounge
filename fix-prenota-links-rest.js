
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

let count = 0;
c = c.replace(/href="\/prenota"/g, (match, offset) => {
  if (offset > 1000) {
    count++;
    if (count === 1) return `href="/prenota?service=Metodo%20Renata%20Fran%C3%A7a&category=Trattamenti%20Corpo"`;
    if (count === 2) return `href="/prenota?service=Massaggio%20con%20il%20Bamb%C3%B9&category=Trattamenti%20Corpo"`;
  }
  return match;
});

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

