
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// We want to replace Next.js Image components with standard img tags
c = c.replace(
  /<Image\s+src="([^"]+)"\s+alt="([^"]+)"\s+fill\s+className="([^"]+)"\s*\/>/g,
  `<img src="$1" alt="$2" className="w-full h-full object-cover" />`
);

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

