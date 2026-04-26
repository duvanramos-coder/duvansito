import { Map, LayoutGrid, PlusCircle, User } from 'lucide-react';
import { Screen } from '../types';

interface NavigationProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
}

export default function Navigation({ currentScreen, setScreen }: NavigationProps) {
  const tabs: { id: Screen; label: string; icon: any }[] = [
    { id: 'feed', label: 'Inicio', icon: LayoutGrid },
    { id: 'map', label: 'Mapa', icon: Map },
    { id: 'create', label: 'Crear', icon: PlusCircle },
    { id: 'login', label: 'Perfil', icon: User }, // Reuse login as profile placeholder
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-2 py-3 bg-neutral-950/90 backdrop-blur-xl border-t border-white/10 rounded-t-lg shadow-[0_-4px_24px_rgba(157,0,255,0.15)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;
        
        return (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            className={`flex flex-col items-center justify-center transition-all duration-300 px-4 py-1 rounded-xl ${
              isActive ? 'text-parche-purple bg-parche-purple/10' : 'text-gray-500 hover:text-gray-300'
            } active:scale-90`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
            <span className="font-display text-[10px] font-black uppercase tracking-widest mt-1">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
