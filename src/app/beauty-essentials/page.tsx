import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/AnimatedSection";
import { ExpandableText } from "@/components/ExpandableText";

export const metadata = {
  title: "Beauty Essentials | MP Wellness Lounge",
  description: "Scopri i nostri servizi Beauty Essentials: pedicure e altro ancora.",
};

export default function BeautyEssentialsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F9F9F6]">
      {/* Hero Section */}
      <section className="w-full py-10 md:py-24 px-4 md:px-12 text-center bg-[#F9F9F6]">
        <h1 className="font-serif text-2xl md:text-5xl text-brand-dark mb-4">Beauty Essentials</h1>
        <p className="text-sm md:text-base text-brand-dark font-light max-w-2xl mx-auto">
          I trattamenti estetici fondamentali per la cura di s�, pensati per donare ordine, morbidezza e benessere.
        </p>
      </section>

      {/* Pedicure */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="right" className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6 md:gap-16 bg-white p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] border border-brand-dark/5">
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl text-brand-dark mb-4 md:mb-6">Pedicure</h2>
            <h3 className="text-xs md:text-sm font-semibold tracking-widest text-brand-teal uppercase mb-6">Beauty Essentials</h3>
            <div className="text-muted-foreground leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Pedicure&category=Beauty%20Essentials" className="inline-flex items-center justify-center bg-brand-dark text-white px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-brand-teal transition-all shadow-sm">
                Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              }>
                <p>� un trattamento dedicato alla cura e alla bellezza dei piedi, pensato per donare ordine, morbidezza e benessere. Il trattamento comprende la cura delle unghie, la sistemazione delle cuticole e un'accurata attenzione alla pelle del piede, attraverso l'eliminazione delle cellule morte con l'utilizzo di uno scrub, l'eliminazione delle zone inspessite, cos� da avere una pelle morbida, liscia e curata.</p>
              </ExpandableText>
            </div>
          </div>
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] bg-brand-light/10 rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <img src="/pedicure.png" alt="Pedicure" className="w-full h-full object-cover" />
          </div>
        </AnimatedSection>
      </section>

      {/* Manicure */}
      <section className="w-full py-3 md:py-6 px-4 md:px-12 overflow-hidden">
        <AnimatedSection direction="left" className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-16 bg-brand-dark text-brand-light p-5 md:p-16 rounded-2xl md:rounded-[2.5rem] ">
          <div className="flex-1 w-full aspect-[16/10] md:aspect-[4/3] rounded-2xl border border-brand-teal/20 overflow-hidden relative">
            <img src="/manicure.png" alt="Manicure" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-4xl mb-4 md:mb-6">Manicure</h2>
            <h3 className="text-xs md:text-sm font-bold tracking-widest text-white uppercase mb-6">Beauty Essentials</h3>
            <div className="text-brand-light/80 leading-relaxed font-light mb-8 text-sm md:text-base text-left">
              <ExpandableText mobileOnly lines={4} actionButton={
                <Link href="/prenota?service=Manicure&category=Beauty%20Essentials" className="inline-flex items-center justify-center bg-white text-brand-dark px-6 py-3.5 rounded-full uppercase tracking-widest text-[11px] font-bold min-h-[44px] hover:bg-white/90 transition-all shadow-sm">
                  Prenota una seduta <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              }>
                <p>
                  Il Rituale Manicure della nostra Wellness Lounge � un'esperienza sensoriale che unisce estetica e profondo relax. Il percorso inizia con un bagno aromatico e un delicato scrub esfoliante, seguiti da una cura meticolosa di unghie e cuticole.
                  <br/><br/>
                  Il cuore del trattamento � un avvolgente massaggio nutriente a mani e avambracci, che precede il tocco finale: l'applicazione di smalti premium o curativi a scelta. In un'atmosfera intima e con la massima garanzia di igiene, le tue mani ritroveranno morbidezza, salute ed eleganza.
                </p>
              </ExpandableText>
            </div>
          </div>
        </AnimatedSection>
      </section>

    </div>
  );
}