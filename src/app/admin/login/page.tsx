"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: integrate Supabase Auth
    setTimeout(() => {
      window.location.href = "/admin/dashboard";
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-light p-4">
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border w-full max-w-md">
        <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center text-brand-dark mx-auto mb-6">
          <Lock strokeWidth={1.5} className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl text-brand-dark text-center mb-2">Area Riservata</h1>
        <p className="text-center text-sm text-muted-foreground uppercase tracking-widest mb-8">Accesso Staff</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-wider font-medium text-brand-dark">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-border rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-brand-teal" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-dark text-white py-3 rounded-md uppercase tracking-wider text-sm font-medium hover:bg-brand-teal transition-all mt-4 disabled:opacity-70"
          >
            {loading ? "Accesso in corso..." : "Accedi"}
          </button>
        </form>
      </div>
    </div>
  );
}
