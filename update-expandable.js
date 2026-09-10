
const fs = require("fs");
let content = fs.readFileSync("src/components/ExpandableText.tsx", "utf8");

// Add actionButton to the interface
content = content.replace(
  /buttonLabelCollapse\?: string;/,
  "buttonLabelCollapse?: string;\n  actionButton?: ReactNode;"
);

// Add actionButton to the destructured props
content = content.replace(
  /buttonLabelCollapse = "Mostra meno"/,
  "buttonLabelCollapse = \"Mostra meno\",\n  actionButton"
);

// Modify the button rendering to wrap in a flex container with the actionButton
content = content.replace(
  /<button[\s\S]*?<\/button>/,
  `<div className="flex flex-wrap items-center gap-4 mt-2">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center text-xs font-semibold uppercase tracking-wider text-inherit bg-transparent border border-current px-6 py-3 rounded-md hover:bg-black/5 transition-colors"
        >
          {isExpanded ? buttonLabelCollapse : buttonLabel}
          {isExpanded ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </button>
        {actionButton}
      </div>`
);

fs.writeFileSync("src/components/ExpandableText.tsx", content);

