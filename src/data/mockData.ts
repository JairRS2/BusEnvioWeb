export interface TrackingData {
  guideNumber: string;
  status: 'recibido' | 'en_camino' | 'en_terminal' | 'entregado';
  origin: string;
  destination: string;
  location: 'cajuela' | 'tablero';
  category: string;
  estimatedArrival: string;
  lastUpdate: string;
}

export interface PackageCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
}

export const stops = [
  'Orizaba',
  'Fortín Pista',
  'Monte Blanco',
  'Chocamán',
  'Coscomatepec',
  'Huatusco',
  'Córdoba',
  'Paso Rayón',
  'Tezonapa',
  'Tierra Blanca',
  'Xalapa',
];

export const packageCategories: PackageCategory[] = [
  { id: 'sobre', name: 'Sobre / Documento', icon: 'FileText', description: 'Hasta 500g (Ideal para tablero)', basePrice: 60 },
  { id: 'caja_chica', name: 'Caja Chica', icon: 'Package', description: 'Hasta 5kg (Cajuela)', basePrice: 100 },
  { id: 'caja_grande', name: 'Caja Grande', icon: 'Box', description: 'Hasta 25kg (Cajuela)', basePrice: 180 },
  { id: 'especial', name: 'Equipaje Especial', icon: 'Luggage', description: 'Bultos agrícolas o mudanza', basePrice: 350 },
];

export const mockTracking: Record<string, TrackingData> = {
  'VER-402-001': {
    guideNumber: 'VER-402-001',
    status: 'en_camino',
    origin: 'Huatusco',
    destination: 'Córdoba',
    location: 'tablero',
    category: 'Sobre / Documento',
    estimatedArrival: '15:45',
    lastUpdate: 'Pasando por Chocamán',
  },
  'VER-402-002': {
    guideNumber: 'VER-402-002',
    status: 'en_terminal',
    origin: 'Orizaba',
    destination: 'Tezonapa',
    location: 'cajuela',
    category: 'Caja Grande',
    estimatedArrival: '17:20',
    lastUpdate: 'En Terminal Tezonapa',
  },
  'VER-402-003': {
    guideNumber: 'VER-402-003',
    status: 'entregado',
    origin: 'Tierra Blanca',
    destination: 'Fortín Pista',
    location: 'cajuela',
    category: 'Caja Chica',
    estimatedArrival: 'Entregado',
    lastUpdate: 'Hace 1 hr', 
  },
};

export const nextDepartures = [
  { time: '14:30', route: 'Orizaba → Córdoba → Tezonapa', available: true },
  { time: '15:00', route: 'Huatusco → Coscomatepec → Córdoba', available: true },
  { time: '16:15', route: 'Córdoba → Paso Rayón → Tierra Blanca', available: false },
  { time: '17:00', route: 'Fortín Pista → Orizaba', available: true },
];