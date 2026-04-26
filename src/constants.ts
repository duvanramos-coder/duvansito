import { ParcheEvent } from './types';

export const EVENTS: ParcheEvent[] = [
  {
    id: '1',
    title: 'Techno & Tacos Rooftop',
    subtitle: 'Cócteles y Techno',
    location: 'Selina Rooftop, Calle 74 #15-22',
    time: '19:00 Hoy',
    category: 'Rumba',
    isFeatured: true,
    isLive: true,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=1000&auto=format&fit=crop',
    creator: {
      name: '@MatiasV',
      avatar: 'https://i.pravatar.cc/150?u=matias'
    },
    attendees: {
      count: 50,
      preview: ['https://i.pravatar.cc/150?u=1', 'https://i.pravatar.cc/150?u=2', 'https://i.pravatar.cc/150?u=3']
    },
    description: 'Prepárate para la mejor vista de la ciudad mezclada con los beats más puros del underground local. Tendremos tacos al pastor ilimitados hasta la medianoche y un line-up de DJs que te volará la cabeza.',
    tags: ['Techno', 'Rooftop', 'Foodies'],
    coordinates: { x: 55, y: 60 }
  },
  {
    id: '2',
    title: 'Bar El Muro: 2x1',
    subtitle: 'Cocktails & Techno Beat',
    location: 'El Poblado, Medellin',
    time: '21:00 Sáb',
    category: 'Rumba',
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1000&auto=format&fit=crop',
    creator: {
      name: '@Admin',
      avatar: 'https://i.pravatar.cc/150?u=admin'
    },
    attendees: {
      count: 42,
      preview: ['https://i.pravatar.cc/150?u=4', 'https://i.pravatar.cc/150?u=5']
    },
    description: 'La mejor promoción de la ciudad en el ambiente más exclusivo. 2x1 en toda nuestra carta de autor.',
    tags: ['Cocktails', 'Nightlife'],
    coordinates: { x: 30, y: 45 }
  },
  {
    id: '3',
    title: 'Fútbol en el parque',
    subtitle: 'Deporte urbano',
    location: 'Parque Central',
    time: '19:00 Hoy',
    category: 'Deportes',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000&auto=format&fit=crop',
    creator: {
      name: '@JuanP',
      avatar: 'https://i.pravatar.cc/150?u=juan'
    },
    attendees: {
      count: 12,
      preview: ['https://i.pravatar.cc/150?u=6']
    },
    description: 'Partido amistoso 5 vs 5. Todos los niveles bienvenidos.',
    tags: ['Sport', 'Urban'],
    coordinates: { x: 70, y: 35 }
  }
];
