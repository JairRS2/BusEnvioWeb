import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, MapPin, Clock, Truck, CheckCircle2, FileText, Box, Luggage } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { mockTracking, type TrackingData } from '@/data/mockData';

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

  const handleSearch = () => {
    const trimmed = guideNumber.trim().toUpperCase();
    if (mockTracking[trimmed]) {
      setTracking(mockTracking[trimmed]);
      setNotFound(false);
    } else {
      setTracking(null);
      setNotFound(true);
    }
  };

  const currentStep = tracking ? statusIndex(tracking.status) : -1;

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
              placeholder="Ej: ENV-2024-001"
              value={guideNumber}
              onChange={e => setGuideNumber(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              className="pl-10 bg-muted/50 border-border/50 h-11 rounded-xl text-sm"
            />
          </div>
          <Button onClick={handleSearch} className="gradient-primary text-primary-foreground h-11 px-5 rounded-xl font-semibold shadow-md">
            Buscar
          </Button>
        </div>

        <p className="text-xs text-muted-foreground mt-2">
          Prueba: ENV-2024-001, ENV-2024-002, ENV-2024-003
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

          {tracking && (
            <motion.div
              key="result"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-5"
            >
              {/* Status Timeline */}
              <div className="flex items-center justify-between mb-5 relative">
                {/* Progress line */}
                <div className="absolute top-4 left-6 right-6 h-0.5 bg-border" />
                <div
                  className="absolute top-4 left-6 h-0.5 gradient-primary transition-all duration-700"
                  style={{ width: `${(currentStep / (statusSteps.length - 1)) * (100 - 12)}%` }}
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
                  <p className="text-sm font-semibold text-foreground mt-0.5">{tracking.origin}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Destino</p>
                  <p className="text-sm font-semibold text-foreground mt-0.5">{tracking.destination}</p>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Ubicación</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    {tracking.location === 'cajuela' ? (
                      <Box className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <FileText className="h-3.5 w-3.5 text-accent" />
                    )}
                    <span className="text-sm font-semibold text-foreground capitalize">{tracking.location}</span>
                  </div>
                </div>
                <div className="bg-muted/50 rounded-xl p-3">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Llegada Est.</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Clock className="h-3.5 w-3.5 text-success" />
                    <span className="text-sm font-semibold text-foreground">{tracking.estimatedArrival}</span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Última actualización: {tracking.lastUpdate}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default TrackingSection;
