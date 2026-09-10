import { ArrowRight, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Miamo Lounge | MP Wellness Lounge",
  description: "La prima Miamo Lounge ufficiale della provincia di Brescia. Cosmeceutica di lusso.",
};

const miamoProducts = [
  { name: "Hyaluronic Acid L.H. Serum", desc: "Idratazione profonda e azione rimpolpante intensa.", tag: "Best Seller", image: "https://backend.drmax.it/media/catalog/product/h/y/hyaluronic-acid-lh-serum.png" },
  { name: "Age Defense Glow", desc: "Protezione e luminosità per combattere i segni del tempo.", tag: "Novità", image: "https://miamo.com/media/catalog/product/cache/2b04d65873c75e537bdcb6ed51b214f3/a/g/age-reverse-glow-pdp_eng_1.jpg" },
  { name: "Vitamin C Action", desc: "Siero antiossidante per un colorito uniforme e radioso.", tag: "Iconic", image: "https://cdn11.bigcommerce.com/s-hwsgtcscaq/images/stencil/1280x1280/products/454866/306556/Miamo_Longevity_Plus_Vitamin_C_Action_Serum__89068.1722295633.jpg" },
  { name: "Micellar Cleansing Water", desc: "Detersione delicata ma profonda per tutti i tipi di pelle.", tag: "Essential", image: "https://miamo.com/media/catalog/product/cache/2b04d65873c75e537bdcb6ed51b214f3/m/t/mtc015p-micellar-water_2.jpg" }
];

export default function MiamoLoungePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-[#FFFFFF] py-16 md:py-24 px-6 md:px-12 text-center border-b border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#002D62] to-transparent opacity-20"></div>
        <h1 className="font-serif text-3xl md:text-6xl text-[#1F2937] mb-4 md:mb-6 tracking-tight">Miamo Lounge</h1>
        <h2 className="text-[10px] md:text-sm font-medium tracking-[0.2em] text-[#002D62] uppercase mb-6 md:mb-8 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4" /> Prima e Unica a Brescia
        </h2>
        <p className="text-[#4B5563] font-light max-w-2xl mx-auto text-sm md:text-lg leading-relaxed mb-10">
          MP Wellness Lounge è orgogliosa di essere la prima <strong>Miamo Lounge</strong> ufficiale della provincia. 
          Uniamo i nostri protocolli esclusivi alla potenza clinica della cosmeceutica Miamo per offrirti risultati senza compromessi.
        </p>
        <a href="https://miamo.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[10px] md:text-sm uppercase tracking-widest text-[#002D62] hover:text-[#0B2545] font-medium transition-colors border-b border-[#002D62] pb-1">
          Visita il sito ufficiale Miamo <ExternalLink className="w-4 h-4 ml-2" />
        </a>
      </section>

      {/* Vetrina Prodotti */}
      <section className="w-full max-w-6xl mx-auto py-16 md:py-24 px-6 md:px-12">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="font-serif text-2xl md:text-3xl text-[#1F2937] mb-4">I Nostri Best-Seller Miamo</h2>
          <p className="text-[#4B5563] font-light uppercase tracking-widest text-xs md:text-sm">Disponibili in cabina e per il mantenimento domiciliare</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {miamoProducts.map((product, idx) => (
            <div key={idx} className="group relative bg-[#F9FAFB] border border-gray-100 rounded-xl p-8 text-center hover:shadow-xl hover:border-gray-200 transition-all duration-300">
              <div className="absolute top-4 right-4 bg-[#002D62] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
                {product.tag}
              </div>
              <div className="w-32 h-40 mx-auto bg-white rounded-lg shadow-sm mb-6 relative overflow-hidden flex items-center justify-center border border-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <h3 className="font-serif text-lg text-[#1F2937] mb-3 font-semibold">{product.name}</h3>
              <p className="text-sm text-[#4B5563] font-light leading-relaxed mb-6 h-16">{product.desc}</p>
              <Link href="/prenota" className="text-xs uppercase tracking-widest text-[#002D62] font-semibold hover:underline">
                Richiedi in salone
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Philosophy Banner */}
      <section className="w-full bg-[#0B2545] text-white py-24 px-6 md:px-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl mb-8">La Scienza della Pelle Sana</h2>
          <p className="font-light leading-relaxed text-white/80 mb-10 text-lg">
            I prodotti Miamo sono formulati con principi attivi purissimi e ad altissima concentrazione. Nel nostro centro, applichiamo protocolli rigorosi per garantire l'assorbimento ottimale e l'efficacia sinergica di ogni trattamento.
          </p>
          <Link href="/prenota" className="bg-white text-[#0B2545] px-8 py-4 rounded-md uppercase tracking-widest text-sm font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
            Prenota un Check-Up Viso <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>
    </div>
  );
}
