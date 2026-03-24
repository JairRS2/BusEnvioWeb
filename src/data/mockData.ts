export interface TrackingData {
  numeroGuia: string;
  estado: 'recibido' | 'en_camino' | 'en_terminal' | 'entregado';
  origen: string;
  destino: string;
  ubicacion: string; 
  categoria: string;
  llegadaEstimada: string;
  ultimaActualizacion: string;
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
    numeroGuia: 'VER-402-001',
    estado: 'en_camino',
    origen: 'Huatusco',
    destino: 'Córdoba',
    ubicacion: 'tablero',
    categoria: 'Sobre / Documento',
    llegadaEstimada: '15:45',
    ultimaActualizacion: 'Pasando por Chocamán',
  },
  'VER-402-002': {
    numeroGuia: 'VER-402-002',
    estado: 'en_terminal',
    origen: 'Orizaba',
    destino: 'Tezonapa',
    ubicacion: 'cajuela',
    categoria: 'Caja Grande',
    llegadaEstimada: '17:20',
    ultimaActualizacion: 'En Terminal Tezonapa',
  },
  'VER-402-003': {
    numeroGuia: 'VER-402-003',
    estado: 'entregado',
    origen: 'Tierra Blanca',
    destino: 'Fortín Pista',
    ubicacion: 'cajuela',
    categoria: 'Caja Chica',
    llegadaEstimada: 'Entregado',
    ultimaActualizacion: 'Hace 1 hr', 
  },
};

export const nextDepartures = [
  { time: '14:30', route: 'Orizaba → Córdoba → Tezonapa', available: true },
  { time: '15:00', route: 'Huatusco → Coscomatepec → Córdoba', available: true },
  { time: '16:15', route: 'Córdoba → Paso Rayón → Tierra Blanca', available: false },
  { time: '17:00', route: 'Fortín Pista → Orizaba', available: true },
];