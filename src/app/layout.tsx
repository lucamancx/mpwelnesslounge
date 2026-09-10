import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MP Wellness Lounge | Brescia",
  description: "La prima Miamo Lounge della provincia di Brescia. Trattamenti viso, corpo, maderoterapia e consulenze specialistiche.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body
        className={`${cormorant.variable} ${montserrat.variable} antialiased bg-brand-light text-foreground font-sans min-h-screen flex flex-col`}
      >
        <Header />
        
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Placeholder per Footer */}
        <footer className="bg-brand-dark text-brand-light py-12 px-6 md:px-12 mt-auto">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-2xl mb-4">MP Wellness Lounge</h3>
              <p className="text-sm opacity-80 uppercase tracking-widest mb-2">di Martina Perani</p>
              <p className="text-sm opacity-80 mb-4">La prima Miamo Lounge della provincia di Brescia.</p>
              <p className="text-sm opacity-60">P.IVA: 04706170984</p>
            </div>
            <div>
              <h4 className="font-medium uppercase tracking-wider mb-4">Orari</h4>
              <ul className="text-sm space-y-2 opacity-80">
                <li>Lunedì: 09:00 - 19:00</li>
                <li>Martedì: CHIUSO</li>
                <li>Mercoledì: 13:00 - 21:00</li>
                <li>Giovedì, Venerdì: 09:00 - 19:00</li>
                <li>Sabato: 08:00 - 15:00</li>
                <li>Domenica: CHIUSO</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium uppercase tracking-wider mb-4">Contatti</h4>
              <p className="text-sm opacity-80">Tel: +39 333 1234567</p>
              <p className="text-sm opacity-80">Email: info@mpwellnesslounge.it</p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-brand-light/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-50">
            <p>&copy; {new Date().getFullYear()} MP Wellness Lounge. Tutti i diritti riservati.</p>
            <p>P.IVA 04706170984</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
