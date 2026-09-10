
const fs = require("fs");
let c = fs.readFileSync("src/app/prenota/page.tsx", "utf8");

// Add ChevronDown to imports if not there
if (!c.includes("ChevronDown")) {
  c = c.replace(/import { (.*?) } from "lucide-react";/, `import { $1, ChevronDown, ChevronUp } from "lucide-react";`);
}

// Add state for expanded category
if (!c.includes("expandedCategory")) {
  c = c.replace(
    /const \[formData, setFormData\] = useState\(\{/g,
    `const [expandedCategory, setExpandedCategory] = useState<string | null>("Trattamenti Corpo");\n  const [formData, setFormData] = useState({`
  );
}

const servicesData = `
const categories = [
  {
    name: "Trattamenti Corpo",
    services: [
      { name: "Metodo Renata França", time: "60 min", price: "€ 80" },
      { name: "Maderoterapia", time: "60 min", price: "€ 70" },
      { name: "Massaggio con il Bambù", time: "50 min", price: "€ 60" },
      { name: "Massaggio con Tecnica Vodder Addome", time: "40 min", price: "€ 50" },
      { name: "Massaggio Anticellulite e Drenante", time: "50 min", price: "€ 60" },
      { name: "Massaggio con la Coppetta", time: "40 min", price: "€ 55" },
      { name: "Massaggio Donna in Gravidanza", time: "50 min", price: "€ 60" },
      { name: "Massaggio con Candela Calda", time: "50 min", price: "€ 65" },
      { name: "Pressoterapia", time: "30 min", price: "€ 35" }
    ]
  },
  {
    name: "Trattamenti Viso",
    services: [
      { name: "Pulizia Viso Macchinario OZ", time: "60 min", price: "€ 70" },
      { name: "Massaggio Kobido Viso", time: "40 min", price: "€ 50" },
      { name: "Massaggio Connettivale al Viso", time: "40 min", price: "€ 45" },
      { name: "Massaggio con Gua Sha Viso", time: "30 min", price: "€ 40" }
    ]
  },
  {
    name: "Massoterapia (Ester Capoferri)",
    services: [
      { name: "Prima Seduta (Tariffa Promozionale)", time: "60 min", price: "€ 45" },
      { name: "Massaggio Decontratturante", time: "60 min", price: "€ 55" },
      { name: "Massaggio Decontratturante", time: "30 min", price: "€ 35" },
      { name: "Massaggio Decontratt. + Coppettazione", time: "40 min", price: "€ 45" },
      { name: "Massaggio Miorilassante", time: "60 min", price: "€ 55" },
      { name: "Massaggio Miorilassante (Distrettuale)", time: "30 min", price: "€ 35" },
      { name: "Linfodrenaggio Vodder Completo", time: "60 min", price: "€ 60" },
      { name: "Linfodrenaggio Vodder Addome", time: "40 min", price: "€ 45" },
      { name: "Linfodrenaggio Vodder Viso + Coppett.", time: "40 min", price: "€ 45" },
      { name: "Protocollo Linfedema", time: "60 min", price: "€ 60" },
      { name: "Protocollo Cervicalgia e Cefalea", time: "60 min", price: "€ 55" },
      { name: "Massaggio Sportivo Pre/Post Gara", time: "40 min", price: "€ 45" },
      { name: "Bendaggio Funzionale", time: "20 min", price: "€ 25" }
    ]
  }
];
`;

const step1Regex = /<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">\s*<h2 className="font-serif text-2xl text-brand-dark mb-6">Scegli il Trattamento<\/h2>[\s\S]*?<div className="flex justify-end mt-8">/g;

const newStep1 = `<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="font-serif text-2xl text-brand-dark mb-6">Scegli il Trattamento</h2>
              <div className="mb-8 space-y-4">
                {categories.map((cat) => (
                  <div key={cat.name} className="border border-border rounded-xl overflow-hidden bg-white">
                    <button 
                      onClick={() => setExpandedCategory(expandedCategory === cat.name ? null : cat.name)}
                      className="w-full flex items-center justify-between p-4 md:p-6 bg-brand-light/30 hover:bg-brand-light/60 transition-colors"
                    >
                      <h3 className="text-sm font-semibold tracking-widest text-brand-teal uppercase">{cat.name}</h3>
                      {expandedCategory === cat.name ? <ChevronUp className="w-5 h-5 text-brand-teal" /> : <ChevronDown className="w-5 h-5 text-brand-teal" />}
                    </button>
                    
                    <div className={\`transition-all duration-300 ease-in-out \${expandedCategory === cat.name ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}\`}>
                      <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 bg-white">
                        {cat.services.map((svc) => (
                          <button 
                            key={svc.name + svc.time}
                            onClick={() => setFormData({...formData, service: svc.name})}
                            className={\`p-4 text-left border rounded-xl transition-all flex flex-col justify-between \${formData.service === svc.name ? "border-brand-dark bg-brand-light/50 ring-1 ring-brand-dark shadow-sm" : "border-border hover:border-brand-teal hover:shadow-sm"}\`}
                          >
                            <div>
                              <span className="block font-medium text-brand-dark mb-1 text-sm md:text-base leading-tight">{svc.name}</span>
                              <span className="text-[11px] text-muted-foreground block mt-1">Durata: {svc.time}</span>
                            </div>
                            <div className="mt-3 pt-3 border-t border-border flex justify-between items-center">
                              <span className="text-xs font-bold text-brand-teal">{svc.price}</span>
                              {formData.service === svc.name && <CheckCircle2 className="w-4 h-4 text-brand-dark" />}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-8">`;

// Insert servicesData right before the export default function
c = c.replace(/export default function PrenotaPage/, servicesData + "\nexport default function PrenotaPage");
c = c.replace(step1Regex, newStep1);

fs.writeFileSync("src/app/prenota/page.tsx", c);
console.log("Done");

