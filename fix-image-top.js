
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// Change flex-col to flex-col-reverse for sections with direction="right" (which have text first in DOM)
c = c.replace(
  /direction="right" className="max-w-6xl mx-auto flex flex-col md:flex-row/g,
  `direction="right" className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row`
);

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

