import { Search, MapPin, Bell, Navigation as NavIcon, Users, ArrowRight } from 'lucide-react';
import { ParcheEvent } from '../types';
import { motion } from 'motion/react';

interface MapViewProps {
  events: ParcheEvent[];
  onSelectEvent: (event: ParcheEvent) => void;
}

export default function MapView({ events, onSelectEvent }: MapViewProps) {
  const selectedEvent = events.length > 0 ? events[0] : null; // Simulation: selecting the first event for preview

  return (
    <div className="relative h-full w-full bg-[#0c0f0f]">
      {/* Mock Map Texture */}
      <div className="absolute inset-0 opacity-40 grayscale contrast-125 brightness-50">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
          className="w-full h-full object-cover"
          alt="Map grid"
        />
      </div>

      {/* Map Markers */}
      {events.map((event, idx) => (
        <motion.button
          key={event.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: idx * 0.1 }}
          onClick={() => onSelectEvent(event)}
          className={`absolute flex flex-col items-center gap-2 -translate-x-1/2 -translate-y-1/2 p-1 rounded-full border-2 border-white/20 shadow-lg transition-transform active:scale-90 ${event.isLive ? 'bg-parche-lime border-parche-purple scale-125 z-20' : 'bg-parche-purple'}`}
          style={{ top: `${event.coordinates.y}%`, left: `${event.coordinates.x}%` }}
        >
          <div className="w-8 h-8 flex items-center justify-center text-white">
            {event.category === 'Rumba' ? <span className="material-symbols-outlined">local_bar</span> : <span className="material-symbols-outlined">bolt</span>}
          </div>
          {event.isLive && (
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-parche-lime rounded-full border-2 border-parche-bg animate-pulse" />
          )}
        </motion.button>
      ))}

      {/* Top UI Overlay */}
      <div className="absolute top-0 left-0 w-full p-4 space-y-4 z-10">
        <header className="flex justify-between items-center mb-4">
          <span className="font-display text-2xl font-black italic text-parche-purple">PARCHE</span>
          <div className="flex gap-2">
            <button className="p-2 rounded-full glass text-gray-400">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full glass text-gray-400">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="glass flex items-center gap-3 px-4 py-3 rounded-2xl">
          <Search className="w-5 h-5 text-gray-500" />
          <input 
            placeholder="Busca el parche..." 
            className="bg-transparent border-none outline-none flex-1 text-sm text-white placeholder:text-gray-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {['LO ÚLTIMO', 'TECHNO', 'BEBIDAS', 'COMIDA', 'DEPORTE'].map((cat, idx) => (
            <button 
              key={cat}
              className={`flex-none px-5 py-2 rounded-full text-[10px] font-black tracking-widest transition-all ${idx === 0 ? 'bg-parche-purple text-white shadow-lg shadow-parche-purple/30' : 'glass text-gray-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <button className="absolute bottom-28 right-6 w-14 h-14 bg-parche-purple text-white rounded-2xl flex items-center justify-center shadow-2xl neon-shadow-purple active:scale-90 transition-transform">
        <NavIcon className="w-6 h-6 fill-current" />
      </button>

      {/* Preview Card */}
      {selectedEvent && (
        <div className="absolute bottom-24 left-4 right-4 z-30">
          <div className="glass p-4 rounded-[24px] shadow-2xl">
            <div className="flex gap-4">
              <div className="w-24 h-24 rounded-2xl overflow-hidden flex-none relative border border-white/10">
                <img src={selectedEvent.image} className="w-full h-full object-cover" alt="" />
                {selectedEvent.isLive && (
                  <div className="absolute top-2 left-2 bg-parche-lime text-black text-[8px] font-black px-2 py-0.5 rounded-full">EN VIVO</div>
                )}
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <span className="text-[8px] font-black text-parche-purple uppercase tracking-widest border border-parche-purple/30 px-1.5 py-0.5 rounded bg-parche-purple/10">DESTACADO</span>
                  <h3 className="font-display text-lg font-bold text-white mt-1 leading-tight">{selectedEvent.title}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-[10px] mt-1">
                    <MapPin className="w-3 h-3 text-parche-purple" />
                    {selectedEvent.location}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {selectedEvent.attendees.preview.map((p, i) => (
                      <img key={p + i} src={p} className="w-6 h-6 rounded-full border-2 border-parche-surface" alt="" />
                    ))}
                    <div className="w-6 h-6 rounded-full bg-parche-surface border-2 border-white/5 flex items-center justify-center text-[8px] font-bold">+{selectedEvent.attendees.count}</div>
                  </div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Parche Live</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onSelectEvent(selectedEvent)}
              className="w-full bg-parche-lime text-black font-black py-4 rounded-2xl mt-4 flex items-center justify-center gap-2 active:scale-95 transition-all text-xs"
            >
              UNIRSE AL PARCHE <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
