
const fs = require("fs");
let c = fs.readFileSync("src/app/prenota/page.tsx", "utf8");

// Replace the replacement character with Euro symbol
c = c.replace(//g, "€");

fs.writeFileSync("src/app/prenota/page.tsx", c);
console.log("Done");

