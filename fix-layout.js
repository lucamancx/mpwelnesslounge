
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// We want to find:
// </ExpandableText>
// </div>
// <div className="flex justify-center md:justify-start mt-2">
//   <Link ...>...</Link>
// </div>
// And change it to:
// </ExpandableText>
// </div>
// Wait, better to put it IN the ExpandableText.
// <ExpandableText mobileOnly lines={4} actionButton={<Link ...>...</Link>}>

// Regex to capture the ExpandableText and the button below it
const regex = /<ExpandableText\s+mobileOnly\s+lines=\{4\}>\s*([\s\S]*?)\s*<\/ExpandableText>\s*<\/div>\s*<div className="flex justify-center md:justify-start mt-2">\s*(<Link[\s\S]*?<\/Link>)\s*<\/div>/g;

c = c.replace(regex, (match, p1, p2) => {
  return `<ExpandableText mobileOnly lines={4} actionButton={
                ${p2}
              }>
                ${p1}
              </ExpandableText>
            </div>`;
});

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

