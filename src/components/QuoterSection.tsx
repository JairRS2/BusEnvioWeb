import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Package, Box, Luggage, MapPin, ArrowRight, Calculator, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { stops, packageCategories, nextDepartures } from '@/data/mockData';

const iconMap: Record<string, React.ElementType> = {
  FileText, Package, Box, Luggage,
};

const QuoterSection = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showResult, setShowResult] = useState(false);

  const selectedCat = packageCategories.find(c => c.id === selectedCategory);

  const calculatePrice = () => {
    if (!origin || !destination || !selectedCategory) return 0;
    const base = selectedCat?.basePrice || 0;
    const originIdx = stops.indexOf(origin);
    const destIdx = stops.indexOf(destination);
    const distance = Math.abs(destIdx - originIdx);
    return base + distance * 25;
  };

  const handleQuote = () => {
    if (origin && destination && selectedCategory) {
      setShowResult(true);
    }
  };

  const price = calculatePrice();

  return (
    <section className="px-4 pt-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <Calculator className="h-5 w-5 text-accent" />
          <h2 className="text-lg font-bold text-foreground">Cotizador Rápido</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Sin registro, calcula tu envío al instante</p>

        {/* Origin / Destination */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 block">Origen</label>
            <select
              value={origin}
              onChange={e => { setOrigin(e.target.value); setShowResult(false); }}
              className="w-full h-10 rounded-xl bg-muted/50 border border-border/50 px-3 text-sm text-foreground appearance-none"
            >
              <option value="">Seleccionar</option>
              {stops.map(s => (
                <option key={s} value={s} disabled={s === destination}>{s}</option>
              ))}
            </select>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground mt-4 shrink-0" />
          <div className="flex-1">
            <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-1 block">Destino</label>
            <select
              value={destination}
              onChange={e => { setDestination(e.target.value); setShowResult(false); }}
              className="w-full h-10 rounded-xl bg-muted/50 border border-border/50 px-3 text-sm text-foreground appearance-none"
            >
              <option value="">Seleccionar</option>
              {stops.map(s => (
                <option key={s} value={s} disabled={s === origin}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories */}
        <label className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 block">Tipo de Paquete</label>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {packageCategories.map(cat => {
            const Icon = iconMap[cat.icon] || Package;
            const isSelected = selectedCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setSelectedCategory(cat.id); setShowResult(false); }}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/50 bg-muted/30 hover:bg-muted/50'
                }`}
              >
                <Icon className={`h-5 w-5 mb-1 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                <p className={`text-xs font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>{cat.name}</p>
                <p className="text-[10px] text-muted-foreground">{cat.description}</p>
              </motion.button>
            );
          })}
        </div>

        <Button
          onClick={handleQuote}
          disabled={!origin || !destination || !selectedCategory}
          className="w-full gradient-accent text-accent-foreground h-11 rounded-xl font-semibold shadow-md disabled:opacity-40"
        >
          Calcular Precio
        </Button>

        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4"
            >
              <div className="gradient-primary rounded-xl p-4 text-center">
                <p className="text-xs text-primary-foreground/80">Precio estimado</p>
                <p className="text-3xl font-extrabold text-primary-foreground">${price} MXN</p>
                <p className="text-[10px] text-primary-foreground/70 mt-1">
                  {origin} → {destination} · {selectedCat?.name}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default QuoterSection;
