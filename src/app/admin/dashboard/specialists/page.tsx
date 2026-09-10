"use client";

import { useState } from "react";
import { Upload, Plus, Edit2, Trash2 } from "lucide-react";

export default function GestioneSpecialisti() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-5xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-serif text-3xl text-brand-dark mb-2">Team & Specialisti</h1>
          <p className="text-muted-foreground text-sm">Gestisci i collaboratori e i relativi profili.</p>
        </div>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-brand-dark text-white px-4 py-2 rounded-md uppercase tracking-wider text-xs font-medium hover:bg-brand-teal transition-all flex items-center gap-2"
        >
          {showForm ? 'Annulla' : <><Plus className="w-4 h-4" /> Nuovo Specialista</>}
        </button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm mb-8 animate-in slide-in-from-top-4 duration-300">
          <h2 className="font-serif text-xl text-brand-dark mb-4">Aggiungi / Modifica</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Nome Completo</label>
              <input type="text" className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-teal" />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Ruolo / Qualifica</label>
              <input type="text" className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-teal" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Bio / Descrizione</label>
              <textarea rows={3} className="w-full p-2 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-brand-teal"></textarea>
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Foto Profilo (Supabase Storage)</label>
              <div className="border-2 border-dashed border-border rounded-md p-4 flex flex-col items-center justify-center text-muted-foreground hover:bg-brand-light/50 transition-colors cursor-pointer">
                <Upload className="w-6 h-6 mb-2" />
                <span className="text-xs">Clicca per caricare un'immagine</span>
              </div>
            </div>
          </div>
          <button className="bg-brand-teal text-white px-6 py-2 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-dark transition-all">
            Salva Profilo
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-brand-light border-b border-border">
            <tr>
              <th className="p-4 text-xs uppercase tracking-wider text-muted-foreground font-medium">Nome</th>
              <th className="p-4 text-xs uppercase tracking-wider text-muted-foreground font-medium">Ruolo</th>
              <th className="p-4 text-xs uppercase tracking-wider text-muted-foreground font-medium text-right">Azioni</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <span className="font-medium text-brand-dark">Martina Perani</span>
                </div>
              </td>
              <td className="p-4 text-sm text-muted-foreground">Founder</td>
              <td className="p-4 flex justify-end gap-2">
                <button className="p-2 text-muted-foreground hover:text-brand-dark rounded-md hover:bg-gray-100"><Edit2 className="w-4 h-4" /></button>
              </td>
            </tr>
            <tr className="border-b border-border hover:bg-gray-50">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                  <span className="font-medium text-brand-dark">Dott.ssa Rossi</span>
                </div>
              </td>
              <td className="p-4 text-sm text-muted-foreground">Biologa Nutrizionista</td>
              <td className="p-4 flex justify-end gap-2">
                <button className="p-2 text-muted-foreground hover:text-brand-dark rounded-md hover:bg-gray-100"><Edit2 className="w-4 h-4" /></button>
                <button className="p-2 text-red-400 hover:text-red-600 rounded-md hover:bg-red-50"><Trash2 className="w-4 h-4" /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
