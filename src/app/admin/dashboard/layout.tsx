import { CalendarDays, Users, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Admin Dashboard | MP Wellness Lounge",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-light flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-dark text-brand-light hidden md:flex flex-col">
        <div className="p-6 border-b border-white/10">
          <span className="font-serif text-2xl font-semibold">MP Admin</span>
          <p className="text-xs uppercase tracking-widest opacity-70 mt-1">Lounge Manager</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/dashboard" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors text-sm font-medium">
            <LayoutDashboard className="w-5 h-5" /> Panoramica
          </Link>
          <Link href="/admin/dashboard/slots" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors text-sm font-medium">
            <CalendarDays className="w-5 h-5" /> Gestione Slot
          </Link>
          <Link href="/admin/dashboard/specialists" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors text-sm font-medium">
            <Users className="w-5 h-5" /> Specialisti & Staff
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <Link href="/admin/login" className="flex items-center gap-3 p-3 rounded-md hover:bg-white/10 transition-colors text-sm font-medium text-red-300 hover:text-red-200">
            <LogOut className="w-5 h-5" /> Esci
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-brand-dark text-brand-light p-4 flex justify-between items-center">
          <span className="font-serif text-xl">MP Admin</span>
        </header>
        
        <div className="flex-1 overflow-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
