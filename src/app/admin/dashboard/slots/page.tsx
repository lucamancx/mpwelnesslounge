"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function GestioneSlots() {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  
  // Dummy generate dates for the current month
  const dates = Array.from({length: 30}, (_, i) => {
    const d = new Date(2023, 10, i + 1); // Mock Nov 2023
    return d.toISOString().split('T')[0];
  });

  const toggleDate = (date: string) => {
    if (selectedDates.includes(date)) {
      setSelectedDates(selectedDates.filter(d => d !== date));
    } else {
      setSelectedDates([...selectedDates, date]);
    }
  };

  const handleCreateSlots = () => {
    alert(`Slot creati per le date: ${selectedDates.join(', ')}`);
    setSelectedDates([]);
  };

  return (
    <div className="max-w-5xl">
      <h1 className="font-serif text-3xl text-brand-dark mb-2">Gestione Slot & Calendario</h1>
      <p className="text-muted-foreground mb-8 text-sm">Seleziona più date per generare slot orari in modo massivo.</p>
      
      <div className="bg-white p-6 rounded-xl border border-border shadow-sm mb-8">
        <h2 className="font-serif text-xl text-brand-dark mb-4">1. Seleziona Date</h2>
        <div className="grid grid-cols-7 gap-2">
          {dates.map((date) => {
            const isSelected = selectedDates.includes(date);
            const d = new Date(date);
            const isWeekend = d.getDay() === 0;
            return (
              <button
                key={date}
                disabled={isWeekend}
                onClick={() => toggleDate(date)}
                className={`p-3 text-sm rounded-md transition-colors border ${
                  isSelected 
                    ? 'bg-brand-dark text-white border-brand-dark' 
                    : isWeekend 
                      ? 'bg-gray-100 text-gray-400 border-transparent cursor-not-allowed'
                      : 'bg-white text-brand-dark border-border hover:border-brand-teal'
                }`}
              >
                {d.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
        <h2 className="font-serif text-xl text-brand-dark mb-4">2. Genera Slot</h2>
        <div className="flex items-center gap-4 mb-6">
           <div className="flex-1">
             <label className="text-xs uppercase tracking-wider font-medium text-brand-dark block mb-2">Da (es. 09:00)</label>
             <input type="time" className="w-full p-2 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal" />
           </div>
           <div className="flex-1">
             <label className="text-xs uppercase tracking-wider font-medium text-brand-dark block mb-2">A (es. 19:00)</label>
             <input type="time" className="w-full p-2 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal" />
           </div>
           <div className="flex-1">
             <label className="text-xs uppercase tracking-wider font-medium text-brand-dark block mb-2">Durata (min)</label>
             <select className="w-full p-2 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal">
               <option value="30">30 min</option>
               <option value="60">60 min</option>
               <option value="90">90 min</option>
             </select>
           </div>
        </div>
        
        <button 
          onClick={handleCreateSlots}
          disabled={selectedDates.length === 0}
          className="bg-brand-teal text-white px-6 py-2 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" /> Genera per {selectedDates.length} date
        </button>
      </div>
    </div>
  );
}
