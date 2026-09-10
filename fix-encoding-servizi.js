
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

c = c.replace(/Frana/g, "França");
c = c.replace(/Fran\\?a/g, "França");
c = c.replace(/Bamb/g, "Bambù");
c = c.replace(/pi/g, "più");
c = c.replace(/ /g, "è ");

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

