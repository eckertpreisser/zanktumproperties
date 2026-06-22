export type Language = 'en' | 'de' | 'ar' | 'ru' | 'uk' | 'zh' | 'es' | 'fr' | 'tr';

export interface RoomDetail {
  id: string;
  name: string;
  images: string[];
  features: string[];
}

export interface Floor {
  id: string;
  name: string;
  level: number; // 0 = EG, 1 = OG1, 2 = OG2
  birdEyeImage: string; // Vogelansicht of this floor
  floorPlanImage?: string; // Architectural 2D floor plan
  rooms: RoomDetail[];
}

export interface Villa {
  id: string;
  name: string;
  tagline: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  sqMeters: number;
  amenities: string[];
  heroImages: [string, string]; // Two showcase images
  exteriorImages: string[];
  interiorCutawayImage: string; // Cross-section / cutaway image
  floors: Floor[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
