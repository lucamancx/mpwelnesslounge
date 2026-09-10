
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// Standardize the "Prenota" and other Link buttons
// Current typical: "inline-flex items-center bg-brand-dark text-white px-6 py-3.5 rounded-md uppercase tracking-wider text-xs font-medium min-h-[44px] hover:bg-brand-teal transition-all shadow-md"
// We will replace the entire class string for standard buttons.

c = c.replace(
  /className="inline-flex items-center bg-brand-dark text-white px-6 py-3\.5 rounded-md uppercase tracking-wider text-xs font-medium min-h-\[44px\] hover:bg-brand-teal transition-all shadow-md"/g,
  `className="inline-flex items-center justify-center bg-brand-dark text-white px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-brand-teal transition-all shadow-sm"`
);

c = c.replace(
  /className="inline-flex items-center bg-white text-brand-dark px-6 py-3\.5 rounded-md uppercase tracking-wider text-xs font-medium min-h-\[44px\] hover:bg-brand-light transition-all shadow-md"/g,
  `className="inline-flex items-center justify-center bg-white text-brand-dark px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/90 transition-all shadow-sm"`
);

// The certification button
c = c.replace(
  /className="inline-flex items-center px-6 py-3\.5 rounded-md border border-brand-teal text-white uppercase tracking-wider text-xs font-medium min-h-\[44px\] hover:bg-brand-teal\/20 transition-all"/g,
  `className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/30 text-white uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/10 transition-all"`
);

// For the ExpandableText actionButton container: "flex flex-col sm:flex-row items-center gap-4"
// Let us make it flex-wrap so it wraps nicely
c = c.replace(
  /className="flex flex-col sm:flex-row items-center gap-4"/g,
  `className="flex flex-wrap items-center gap-3 w-full"`
);

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done page.tsx");

