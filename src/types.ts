export type Screen = 'login' | 'map' | 'feed' | 'detail' | 'create';

export interface ParcheEvent {
  id: string;
  title: string;
  subtitle: string;
  location: string;
  time: string;
  category: string;
  isFeatured?: boolean;
  isLive?: boolean;
  image: string;
  creator: {
    name: string;
    avatar: string;
  };
  attendees: {
    count: number;
    preview: string[];
  };
  description: string;
  tags: string[];
  coordinates: { x: number; y: number };
}
