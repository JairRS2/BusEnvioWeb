import { motion } from 'framer-motion';
import { Bus, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { nextDepartures } from '@/data/mockData';

const DeparturesSection = () => {
  return (
    <section className="px-4 pt-5 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-2xl p-5"
      >
        <div className="flex items-center gap-2 mb-1">
          <Bus className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">Próximas Salidas</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">Autobuses con espacio para envíos</p>

        <div className="space-y-2">
          {nextDepartures.map((dep, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className={`flex items-center justify-between p-3 rounded-xl ${
                dep.available ? 'bg-success/5 border border-success/20' : 'bg-muted/30 border border-border/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  dep.available ? 'gradient-success' : 'bg-muted'
                }`}>
                  <Clock className={`h-4 w-4 ${dep.available ? 'text-success-foreground' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{dep.time}</p>
                  <p className="text-xs text-muted-foreground">{dep.route}</p>
                </div>
              </div>
              {dep.available ? (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-success">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Disponible
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground">
                  <XCircle className="h-3.5 w-3.5" /> Lleno
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default DeparturesSection;
