
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// Remove the nested wrapper <div className="flex flex-wrap items-center gap-3 w-full"> inside actionButton
c = c.replace(
  /<div className="flex flex-wrap items-center gap-3 w-full">\s*(<Link[\s\S]*?<\/Link>)\s*(<a[\s\S]*?<\/a>)\s*<\/div>/g,
  `<>\n$1\n$2\n</>`
);

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

