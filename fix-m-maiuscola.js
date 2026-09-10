
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

c = c.replace(/<h2 className="font-serif text-2xl md:text-4xl text-brand-dark mb-4 md:mb-6">maderoterapia<\/h2>/, "<h2 className=\"font-serif text-2xl md:text-4xl text-brand-dark mb-4 md:mb-6\">Maderoterapia</h2>");
c = c.replace(/service=maderoterapia&category/, "service=Maderoterapia&category");
c = c.replace(/{\/\* maderoterapia \*\//, "{/* Maderoterapia */}");

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

