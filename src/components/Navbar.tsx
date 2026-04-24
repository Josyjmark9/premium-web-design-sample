import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50 px-8 lg:px-16 py-3 flex items-center justify-between pointer-events-none"
    >
      <div className="flex items-center pointer-events-auto">
        {/* Logo Placeholder */}
        <div className="h-12 w-12 bg-white/10 rounded-xl flex items-center justify-center liquid-glass">
            <span className="font-heading italic text-2xl">J</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-1 liquid-glass rounded-full px-1.5 py-1 pointer-events-auto">
        {['Home', 'Services', 'Work', 'Process', 'Pricing'].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ scale: 1.05, color: "#fff" }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-2 text-sm font-medium text-foreground/80 font-body transition-colors"
          >
            {item}
          </motion.a>
        ))}
      </div>

      <div className="flex items-center pointer-events-auto">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-black rounded-full px-4 py-2 text-sm font-medium flex items-center gap-1 transition-colors"
        >
          Get Started
          <ArrowUpRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.nav>
  );
}
