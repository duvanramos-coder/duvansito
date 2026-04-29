import React from 'react';
import { LayoutDashboard, Power, ShieldCheck } from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="w-[280px] bg-primary rounded-dashboard p-8 flex flex-col shadow-premium fixed h-[calc(100vh-48px)] left-6 top-6">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
          <ShieldCheck className="text-primary w-6 h-6" />
        </div>
        <span className="text-white font-black text-2xl tracking-tighter">PEOPLE BPO</span>
      </div>

      <nav className="flex-1 space-y-2">
        <div className="flex items-center gap-3 px-5 py-4 bg-accent text-primary rounded-2xl font-bold shadow-lg shadow-accent/20 cursor-pointer">
          <LayoutDashboard className="w-5 h-5" />
          DASHBOARD
        </div>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-5 py-4 text-white/70 hover:text-white hover:bg-white/5 rounded-2xl font-semibold transition-all cursor-pointer mt-4"
        >
          <Power className="w-5 h-5" />
          CERRAR SESIÓN
        </button>
      </nav>

      <div className="mt-auto pt-8 border-t border-white/10">
        <p className="text-[10px] text-white/40 text-center font-bold tracking-[0.2em]">
          V4.0 PREMIUM
        </p>
      </div>
    </aside>
  );
}
