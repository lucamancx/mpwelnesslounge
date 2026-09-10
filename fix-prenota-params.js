
const fs = require("fs");
let c = fs.readFileSync("src/app/prenota/page.tsx", "utf8");

// Add useSearchParams and Suspense
if (!c.includes("useSearchParams")) {
  c = c.replace(/import \{ (.*?) \} from "lucide-react";/, `import { $1 } from "lucide-react";\nimport { useSearchParams } from "next/navigation";\nimport { Suspense, useEffect } from "react";`);
}

// Rename PrenotaPage to PrenotaContent
c = c.replace(/export default function PrenotaPage/, "function PrenotaContent");

// In PrenotaContent, grab search params
const paramLogic = `
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const service = searchParams.get("service");
    const category = searchParams.get("category");
    if (service) {
      setFormData(prev => ({ ...prev, service }));
    }
    if (category) {
      setExpandedCategory(category);
    }
  }, [searchParams]);
`;

c = c.replace(/const \[formData, setFormData\] = useState\(\{(.*?)\}\);/s, (match) => {
  return match + "\n" + paramLogic;
});

// Add default export wrapping it in Suspense
const exportBlock = `
export default function PrenotaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-brand-light">Caricamento...</div>}>
      <PrenotaContent />
    </Suspense>
  );
}
`;

c = c + "\n" + exportBlock;

fs.writeFileSync("src/app/prenota/page.tsx", c);
console.log("Done");

