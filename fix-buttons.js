
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// Make all buttons min-h-[44px] for touch targets
c = c.replace(/px-6 py-3 rounded-md uppercase tracking-wider text-xs font-medium/g, "px-6 py-3.5 rounded-md uppercase tracking-wider text-xs font-medium min-h-[44px]");

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done - buttons fixed");

