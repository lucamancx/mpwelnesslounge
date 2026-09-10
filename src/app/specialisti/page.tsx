import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
// In a real scenario, this data would be fetched from Supabase
// import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Il Nostro Team | MP Wellness Lounge",
  description: "Conosci Martina Perani e il team di specialisti della MP Wellness Lounge.",
};

const mockSpecialists = [
  {
    id: 1,
    name: "Sara Alghisi",
    role: "Biologa Nutrizionista",
    bio: '"Ti aiuto a sentirti bene con te stessa, accompagnandoti in un percorso costruito su misura per te. Credo nel valore di abitudini sane e sostenibili, che ti permettano di ritrovare equilibrio, energia e benessere ogni giorno."',
    days: "Disponibile su appuntamento",
    image: "/sara-alghisi.png"
  },
  {
    id: 2,
    name: "Ester Capoferri",
    role: "Massoterapista MCB",
    bio: "\"Sono specializzata nel trattamento di cervicalgie e cefalee, e nel trattamento di linfedemi post-chirurgici. Sono abilitata a operare nel campo del massaggio sportivo e del benessere, e in ambito terapeutico. Da sempre sono affascinata dal potere del tocco consapevole e dalla capacità del corpo di ritrovare il proprio equilibrio.\"",
    days: "Disponibile su appuntamento",
    image: "/ester-capoferri.png"
  }
];

export default async function SpecialistiPage() {
  // const supabase = await createClient();
  // const { data: specialists } = await supabase.from('specialists').select('*').order('order_priority', { ascending: true });

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Martina Profile (Fixed Slot #1) */}
      <section className="w-full bg-brand-light py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-2/5 aspect-[3/4] bg-gray-200 rounded-t-full shadow-xl relative overflow-hidden">
             <Image
               src="/martina-perani.jpg"
               alt="Martina Perani"
               fill
               className="object-cover"
             />
          </div>
          <div className="w-full md:w-3/5">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-brand-teal/30 bg-white shadow-sm mb-6">
              <span className="text-xs font-semibold tracking-widest uppercase text-brand-dark">Amministratrice e Specialista</span>
            </div>
            <h1 className="font-serif text-5xl text-brand-dark mb-4">Martina Perani</h1>
            <h2 className="text-sm font-medium tracking-[0.2em] text-brand-teal uppercase mb-8">
              Estetica Avanzata & Maderoterapia
            </h2>
            <div className="text-muted-foreground font-light leading-relaxed space-y-4 mb-10 text-lg">
              <p>
                La mia missione è accompagnare ogni cliente in un percorso di benessere profondo e tangibile. Ho fondato la MP Wellness Lounge con l'obiettivo di creare un santuario dedicato all'eccellenza, dove scienza e relax si fondono.
              </p>
              <p>
                Specializzata in protocolli anti-age Miamo e tecniche avanzate di Maderoterapia, dedico la massima cura all'ascolto delle esigenze individuali, per garantire risultati che vanno oltre la superficie.
              </p>
            </div>
            <Link href="/prenota" className="bg-brand-dark text-white px-8 py-4 rounded-md uppercase tracking-widest text-sm font-medium hover:bg-brand-teal transition-all inline-flex items-center">
              Prenota con Martina <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Altri Specialisti (Dinamici) */}
      <section className="w-full py-24 px-6 md:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-brand-dark mb-4">I Nostri Specialisti</h2>
            <p className="text-muted-foreground tracking-widest uppercase text-sm">Professionisti ospiti d'eccellenza</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockSpecialists.map((spec) => (
              <div key={spec.id} className="bg-brand-light/30 border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                <div className="w-full aspect-[4/5] bg-brand-light flex items-center justify-center text-gray-400 relative">
                  {spec.image ? (
                    <Image src={spec.image} alt={spec.name} fill className="object-cover object-center" />
                  ) : (
                    <span>[Foto Specialista]</span>
                  )}
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <h3 className="font-serif text-2xl text-brand-dark mb-2">{spec.name}</h3>
                  <h4 className="text-xs font-semibold tracking-widest text-brand-teal uppercase mb-4">{spec.role}</h4>
                  <p className="text-muted-foreground font-light text-sm leading-relaxed mb-6">
                    {spec.bio}
                  </p>
                  <Link 
                    href="/prenota" 
                    className="block bg-white border border-border/50 rounded p-4 text-center hover:bg-brand-light transition-colors group-hover:border-brand-teal"
                  >
                    <p className="text-xs text-brand-dark font-medium uppercase tracking-wider flex items-center justify-center gap-2">
                      {spec.days} <ArrowRight className="w-3 h-3 text-brand-teal" />
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
