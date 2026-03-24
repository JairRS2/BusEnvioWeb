import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, MapPin, Clock, Truck, CheckCircle2, FileText, Box } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { type TrackingData, mockTracking } from '@/data/mockData';

const statusSteps = [
  { key: 'recibido', label: 'Recibido', icon: Package },
  { key: 'en_camino', label: 'En Camino', icon: Truck },
  { key: 'en_terminal', label: 'En Terminal', icon: MapPin },
  { key: 'entregado', label: 'Entregado', icon: CheckCircle2 },
];

const statusIndex = (status: string) => statusSteps.findIndex(s => s.key === status);

const TrackingSection = () => {
  const [guideNumber, setGuideNumber] = useState('');
  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("http://pruebasdesarrollo.ddns.net:3005/trackingHub") 
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(() => {
          console.log('¡Conectado a SignalR exitosamente!');
          
          connection.on('RecibirInfoRastreo', (data: TrackingData) => {
             setTracking(data);
             setNotFound(false);
             setIsSearching(false);
          });

          connection.on('RastreoNoEncontrado', () => {
            setTracking(null);
            setNotFound(true);
            setIsSearching(false);
          });
        })
        .catch(e => console.error('Error conectando a SignalR:', e));
    }

    return () => {
      if (connection) {
        connection.off('RecibirInfoRastreo');
        connection.off('RastreoNoEncontrado');
      }
    };
  }, [connection]);

  const handleSearch = useCallback(async () => {
    const trimmed = guideNumber.trim().toUpperCase();
    if (!trimmed) return;

    if (mockTracking[trimmed] && (!connection || connection.state !== 'Connected')) {
        setTracking(mockTracking[trimmed]);
        setNotFound(false);
        return;
    }

    if (connection && connection.state === 'Connected') {
      setIsSearching(true);
      setNotFound(false);
      try {
        await connection.invoke('SolicitarInfoRastreo', trimmed);
      } catch (error) {
        console.error('Error al solicitar info:', error);
        setIsSearching(false);
      }
    } else {
      console.warn('SignalR no está conectado.');
      setTracking(null);
      setNotFound(true);
    }
  }, [guideNumber, connection]);

  // Cálculo seguro extraído fuera del HTML para evitar errores de renderizado
  const currentStep = tracking && tracking.estado ? statusIndex(tracking.estado) : -1;
  const progressWidth = currentStep >= 0 ? (currentStep / (statusSteps.length - 1)) * (100 - 12) : 0;

  return (
    <section className="px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-5"
      >
        <h2 className="text-lg font-bold text-foreground mb-1">Rastrear Envío</h2>
        <p className="text-sm text-muted-foreground mb-4">Ingresa tu número de guía</p>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Ej: VER-402-001"
              value={guideNumber}
              onChange={e => setGuideNumber(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-muted/50 border-border/50 h-11 rounded-xl text-sm"
              disabled={isSearching}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={isSearching}
            className="gradient-primary text-primary-foreground h-11 px-5 rounded-xl font-semibold shadow-md"
          >
            {isSearching ? 'Buscando...' : 'Buscar'}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
           Ingresa tú número de guía para saber el estado actual de tu envío.
        </p>

        <AnimatePresence mode="wait">
          {notFound && (
            <motion.div
              key="not-found"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3 bg-destructive/10 rounded-xl text-sm text-destructive text-center"
            >
              No se encontró el envío. Verifica tu número de guía.
            </motion.div>
          )}

          {tracking && !notFound && (
            <motion.div
              key="result"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5"
            >
              {/* Status Timeline */}
              <div className="flex items-center justify-between mb-5 relative">
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-border" />
                <div
                  className="absolute top-4 left-6 h-0.5 gradient-primary transition-all duration-700"
                  style={{ width: `${progressWidth}%` }}
                />

                {statusSteps.map((step, i) => {
                  const isActive = i <= currentStep;
                  const isCurrent = i === currentStep;
                  const StepIcon = step.icon;
                  return (
                    <div key={step.key} className="flex flex-col items-center z-10 relative">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isCurrent ? 1.15 : 1,
                          backgroundColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${isCurrent ? 'animate-pulse-soft shadow-md' : ''}`}
                      >
                        <StepIcon className={`h-4 w-4 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                      </motion.div>
                      <span className={`text-[10px] mt-1.5 font-medium ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Origen</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{tracking.origen}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Destino</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{tracking.destino}</p>
                  
                </div>
                 <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Unidad</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Truck className="h-3.5 w-3.5 text-primary" />
                    <span className="text-sm font-semibold text-foreground capitalize">{tracking.ubicacion}</span>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Llegada Est.</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-success" />
                    <span className="text-sm font-semibold text-foreground">{tracking.llegadaEstimada}</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Última actualización: {tracking.ultimaActualizacion}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default TrackingSection;