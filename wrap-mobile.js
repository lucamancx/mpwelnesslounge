
const fs = require("fs");
let c = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// Add mobileOnly to existing ExpandableText components (Gravidanza and OZ)
c = c.replace(
  /<ExpandableText\n                shortContent/g,
  "<ExpandableText\n                mobileOnly\n                shortContent"
);

// Wrap all standalone <p> text blocks that have br/br pattern (multi-paragraph) 
// These are the ones inside flex-1 text-center md:text-left divs
// Pattern: <p className="text-brand-light/80 ... or text-muted-foreground ..."> ... </p>

// For dark sections (text-brand-light/80)
c = c.replace(
  /(<p className="text-brand-light\/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left">)\s*([\s\S]*?)\s*(<\/p>\s*<div className="flex justify-center md:justify-start mt-2">)/g,
  function(match, open, content, closing) {
    // Skip if already inside ExpandableText
    if (content.includes("ExpandableText")) return match;
    return `<div className="text-brand-light/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4}>
                <p>${content.trim()}</p>
              </ExpandableText>
            </div>
            <div className="flex justify-center md:justify-start mt-2">`;
  }
);

// For light sections (text-muted-foreground)
c = c.replace(
  /(<p className="text-muted-foreground leading-relaxed font-light mb-8 text-sm md:text-base text-left">)\s*([\s\S]*?)\s*(<\/p>\s*<div className="flex justify-center md:justify-start mt-2">)/g,
  function(match, open, content, closing) {
    if (content.includes("ExpandableText")) return match;
    return `<div className="text-muted-foreground leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4}>
                <p>${content.trim()}</p>
              </ExpandableText>
            </div>
            <div className="flex justify-center md:justify-start mt-2">`;
  }
);

fs.writeFileSync("src/app/servizi/page.tsx", c);
console.log("Done");

