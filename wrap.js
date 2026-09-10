
const fs = require("fs");
let content = fs.readFileSync("src/app/servizi/page.tsx", "utf8");

// Add import if not exists
if (!content.includes("AnimatedSection")) {
  content = content.replace(
    "import Link from \"next/link\";",
    "import Link from \"next/link\";\nimport { AnimatedSection } from \"@/components/AnimatedSection\";"
  );
}

// Replace the div with AnimatedSection for dark sections (Image left -> slide from left)
content = content.replace(
  /<section className="w-full bg-brand-dark text-brand-light[^>]*>([\s\S]*?)<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">/g,
  (match, p1) => {
    return match.replace(
      `<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">`,
      `<AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">`
    );
  }
);

// Replace the div with AnimatedSection for light sections (Image right -> slide from right)
content = content.replace(
  /<section className="w-full bg-brand-light py-16[^>]*>([\s\S]*?)<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">/g,
  (match, p1) => {
    return match.replace(
      `<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">`,
      `<AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12">`
    );
  }
);

// We must also change the closing </div> of those max-w-6xl blocks to </AnimatedSection>
// We can do this with a careful regex or by matching the structure.
// Instead of complex regex, let just do it by string replacement:
content = content.replace(/<\/div>\s*<\/section>/g, "</AnimatedSection>\n      </section>");

fs.writeFileSync("src/app/servizi/page.tsx", content);

