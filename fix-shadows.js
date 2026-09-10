
const fs = require("fs");
let content = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// White cards
content = content.replace(
  /bg-white p-8 md:p-16 rounded-\[2\.5rem\] shadow-2xl/g,
  "bg-white p-8 md:p-16 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-brand-dark/5"
);

// Dark cards
content = content.replace(
  /bg-brand-dark text-brand-light p-8 md:p-16 rounded-\[2\.5rem\] shadow-2xl/g,
  "bg-brand-dark text-brand-light p-8 md:p-16 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
);

// Inner media containers
content = content.replace(
  /overflow-hidden relative shadow-2xl/g,
  "overflow-hidden relative shadow-lg"
);

fs.writeFileSync("src/app/servizi/page.tsx", content);

