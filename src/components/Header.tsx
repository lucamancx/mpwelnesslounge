"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-border h-20 flex items-center px-6 md:px-12">
      {/* Mobile: hamburger a sinistra */}
      <div className="flex-1 flex items-center md:hidden">
        <button 
          className="p-2 text-brand-dark" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop: logo a sinistra */}
      <div className="hidden md:flex flex-1">
        <Link href="/" className="font-serif text-2xl font-semibold text-brand-dark">MP</Link>
      </div>
      
      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-8 text-sm font-medium tracking-wider uppercase">
        <Link href="/" className="hover:text-brand-teal transition-colors">Home</Link>
        <Link href="/servizi" className="hover:text-brand-teal transition-colors">Trattamenti</Link>
        <Link href="/beauty-essentials" className="hover:text-brand-teal transition-colors">Beauty Essentials</Link>
        <Link href="/miamo-lounge" className="hover:text-brand-teal transition-colors">Miamo Lounge</Link>
        <Link href="/specialisti" className="hover:text-brand-teal transition-colors">Specialisti</Link>
      </nav>
      
      {/* Mobile: logo a destra | Desktop: prenota a destra */}
      <div className="flex-1 flex justify-end items-center gap-4">
        <Link href="/" className="font-serif text-2xl font-semibold text-brand-dark md:hidden">MP</Link>
        <Link href="/prenota" className="hidden md:inline-block bg-brand-dark text-white px-6 py-2 rounded-md text-sm uppercase tracking-wider hover:bg-brand-teal transition-colors">
          Prenota
        </Link>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="absolute top-20 left-0 w-full bg-white border-b border-border shadow-lg flex flex-col p-6 space-y-4 md:hidden animate-in slide-in-from-top-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="text-lg font-medium uppercase tracking-wider text-brand-dark hover:text-brand-teal">Home</Link>
          <Link href="/servizi" onClick={() => setIsOpen(false)} className="text-lg font-medium uppercase tracking-wider text-brand-dark hover:text-brand-teal">Trattamenti</Link>
          <Link href="/beauty-essentials" onClick={() => setIsOpen(false)} className="text-lg font-medium uppercase tracking-wider text-brand-dark hover:text-brand-teal">Beauty Essentials</Link>
          <Link href="/miamo-lounge" onClick={() => setIsOpen(false)} className="text-lg font-medium uppercase tracking-wider text-brand-dark hover:text-brand-teal">Miamo Lounge</Link>
          <Link href="/specialisti" onClick={() => setIsOpen(false)} className="text-lg font-medium uppercase tracking-wider text-brand-dark hover:text-brand-teal">Specialisti</Link>
          <div className="pt-4 border-t border-border">
            <Link href="/prenota" onClick={() => setIsOpen(false)} className="block text-center w-full bg-brand-dark text-white px-6 py-3 rounded-md text-sm uppercase tracking-wider hover:bg-brand-teal transition-colors">
              Prenota Ora
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
