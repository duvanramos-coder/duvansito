import React from 'react';
import {
  Home,
  Mail,
  Users,
  FileText,
  Settings,
  LogOut,
  LayoutGrid
} from 'lucide-react';

interface SidebarProps {
  onLogout: () => void;
}

export default function Sidebar({ onLogout }: SidebarProps) {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Mail, label: 'Email' },
    { icon: Users, label: 'Loads' },
    { icon: FileText, label: 'Report' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="w-[280px] bg-white p-8 flex flex-col fixed h-[calc(100vh-48px)] left-6 top-6 rounded-dashboard shadow-premium">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
          <LayoutGrid className="text-white w-6 h-6" />
        </div>
        <span className="text-primary font-black text-2xl tracking-tighter">Crush SaaS</span>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <div
            key={item.label}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-bold cursor-pointer transition-all ${
              item.active
              ? 'bg-accent text-white shadow-lg shadow-accent/30'
              : 'text-slate-400 hover:bg-slate-50 hover:text-primary'
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </div>
        ))}
      </nav>

      {/* Upgrade Card */}
      <div className="bg-slate-50 p-6 rounded-3xl mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-full -mr-10 -mt-10" />
        <p className="text-sm font-bold text-slate-600 mb-4 relative z-10">Upgrade to PRO for more features</p>
        <button className="w-full bg-white text-primary font-bold py-3 rounded-xl shadow-sm hover:shadow-md transition-all relative z-10">
          Upgrade
        </button>
      </div>

      <button
        onClick={onLogout}
        className="flex items-center gap-4 px-5 py-4 text-slate-400 hover:text-red-500 font-bold transition-all"
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </aside>
  );
}
