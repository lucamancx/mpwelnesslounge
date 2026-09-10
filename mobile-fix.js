
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

c = c.replace(/p-8 md:p-16/g, "p-5 md:p-16");
c = c.replace(/gap-10 md:gap-16/g, "gap-6 md:gap-16");
c = c.replace(/rounded-\[2\.5rem\]/g, "rounded-2xl md:rounded-[2.5rem]");
c = c.replace(/text-3xl md:text-4xl/g, "text-2xl md:text-4xl");
c = c.replace(/text-3xl md:text-5xl/g, "text-2xl md:text-5xl");
c = c.replace(/py-16 md:py-24/g, "py-10 md:py-24");
c = c.replace(/py-4 md:py-6/g, "py-3 md:py-6");
c = c.replace(/aspect-\[4\/3\]/g, "aspect-[16/10] md:aspect-[4/3]");
c = c.replace(/px-6 md:px-12/g, "px-4 md:px-12");

// Video preload
c = c.replace(/<video\s/g, "<video preload=\"none\" ");

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

