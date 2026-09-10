import Image from "next/image"; // Note: we'll use placeholder divs for now or lucide icons if no images are available
import { ArrowRight, Sparkles, Activity, Flower2, Apple } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section — full screen, mobile friendly */}
      <section className="relative w-full h-[82svh] min-h-[520px] md:h-[calc(100svh-4rem)] flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Foto: riempie l'hero, scala bilanciata per non risultare sgranata */}
        <Image
          src="/hero-bg.png"
          alt="Maderoterapia MP Wellness Lounge"
          fill
          sizes="100vw"
          quality={90}
          className="object-cover object-center z-0"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/25 z-0"></div>

        {/* Contenuto: badge + titolo + sottotitolo dentro l'hero */}
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center gap-4 sm:gap-5 md:gap-6">
          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-brand-sage/60 bg-brand-sage/80 backdrop-blur-md shadow-sm">
            <span className="text-[10px] md:text-xs font-semibold tracking-widest uppercase text-white text-center">1ª Miamo Lounge di Brescia</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white leading-tight drop-shadow-lg">
            L'Eccellenza del Benessere
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light max-w-2xl px-2 drop-shadow-md">
            Un'oasi di pace dedicata alla cura del viso, del corpo e al riequilibrio interiore. Protocolli avanzati e cosmeceutica d'élite.
          </p>
        </div>
      </section>

      {/* Bottone fuori dall'immagine, sotto — colore del logo su sfondo bianco */}
      <div className="w-full bg-white flex justify-center px-4 py-8 md:py-10">
        <Link href="/servizi" className="bg-white text-brand-teal border-2 border-brand-teal px-6 py-4 md:px-8 rounded-md uppercase tracking-widest text-xs md:text-sm font-semibold hover:bg-brand-teal hover:text-white transition-all flex items-center gap-2 shadow-md">
          Scopri i nostri trattamenti <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Presentazione */}
      <section className="w-full max-w-6xl mx-auto py-16 md:py-24 px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="aspect-square bg-gray-200 rounded-tl-[100px] rounded-br-[100px] overflow-hidden relative">
          {/* Immagine Martina */}
          <Image
            src="/martina-perani.jpg"
            alt="Martina Perani"
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2 className="font-serif text-4xl text-brand-dark mb-6">La Filosofia MP</h2>
          <h3 className="text-sm font-semibold tracking-[0.25em] text-brand-teal uppercase mb-6">Wellness Lounge di Martina Perani</h3>
          <p className="text-muted-foreground leading-relaxed mb-6 font-light">
            MP Wellness Lounge nasce dalla visione di offrire un approccio integrato e scientifico alla bellezza. Come prima Miamo Lounge ufficiale della provincia, garantiamo protocolli cosmeceutici certificati e risultati tangibili.
          </p>
          <p className="text-muted-foreground leading-relaxed font-light">
            Il nostro ambiente esclusivo e ovattato è studiato per allontanare lo stress quotidiano e permetterti di affidarti a mani esperte, in un percorso su misura per te.
          </p>
        </div>
      </section>

      {/* Macro Servizi */}
      <section className="w-full bg-white py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">I Nostri Servizi</h2>
            <p className="text-muted-foreground tracking-widest uppercase text-xs md:text-sm">Percorsi personalizzati</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="group cursor-pointer p-8 border border-border rounded-lg hover:border-brand-teal hover:shadow-lg transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-brand-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-dark transition-colors">
                <Sparkles className="w-8 h-8 text-brand-dark group-hover:text-brand-light" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-brand-dark mb-3">Viso Anti-Age</h3>
              <p className="text-sm text-muted-foreground font-light">Protocolli rigeneranti e purificanti avanzati.</p>
            </div>
            
            <div className="group cursor-pointer p-8 border border-border rounded-lg hover:border-brand-teal hover:shadow-lg transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-brand-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-dark transition-colors">
                <Activity className="w-8 h-8 text-brand-dark group-hover:text-brand-light" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-brand-dark mb-3">Rimodellamento</h3>
              <p className="text-sm text-muted-foreground font-light">Trattamenti corpo per ritrovare l'armonia.</p>
            </div>
            
            <div className="group cursor-pointer p-8 border border-border rounded-lg hover:border-brand-teal hover:shadow-lg transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-brand-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-dark transition-colors">
                <Flower2 className="w-8 h-8 text-brand-dark group-hover:text-brand-light" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-brand-dark mb-3">Maderoterapia</h3>
              <p className="text-sm text-muted-foreground font-light">Drenaggio e tono con strumenti in legno nobile.</p>
            </div>
            
            <div className="group cursor-pointer p-8 border border-border rounded-lg hover:border-brand-teal hover:shadow-lg transition-all text-center">
              <div className="w-16 h-16 mx-auto bg-brand-light rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-dark transition-colors">
                <Apple className="w-8 h-8 text-brand-dark group-hover:text-brand-light" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-xl text-brand-dark mb-3">Nutrizione</h3>
              <p className="text-sm text-muted-foreground font-light">Check-up e percorsi clinici personalizzati.</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/servizi" className="inline-flex items-center text-brand-teal font-medium uppercase tracking-wider text-sm hover:text-brand-dark transition-colors">
              Scopri tutti i protocolli <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Orari Banner */}
      <section className="w-full bg-brand-dark text-brand-light py-16 md:py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-10 md:mb-12">I Nostri Orari</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 md:gap-y-6 text-base md:text-xl font-light">
            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Lunedì</span><span>09:00 - 19:00</span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-2 opacity-50">
              <span>Martedì</span><span>CHIUSO</span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Mercoledì</span><span>13:00 - 21:00</span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Giovedì</span><span>09:00 - 19:00</span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Venerdì</span><span>09:00 - 19:00</span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-2">
              <span>Sabato</span><span>08:00 - 15:00</span>
            </div>
            <div className="flex justify-between border-b border-white/20 pb-2 opacity-50 md:col-span-2 md:w-1/2 md:mx-auto">
              <span>Domenica</span><span>CHIUSO</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
