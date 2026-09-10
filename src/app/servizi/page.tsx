import Image from "next/image";
import { ArrowRight, Activity, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ExpandableText } from "@/components/ExpandableText";
export const metadata = {
  title: "Servizi e Trattamenti | MP Wellness Lounge",
  description: "Esplora i nostri trattamenti viso, corpo, maderoterapia e le consulenze nutrizionali.",
};

export default function ServiziPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F6]">
      {/* Hero Section */}
      <section className="w-full py-10 md:py-24 px-4 md:px-12 text-center bg-[#F9F9F6]">
        <h1 className="font-serif text-2xl md:text-5xl text-brand-dark mb-4">Trattamenti & Protocolli</h1>
        <p className="text-sm md:text-base text-brand-dark font-light max-w-2xl mx-auto">
          Scopri la nostra selezione di servizi d'eccellenza, studiati per valorizzare la tua bellezza naturale e ripristinare il tuo benessere psicofisico.
        </p>
      </section>


      {/* Metodo Renata Franca */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-16 bg-brand-dark text-brand-light p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] ">
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <video preload="none" 
              src="/pollo.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6">Metodo Renata França</h2>
            <h3 className="text-xs md:text-sm font-bold tracking-widest text-white uppercase mb-6">Esperienza Premium Autentica</h3>            <div className="text-brand-light/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4}
                actionButton={
                  <>
<Link href="/prenota?service=Metodo%20Renata%20Fran%C3%A7a&category=Trattamenti%20Corpo" className="inline-flex items-center justify-center bg-white text-brand-dark px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/90 transition-all shadow-sm">
                      Prenota Subito <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
<a href="https://sparenatafranca.com/encontre-sua-terapeuta/martina_1_2_3_4_5_6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-6 py-3.5 rounded-full border border-white/30 text-white uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/10 transition-all">
                      La Nostra Certificazione
                    </a>
</>
                }
              >
                <p>
                  Il nostro corpo merita un'attenzione esclusiva: il corpo si alleggerisce, i tessuti si distendono e il benessere si percepisce subito, grazie a un lavoro profondo che parte dall'interno. Questo protocollo rivoluzionario non è un semplice massaggio, ma un trattamento d'élite insegnato da un numero ristrettissimo di maestre abilitate in tutto il continente, garanzia di un'esperienza premium e rigorosamente autentica.
                  <br/><br/>
                  I risultati sono visibili e misurabili già al termine della prima seduta: l'addome si sgonfia visibilmente ridefinendo il punto vita, le gambe ritrovano una straordinaria sensazione di leggerezza e slancio, l'ovale del viso appare naturalmente liftato e compatto, e i tuoi abiti preferiti tornano subito a calzare con perfetta armonia.
                </p>
              </ExpandableText>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Maderoterapia */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16 bg-white p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] border border-brand-dark/5">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl text-brand-dark mb-4 md:mb-6">Maderoterapia</h2>
            <h3 className="text-xs md:text-sm font-semibold tracking-widest text-brand-teal uppercase mb-6">La specialità della casa</h3>
            <div className="text-muted-foreground leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Maderoterapia&category=Trattamenti%20Corpo" className="inline-flex items-center justify-center bg-brand-dark text-white px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-brand-teal transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>
                  Una tecnica di massaggio colombiana che utilizza strumenti in legno nobile per stimolare e riequilibrare l'energia, ridurre lo stress e alleviare dolori muscolari e articolari.
                  Oltre all'effetto rilassante, la maderoterapia è straordinariamente efficace per il drenaggio linfatico, la tonificazione muscolare e la riduzione della cellulite.
                </p>
              </ExpandableText>
            </div>
          </div>
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] bg-brand-light/10 rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <video preload="none" 
              src="/maderoterapia.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* Massaggio con il Bambù */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-16 bg-brand-dark text-brand-light p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] ">
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <img src="/bambu.png" alt="Massaggio con il Bambù" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6">Massaggio con il Bambù</h2>
            <h3 className="text-xs md:text-sm font-bold tracking-widest text-white uppercase mb-6">Dinamico e Avvolgente</h3>
            <div className="text-brand-light/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Massaggio%20con%20il%20Bamb%C3%B9&category=Trattamenti%20Corpo" className="inline-flex items-center justify-center bg-white text-brand-dark px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/90 transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>Il massaggio con il bambù è un trattamento corpo dinamico e avvolgente che utilizza canne di bambù di diverse forme e dimensioni per eseguire movimenti fluidi, pressioni e rullamenti mirati. 
              <br/><br/>
              È ideale per gli sportivi e per chi desidera prendersi cura del proprio corpo attraverso un trattamento energetico che può contribuire a rendere la pelle più liscia, tonica e uniforme.</p>
              </ExpandableText>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Massaggio con Tecnica Vodder Addome */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16 bg-white p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] border border-brand-dark/5">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl text-brand-dark mb-4 md:mb-6">Massaggio con Tecnica Vodder Addome</h2>
            <h3 className="text-xs md:text-sm font-semibold tracking-widest text-brand-teal uppercase mb-6">Leggerezza e Rilassamento</h3>
            <p className="text-muted-foreground leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              È una tecnica di drenaggio linfatico manuale caratterizzata da movimenti delicati, lenti e ritmici eseguiti con manualità precise. 
              <br/><br/>
              Nella zona addominale, il trattamento è pensato per favorire il naturale flusso della linfa, contribuendo a ridurre la sensazione di gonfiore e pesantezza e regalando una piacevole sensazione di leggerezza e rilassamento.
            </p>
            <div className="flex justify-center md:justify-start mt-2">
              <Link href="/prenota?service=Massaggio%20con%20Tecnica%20Vodder%20Addome&category=Trattamenti%20Corpo" className="inline-flex items-center justify-center bg-brand-dark text-white px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-brand-teal transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] bg-brand-light/10 rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <video preload="none" 
              src="/vodder.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* Massaggio Anticellulite e Drenante */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-16 bg-brand-dark text-brand-light p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] ">
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <img src="/anticellulite.png" alt="Massaggio Anticellulite e Drenante Manuale" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6">Massaggio Anticellulite e Drenante Manuale</h2>
            <h3 className="text-xs md:text-sm font-bold tracking-widest text-white uppercase mb-6">Leggerezza e Armonia</h3>
            <div className="text-brand-light/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Massaggio%20Anticellulite%20e%20Drenante&category=Trattamenti%20Corpo" className="inline-flex items-center justify-center bg-white text-brand-dark px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/90 transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>È un trattamento studiato per lavorare in modo mirato sulle zone maggiormente interessate da ritenzione di liquidi, gonfiore e inestetismi della cellulite. Un trattamento mirato per riattivare, drenare e prendersi cura del corpo, ritrovando giorno dopo giorno una sensazione di leggerezza e armonia.</p>
              </ExpandableText>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Massaggio con la Coppetta */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16 bg-white p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] border border-brand-dark/5">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl text-brand-dark mb-4 md:mb-6">Massaggio con la Coppetta</h2>
            <h3 className="text-xs md:text-sm font-semibold tracking-widest text-brand-teal uppercase mb-6">Azione Drenante e Rimodellante</h3>
            <div className="text-muted-foreground leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Massaggio%20con%20la%20Coppetta&category=Trattamenti%20Corpo" className="inline-flex items-center justify-center bg-brand-dark text-white px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-brand-teal transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>Il massaggio con la coppetta è un trattamento corpo che utilizza specifiche coppette in silicone per creare una delicata aspirazione sulla pelle, combinata con movimenti di scorrimento e manualità mirate. L’azione della coppetta favorisce la stimolazione della microcircolazione e del drenaggio. 
              <br/><br/>
              È un trattamento particolarmente indicato per chi desidera un’azione drenante, anticellulite e rimodellante, integrando il benessere del massaggio con un lavoro più intenso sulle zone che presentano gonfiore o irregolarità cutanee.</p>
              </ExpandableText>
            </div>
          </div>
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] bg-brand-light/10 rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <img src="/coppetta.png" alt="Massaggio con la Coppetta" className="w-full h-full object-cover" />
          </div>
        </AnimatedSection>
      </section>

      {/* Massaggio Donna in Gravidanza */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-16 bg-brand-dark text-brand-light p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] ">
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] bg-brand-dark/50 rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <video preload="none" 
              src="/uiu.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6">Massaggio Donna in Gravidanza</h2>
            <h3 className="text-xs md:text-sm font-bold tracking-widest text-white uppercase mb-6">Ascolto e Benessere</h3>
            <div className="text-brand-light/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText
                
                shortContent={
                  <p>
                    Il massaggio in gravidanza è un trattamento delicato e avvolgente, pensato per accompagnare dolcemente la donna durante i naturali cambiamenti del corpo, offrendo un momento prezioso di puro relax, ascolto interiore e benessere profondo.
                  </p>
                }
                expandedContent={
                  <div className="mt-4 border-t border-white/20 pt-4 space-y-4">
                    <p>
                      Attraverso manualità estremamente dolci e mirate, il trattamento si adatta in modo empatico alle esigenze specifiche della futura mamma. Questa attenzione dedicata aiuta a sciogliere le tensioni muscolari, specialmente a carico della schiena e delle articolazioni, e contribuisce a migliorare la circolazione, riducendo significativamente la sensazione di gonfiore e pesantezza alle gambe.
                    </p>
                    <p>
                      Ogni seduta viene eseguita prestando la massima cura alla postura e all'assoluto comfort della donna, utilizzando supporti e posizioni sicure che rispettano rigorosamente le diverse fasi della gestazione. Un'esperienza coccolante che favorisce il rilassamento totale, regalando una meravigliosa sensazione di armonia e connessione, per preparare corpo e mente ad accogliere una nuova vita.
                    </p>
                  </div>
                }
                actionButton={
                  <Link href="/prenota?service=Massaggio%20Donna%20in%20Gravidanza&category=Trattamenti%20Corpo" className="inline-flex items-center justify-center bg-white text-brand-dark px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/90 transition-all shadow-sm">
                    Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                }
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Massaggio con Candela Calda */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16 bg-white p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] border border-brand-dark/5">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl text-brand-dark mb-4 md:mb-6">Massaggio con Candela Calda</h2>
            <h3 className="text-xs md:text-sm font-semibold tracking-widest text-brand-teal uppercase mb-6">Rituale Sensoriale</h3>
            <div className="text-muted-foreground leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Massaggio%20con%20Candela%20Calda&category=Trattamenti%20Corpo" className="inline-flex items-center justify-center bg-brand-dark text-white px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-brand-teal transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>Il massaggio con candela calda è un rituale sensoriale e avvolgente che unisce il piacere di un massaggio rilassante alla morbidezza di un olio caldo e profumato, ottenuto dalla fusione di una candela cosmetica specifica per il trattamento. 
              <br/><br/>
              Il calore dell’olio avvolge delicatamente la pelle, mentre manualità lente e armoniose aiutano a sciogliere le tensioni e favorire un profondo stato di relax e benessere. Un’esperienza ideale per chi desidera concedersi una pausa dalla quotidianità, lasciandosi coccolare dal calore, dalle fragranze e dalla manualità del trattamento.</p>
              </ExpandableText>
            </div>
          </div>
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] bg-brand-light/10 rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <img src="/candela.png" alt="Massaggio con Candela Calda" className="w-full h-full object-cover" />
          </div>
        </AnimatedSection>
      </section>

      {/* Massaggio Connettivale al Viso */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-16 bg-brand-dark text-brand-light p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] ">
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <img src="/viso.png" alt="Massaggio Connettivale al Viso" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6">Massaggio Connettivale al Viso</h2>
            <h3 className="text-xs md:text-sm font-bold tracking-widest text-white uppercase mb-6">Distende e Rivitalizza</h3>
            <div className="text-brand-light/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Massaggio%20Connettivale%20al%20Viso&category=Trattamenti%20Viso" className="inline-flex items-center justify-center bg-white text-brand-dark px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/90 transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>Il massaggio connettivale al viso è un trattamento manuale mirato che lavora sui tessuti attraverso manovre specifiche, profonde e mirate pensate per stimolare, distendere e rivitalizzare la pelle del viso. 
              <br/><br/>
              La particolare manualità aiuta a favorire la microcircolazione e a sciogliere le tensioni accumulate, soprattutto nella zona della fronte, mandibolare e contorno del viso. 
              <br/><br/>
              Il trattamento dona alla pelle un aspetto più fresco, disteso e luminoso, valorizzando naturalmente i lineamenti. È ideale per chi desidera un trattamento viso che unisca benessere, rilassamento e cura estetica, senza l’utilizzo di tecniche invasive.</p>
              </ExpandableText>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Massaggio Kobido Viso */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16 bg-white p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] border border-brand-dark/5">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl text-brand-dark mb-4 md:mb-6">Massaggio Kobido Viso</h2>
            <h3 className="text-xs md:text-sm font-semibold tracking-widest text-brand-teal uppercase mb-6">L'Eterna Giovinezza</h3>
            <div className="text-muted-foreground leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Massaggio%20Kobido%20Viso&category=Trattamenti%20Viso" className="inline-flex items-center justify-center bg-brand-dark text-white px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-brand-teal transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>Il Kobido è un antico rituale di bellezza giapponese, conosciuto come il “massaggio dell’eterna giovinezza”. È un trattamento viso raffinato e dinamico che combina manualità delicate e profonde, sfioramenti, pressioni, impastamenti e movimenti ritmici. 
              <br/><br/>
              La particolarità del Kobido è l’alternanza di ritmi e intensità che rendono il trattamento un’esperienza completa. Le diverse tecniche aiutano a favorire il drenaggio dei liquidi e a creare un vero e proprio lifting manuale della pelle. 
              <br/><br/>
              Il risultato, subito visibile, sarà quello di un incarnato più luminoso, tonico e rigenerato.</p>
              </ExpandableText>
            </div>
          </div>
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] bg-brand-light/10 rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <img src="/kobido.png" alt="Massaggio Kobido Viso" className="w-full h-full object-cover" />
          </div>
        </AnimatedSection>
      </section>

      {/* Massaggio con le Gua Sha Viso */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-16 bg-brand-dark text-brand-light p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] ">
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <img src="/guasha.png" alt="Massaggio con le Gua Sha Viso" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6">Massaggio con le Gua Sha Viso</h2>
            <h3 className="text-xs md:text-sm font-bold tracking-widest text-white uppercase mb-6">Luminosità e Vitalità</h3>
            <div className="text-brand-light/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Massaggio%20con%20Gua%20Sha%20Viso&category=Trattamenti%20Viso" className="inline-flex items-center justify-center bg-white text-brand-dark px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/90 transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>Il massaggio con le gua sha è un rituale di bellezza di ispirazione orientale che utilizza una speciale pietra levigata, generalmente di quarzo o di giada, per eseguire movimenti delicati, ma nello stesso tempo mirati. 
              <br/><br/>
              La pelle apparirà più luminosa, distesa e vitale, mentre i lineamenti vengono naturalmente valorizzati. 
              <br/><br/>
              Un rituale ideale per concedersi una pausa e prendersi cura del proprio viso in modo delicato e piacevole, che unisce il potere della pietra alla manualità.</p>
              </ExpandableText>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* Pressoterapia */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16 bg-white p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] border border-brand-dark/5">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl text-brand-dark mb-4 md:mb-6">Pressoterapia</h2>
            <h3 className="text-xs md:text-sm font-semibold tracking-widest text-brand-teal uppercase mb-6">Drenaggio e Circolazione</h3>
            <div className="text-muted-foreground leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Pressoterapia&category=Trattamenti%20Corpo" className="inline-flex items-center justify-center bg-brand-dark text-white px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-brand-teal transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>La pressoterapia è un trattamento non invasivo che utilizza una speciale apparecchiatura dotata di camere d’aria, che si gonfiano e si sgonfiano esercitando una pressione ritmica e progressiva sugli arti. 
              <br/><br/>
              Questa particolare azione favorisce il drenaggio di liquidi e la circolazione, aiutando a contrastare efficacemente la sensazione di gonfiore e pesantezza.</p>
              </ExpandableText>
            </div>
          </div>
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] bg-brand-light/10 rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <video preload="none" 
              src="/tumtum.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </AnimatedSection>
      </section>

      {/* Pulizia del Viso con Macchinario OZ */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-16 bg-brand-dark text-brand-light p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] ">
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <video preload="none" 
              src="/tommy.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-3xl mb-4 md:mb-6">Pulizia del Viso con Macchinario OZ</h2>
            <h3 className="text-xs md:text-sm font-bold tracking-widest text-white uppercase mb-6">Innovazione in 3 Step</h3>
            <div className="text-brand-light/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left space-y-4">
              <ExpandableText
                
                shortContent={
                  <div className="space-y-4">
                    <p>
                      Una pulizia del viso completamente innovativa. Senza l’utilizzo di vaporizzatore e spremitura che spesso vanno solo a stressare la pelle, con la nostra MEXO sarà un vero e proprio trattamento viso in 3 step:
                    </p>
                    <ul className="list-none space-y-2 ml-2">
                      <li><strong className="text-white font-medium">1. DIAGNOSI:</strong> con telecamera e tablet integrato si effettua una diagnosi approfondita.</li>
                      <li><strong className="text-white font-medium">2. PROGETTAZIONE:</strong> in base agli inestetismi riscontrati si sceglie il percorso personalizzato per ogni cliente.</li>
                      <li><strong className="text-white font-medium">3. TRATTAMENTO:</strong> grazie ai 6 manipoli a disposizione si esegue il trattamento completo dalla fase di detersione alla fase di nutrimento.</li>
                    </ul>
                  </div>
                }
                expandedContent={
                  <div className="mt-6 border-t border-white/20 pt-6">
                    <h4 className="text-white font-bold mb-4">Le caratteristiche dei 6 manipoli:</h4>
                    <ul className="list-none space-y-3 ml-2 text-xs md:text-sm">
                      <li><strong className="text-brand-teal font-semibold block mb-1">TELECAMERA DIAGNOSTICA</strong> permette di visualizzare in alta risoluzione gli inestetismi del viso.</li>
                      <li><strong className="text-brand-teal font-semibold block mb-1">SPATOLA ULTRASUONI</strong> spatola con 3 modalità di lavoro per la pulizia e la preparazione.</li>
                      <li><strong className="text-brand-teal font-semibold block mb-1">VACUUM A BOLLE IONICHE</strong> idrata in profondità l’epidermide grazie allo scambio di acqua.</li>
                      <li><strong className="text-brand-teal font-semibold block mb-1">OXYPEN</strong> ossigeno molecolare combinato con sieri specifici per rinnovamento di collagene ed elastina.</li>
                      <li><strong className="text-brand-teal font-semibold block mb-1">MANIPOLO HOT E COLD</strong> vasoprotezione con sistema cryogenico e tonificazione tramite calore.</li>
                      <li><strong className="text-brand-teal font-semibold block mb-1">RADIOFREQUENZA E ULTRASUONI</strong> efficace sulle rughe più profonde tramite onde radiali e ultrasoniche.</li>
                    </ul>
                  </div>
                }
                actionButton={
                  <Link href="/prenota?service=Pulizia%20Viso%20Macchinario%20OZ&category=Trattamenti%20Viso" className="inline-flex items-center justify-center bg-white text-brand-dark px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/90 transition-all shadow-sm">
                    Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                }
              />
            </div>
          </div>
        </AnimatedSection>
      </section>

      

    </div>
  );
}
