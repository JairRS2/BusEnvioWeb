import { motion } from 'framer-motion';
import { Package, Bus } from 'lucide-react';

const Header = () => {
  return (
    <header className="gradient-primary px-4 pt-[env(safe-area-inset-top)] pb-6">
      <div className="pt-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Bus className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-base font-extrabold text-primary-foreground tracking-tight">EnvíaXpress</h1>
            <p className="text-[10px] text-primary-foreground/70 font-medium">Mensajería en autobús</p>
          </div>
        </div>
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="w-9 h-9 rounded-xl bg-primary-foreground/20 flex items-center justify-center"
        >
          <Package className="h-4 w-4 text-primary-foreground" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-5"
      >
        <p className="text-primary-foreground/80 text-sm font-medium">¡Bienvenido!</p>
        <h2 className="text-xl font-extrabold text-primary-foreground leading-tight">
          Envía paquetes en el<br />próximo autobús
        </h2>
      </motion.div>
    </header>
  );
};

export default Header;
