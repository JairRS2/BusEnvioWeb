import { motion } from 'framer-motion';
// Mantenemos el icono de Package
import { Package } from 'lucide-react'; 
import logo from '../assets/logo.png'; 

const Header = () => {
  return (
    // 1. Mantenemos el fondo morado corporativo
    <header className="bg-[#403b69] px-4 pt-[env(safe-area-inset-top)] pb-6">
      
      {/* 2. Reestructuramos la cabecera para que el logo y el texto estén en línea */}
      <div className="pt-4 flex items-start gap-x-6"> {/* Aumentamos la separación */}
        
        {/* 3. El Logo a la izquierda, mucho más grande (h-20) */}
        <div className="flex items-start">
          <img 
            src={logo} 
            alt="BusEnvio Logo" 
            className="h-20 object-contain" // Ajustamos la altura a h-20
          />
        </div>

        {/* 4. El Texto a la derecha del logo */}
        <div className="flex-1 flex flex-col pt-1"> {/* Alinear el texto superior con el logo */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <p className="text-white/80 text-sm font-medium">¡Bienvenido!</p>
            <h2 className="text-xl font-extrabold text-white leading-tight mt-1">
              Rastrea tu paquete o<br />
              {/* Resaltamos la cotización en amarillo */}
              <span className="text-[#f6d23a]">cotiza tu envío</span>
            </h2>
          </motion.div>
        </div>

        {/* 5. El Icono de la caja movido a la derecha del texto */}
        <div className="pt-1"> {/* Alinear con el texto */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center"
          >
            <Package className="h-4 w-4 text-white" />
          </motion.div>
        </div>
      </div>

    </header>
  );
};

export default Header;