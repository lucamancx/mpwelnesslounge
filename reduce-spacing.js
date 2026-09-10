
const fs = require("fs");
let content = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// The wrappers around the cards currently use:
// className="w-full py-10 md:py-16 px-6 md:px-12 overflow-hidden"
content = content.replace(
  /className="w-full py-10 md:py-16 px-6 md:px-12 overflow-hidden"/g,
  `className="w-full py-4 md:py-6 px-6 md:px-12 overflow-hidden"`
);

// Check if there are any other py-16 md:py-20 remaining in sections (like the Hero) that need adjustment?
// The user only asked to reduce space "tra le cards", so the hero and footer spacing might be fine.

// Also, the Giornate Specialisti at the bottom has:
// className="w-full py-16 md:py-20 px-6 md:px-12 mb-12"
// I will bring it closer too just to match.
content = content.replace(
  /className="w-full py-16 md:py-20 px-6 md:px-12 mb-12"/g,
  `className="w-full py-6 md:py-10 px-6 md:px-12 mb-12"`
);

fs.writeFileSync("src/app/servizi/page.tsx", content);

