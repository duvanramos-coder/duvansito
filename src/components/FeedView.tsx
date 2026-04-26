import { Search, Bell, Star, Bolt, Users } from 'lucide-react';
import { ParcheEvent } from '../types';
import { motion } from 'motion/react';

interface FeedViewProps {
  events: ParcheEvent[];
  onSelectEvent: (event: ParcheEvent) => void;
}

export default function FeedView({ events, onSelectEvent }: FeedViewProps) {
  return (
    <div className="pt-4 pb-28 px-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <button className="p-2 rounded-full hover:bg-white/5 text-parche-purple">
          <Search className="w-6 h-6" />
        </button>
        <span className="font-display text-2xl font-black italic text-parche-purple tracking-tighter">PARCHE</span>
        <button className="p-2 rounded-full hover:bg-white/5 text-parche-purple">
          <Bell className="w-6 h-6" />
        </button>
      </header>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
        {['Rumba', 'Deportes', 'Comida', 'Tranqui'].map((cat, idx) => (
          <button 
            key={cat}
            className={`flex-none px-6 py-2 rounded-full font-bold text-sm transition-all border ${idx === 0 ? 'bg-parche-purple/20 border-parche-purple text-parche-purple' : 'bg-white/5 border-white/10 text-gray-500'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-6">
        {events.map((event) => (
          <article 
            key={event.id}
            onClick={() => onSelectEvent(event)}
            className="glass rounded-3xl overflow-hidden border-white/5 shadow-xl relative group cursor-pointer"
          >
            {event.isFeatured && (
              <div className="absolute top-4 right-4 z-10 bg-parche-purple px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-1 neon-shadow-purple translate-y-0 opacity-100 group-hover:-translate-y-1 transition-all">
                <Star className="w-3 h-3 fill-current" />
                Destacado
              </div>
            )}
            
            <div className="h-56 relative overflow-hidden">
              <img src={event.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={event.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-parche-bg via-transparent to-transparent opacity-90" />
              <div className="absolute bottom-4 left-6">
                <h2 className="font-display text-2xl font-bold text-white mb-0.5">{event.title}</h2>
                <div className="flex items-center gap-2 text-parche-purple text-xs font-bold">
                  {event.category === 'Rumba' ? <span className="material-symbols-outlined text-sm">local_bar</span> : <span className="material-symbols-outlined text-sm">bolt</span>}
                  {event.subtitle}
                </div>
              </div>
            </div>

            <div className="p-4 flex items-center justify-between border-t border-white/5 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {event.attendees.preview.map((p) => (
                    <img key={p} src={p} className="w-8 h-8 rounded-full border-2 border-parche-surface" alt="" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-400">+{event.attendees.count} Asistirán</span>
              </div>
              <button className="bg-parche-lime text-black font-black px-6 py-2.5 rounded-2xl active:scale-95 transition-all text-xs">
                Unirse
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
