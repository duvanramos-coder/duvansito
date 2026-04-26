import React, { useState } from 'react';
import { Camera, MapPin, Clock, Tag, ArrowRight, X, Sparkles, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ParcheEvent } from '../types';
import { generateEventImage } from '../services/aiService';

interface CreateEventProps {
  onBack: () => void;
  onSave: (event: ParcheEvent) => void;
}

export default function CreateEvent({ onBack, onSave }: CreateEventProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    time: '',
    category: 'Rumba',
    image: '',
    tags: '',
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateAIImage = async () => {
    if (!formData.title && !formData.description) {
      setError('Por favor, ingresa un título o descripción para generar una imagen.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const prompt = `${formData.title}. ${formData.description}`;
      const imageUrl = await generateEventImage(prompt);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (err: any) {
      setError('No se pudo generar la imagen. Revisa tu clave de API.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEvent: ParcheEvent = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title || 'Nuevo Evento',
      subtitle: formData.category,
      location: formData.location || 'Ubicación pendiente',
      time: formData.time || 'Próximamente',
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1514525253344-981c1cad96ee?q=80&w=1000&auto=format&fit=crop',
      creator: {
        name: '@Tú',
        avatar: 'https://i.pravatar.cc/150?u=me'
      },
      attendees: {
        count: 1,
        preview: ['https://i.pravatar.cc/150?u=me']
      },
      description: formData.description,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t),
      coordinates: { x: 50, y: 50 } // Default center
    };
    onSave(newEvent);
  };

  return (
    <div className="h-full bg-parche-bg flex flex-col p-6 pb-32">
      <header className="flex justify-between items-center mb-10">
        <button onClick={onBack} className="p-2 rounded-full glass active:scale-90 transition-all font-display text-parche-purple">
          <X className="w-6 h-6" />
        </button>
        <span className="font-display text-xl font-black text-white">NUEVO PARCHE</span>
        <div className="w-10" />
      </header>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Título del Parche</label>
          <input 
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            placeholder="¿Cómo se llama el plan?"
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-gray-700 focus:ring-1 focus:ring-parche-purple outline-none transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Descripción</label>
          <textarea 
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            placeholder="Cuéntanos más sobre la vibra..."
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-white placeholder:text-gray-700 focus:ring-1 focus:ring-parche-purple outline-none transition-all resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Ubicación</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-parche-purple" />
              <input 
                value={formData.location}
                onChange={e => setFormData({ ...formData, location: e.target.value })}
                placeholder="¿Dónde es?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-white text-xs placeholder:text-gray-700 focus:ring-1 focus:ring-parche-purple outline-none transition-all"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Hora / Fecha</label>
            <div className="relative">
              <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-parche-purple" />
              <input 
                value={formData.time}
                onChange={e => setFormData({ ...formData, time: e.target.value })}
                placeholder="¿Cuándo?"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-white text-xs placeholder:text-gray-700 focus:ring-1 focus:ring-parche-purple outline-none transition-all"
              />
            </div>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Categoría</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {['Rumba', 'Deportes', 'Comida', 'Tranqui'].map(cat => (
              <button 
                key={cat}
                type="button"
                onClick={() => setFormData({ ...formData, category: cat })}
                className={`flex-none px-6 py-2 rounded-full font-bold text-xs transition-all border ${formData.category === cat ? 'bg-parche-purple/20 border-parche-purple text-parche-purple' : 'bg-white/5 border-white/10 text-gray-500'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Etiquetas (separadas por coma)</label>
          <div className="relative">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-parche-purple" />
            <input 
              value={formData.tags}
              onChange={e => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Techno, Rooftop, Foodies"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-white text-xs placeholder:text-gray-700 focus:ring-1 focus:ring-parche-purple outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">Imagen (URL)</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Camera className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-parche-purple" />
              <input 
                value={formData.image}
                onChange={e => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-white text-sm placeholder:text-gray-700 focus:ring-1 focus:ring-parche-purple outline-none transition-all"
              />
            </div>
            <button
              type="button"
              onClick={handleGenerateAIImage}
              disabled={isGenerating}
              className="px-6 rounded-2xl bg-parche-purple/20 border border-parche-purple text-parche-purple hover:bg-parche-purple/30 transition-all flex items-center justify-center disabled:opacity-50"
            >
              {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
            </button>
          </div>
          {error && <p className="text-[10px] text-red-500 font-bold ml-1">{error}</p>}
        </div>

        {formData.image && (
          <div className="w-full h-40 rounded-2xl overflow-hidden border border-white/10 glass">
            <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
          </div>
        )}

        <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-parche-bg via-parche-bg to-transparent">
          <button 
            type="submit"
            className="w-full max-w-md mx-auto h-16 bg-parche-purple text-white font-black text-lg tracking-tighter flex items-center justify-center gap-2 rounded-2xl shadow-xl neon-shadow-purple active:scale-95 transition-all"
          >
            CREAR PARCHE <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
