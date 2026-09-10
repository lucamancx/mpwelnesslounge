
const fs = require("fs");
let content = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

content = content.replace(/shadow-\[0_20px_50px_rgba\(0,0,0,0\.05\)\] /g, "");
content = content.replace(/shadow-\[0_20px_50px_rgba\(0,0,0,0\.15\)\]/g, "");
// Removing inner shadows from media elements too
content = content.replace(/ shadow-lg/g, "");

fs.writeFileSync("src/app/servizi/page.tsx", content);

