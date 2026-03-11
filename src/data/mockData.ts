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

export interface Route {
  id: string;
  origin: string;
  destination: string;
}

export interface PackageCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
}

export const stops = [
  'Ciudad de México', 'Puebla', 'Oaxaca', 'Veracruz',
  'Querétaro', 'Guadalajara', 'León', 'Morelia',
  'Toluca', 'Cuernavaca', 'Pachuca', 'Tlaxcala',
];

export const packageCategories: PackageCategory[] = [
  { id: 'sobre', name: 'Sobre / Documento', icon: 'FileText', description: 'Hasta 500g', basePrice: 85 },
  { id: 'caja_chica', name: 'Caja Chica', icon: 'Package', description: 'Hasta 5kg, 30×30×30cm', basePrice: 150 },
  { id: 'caja_grande', name: 'Caja Grande', icon: 'Box', description: 'Hasta 25kg, 60×60×60cm', basePrice: 280 },
  { id: 'especial', name: 'Equipaje Especial', icon: 'Luggage', description: 'Más de 25kg o irregular', basePrice: 450 },
];

export const mockTracking: Record<string, TrackingData> = {
  'ENV-2024-001': {
    guideNumber: 'ENV-2024-001',
    status: 'en_camino',
    origin: 'Ciudad de México',
    destination: 'Puebla',
    location: 'cajuela',
    category: 'Caja Chica',
    estimatedArrival: '14:30',
    lastUpdate: 'Hace 25 min',
  },
  'ENV-2024-002': {
    guideNumber: 'ENV-2024-002',
    status: 'en_terminal',
    origin: 'Guadalajara',
    destination: 'Querétaro',
    location: 'tablero',
    category: 'Sobre / Documento',
    estimatedArrival: '16:00',
    lastUpdate: 'Hace 10 min',
  },
  'ENV-2024-003': {
    guideNumber: 'ENV-2024-003',
    status: 'entregado',
    origin: 'Oaxaca',
    destination: 'Veracruz',
    location: 'cajuela',
    category: 'Caja Grande',
    estimatedArrival: 'Entregado',
    lastUpdate: 'Hace 2 hrs',
  },
};

export const nextDepartures = [
  { time: '10:30', route: 'CDMX → Puebla', available: true },
  { time: '11:00', route: 'CDMX → Querétaro', available: true },
  { time: '12:15', route: 'CDMX → Oaxaca', available: false },
  { time: '13:00', route: 'CDMX → Guadalajara', available: true },
];
