import { ArrowLeft, Share2, MapPin, Star, Bolt, ExternalLink, Heart } from 'lucide-react';
import { ParcheEvent } from '../types';
import { motion } from 'motion/react';

interface DetailViewProps {
  event: ParcheEvent;
  onBack: () => void;
}

export default function DetailView({ event, onBack }: DetailViewProps) {
  return (
    <div className="relative pb-32">
      {/* Header Overlay */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 pointer-events-none">
        <button 
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center rounded-full glass pointer-events-auto active:scale-90 transition-all text-parche-purple"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-display text-2xl font-black italic text-parche-purple tracking-tighter backdrop-blur-md px-2 py-1 rounded-lg">PARCHE</span>
        <button className="w-10 h-10 flex items-center justify-center rounded-full glass pointer-events-auto active:scale-90 transition-all text-parche-purple">
          <Share2 className="w-5 h-5" />
        </button>
      </header>

      {/* Hero */}
      <div className="relative h-[530px] w-full">
        <img src={event.image} className="w-full h-full object-cover" alt={event.title} />
        <div className="absolute inset-0 bg-gradient-to-t from-parche-bg via-parche-bg/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex gap-2 mb-4">
            <span className="bg-parche-purple/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Neon Night</span>
            {event.isFeatured && (
              <span className="bg-parche-lime text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 shadow-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-black animate-pulse" />
                Destacado
              </span>
            )}
          </div>
          <h1 className="font-display text-4xl font-black text-white leading-[0.95] tracking-tighter mb-4">{event.title}</h1>
          <div className="flex items-center gap-3">
             <img src={event.creator.avatar} className="w-10 h-10 rounded-full border-2 border-parche-purple shadow-xl" alt="" />
             <p className="text-xs font-black text-parche-purple tracking-wide">Creado por {event.creator.name}</p>
          </div>
        </div>
      </div>

      {/* Stats Card */}
      <div className="px-6 -mt-4 relative z-10">
        <div className="glass rounded-[24px] p-6 flex items-center justify-between shadow-2xl border-white/20">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">En este parche</p>
            <div className="flex items-center gap-3">
              <span className="font-display text-3xl font-black text-white leading-none tracking-tighter">{event.attendees.count}/50</span>
              <div className="flex -space-x-3">
                {event.attendees.preview.map((p) => (
                  <img key={p} src={p} className="w-8 h-8 rounded-full border-2 border-parche-surface" alt="" />
                ))}
                <div className="w-8 h-8 rounded-full bg-parche-surface border-2 border-white/5 flex items-center justify-center text-[10px] font-black">+39</div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <Bolt className="w-8 h-8 text-parche-lime fill-current stroke-[3]" />
            <p className="text-[8px] font-black text-parche-lime uppercase tracking-widest mt-1">¡Llenándose!</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="p-6 space-y-10">
        <section className="space-y-4">
          <h3 className="font-display text-xl font-black text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-parche-lime fill-current" />
            Beneficios Exclusive
          </h3>
          <div className="space-y-3">
            <div className="glass rounded-2xl p-6 flex gap-4 border-parche-purple/30 neon-shadow-purple">
              <div className="w-12 h-12 rounded-xl bg-parche-purple/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-parche-purple">local_bar</span>
              </div>
              <div>
                <h4 className="font-black text-sm text-white mb-1">Welcome Drink</h4>
                <p className="text-gray-400 text-xs leading-relaxed">Cortesía de Gin Tonic Club para los primeros 20 en llegar.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="font-display text-xl font-black text-white">Sobre el parche</h3>
          <p className="text-sm font-medium text-gray-400 leading-relaxed italic">
            {event.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {event.tags.map(tag => (
              <span key={tag} className="px-4 py-2 rounded-full glass text-[10px] font-black text-gray-300 border-white/5">#{tag}</span>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-xl font-black text-white">Ubicación</h3>
            <button className="text-parche-purple text-[10px] font-black flex items-center gap-1 uppercase tracking-widest">
              Abrir en Mapas <ExternalLink className="w-3 h-3" />
            </button>
          </div>
          <div className="relative h-48 w-full rounded-2xl overflow-hidden glass">
            <img 
              src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000&auto=format&fit=crop" 
              className="w-full h-full object-cover grayscale opacity-50"
              alt="Map"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-parche-purple rounded-full flex items-center justify-center shadow-2xl neon-shadow-purple animate-pulse">
                <MapPin className="w-6 h-6 text-white fill-current" />
              </div>
            </div>
            <div className="absolute bottom-4 left-4 right-4 glass p-4 rounded-2xl border-white/20">
              <p className="text-xs font-black text-white">{event.location}</p>
              <p className="text-[10px] font-medium text-gray-500 mt-0.5">Bogotá, Colombia</p>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Bar */}
      <div className="fixed bottom-0 left-0 w-full z-50 p-6 bg-gradient-to-t from-parche-bg via-parche-bg to-transparent">
        <div className="max-w-md mx-auto flex gap-4">
          <button className="flex-1 h-16 bg-parche-lime text-black font-black text-lg tracking-tighter flex items-center justify-center gap-2 rounded-2xl shadow-xl neon-shadow-lime active:scale-95 transition-all">
            <span className="material-symbols-outlined font-black">group_add</span>
            UNIRSE EL PARCHE
          </button>
          <button className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-white active:scale-90 transition-all">
            <Heart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
