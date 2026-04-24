import { motion } from 'motion/react';

export function FeaturesChess() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, filter: 'blur(10px)', scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: {
      opacity: 0,
      y: -30,
      filter: 'blur(10px)',
      scale: 0.95,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section className="py-32 px-6 lg:px-16 flex flex-col gap-32 max-w-7xl mx-auto overflow-visible">
      {/* Header */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={itemVariants}
        className="flex flex-col items-center text-center mb-8 relative"
      >
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6">
          Capabilities
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Pro features. Zero complexity.
        </h2>
      </motion.div>

      {/* Row 1 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative"
      >
        <div className="absolute -left-20 top-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <motion.div variants={itemVariants} className="flex flex-col items-start text-left order-2 lg:order-1 relative z-10">
          <h3 className="text-3xl md:text-4xl font-heading italic text-white mb-6">
            Designed to convert. Built to perform.
          </h3>
          <p className="text-white/60 font-body font-light text-base md:text-lg mb-8">
            Every pixel is intentional. Our AI studies what works across thousands of top sites&mdash;then builds yours to outperform them all.
          </p>
          <button className="liquid-glass-strong rounded-full px-6 py-2.5 text-sm font-medium">
            Learn more
          </button>
        </motion.div>
        <motion.div variants={itemVariants} className="order-1 lg:order-2 liquid-glass rounded-2xl overflow-hidden aspect-video">
          <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif" 
            alt="Feature 1" 
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Row 2 */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative"
      >
        <div className="absolute -right-20 bottom-0 w-96 h-96 bg-pink-600/10 blur-[120px] rounded-full pointer-events-none" />
        <motion.div variants={itemVariants} className="order-1 liquid-glass rounded-2xl overflow-hidden aspect-video relative z-10">
           <motion.img 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            src="https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif" 
            alt="Feature 2" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div variants={itemVariants} className="flex flex-col items-start text-left order-2">
          <h3 className="text-3xl md:text-4xl font-heading italic text-white mb-6">
            It gets smarter. Automatically.
          </h3>
          <p className="text-white/60 font-body font-light text-base md:text-lg mb-8">
            Your site evolves on its own. AI monitors every click, scroll, and conversion&mdash;then optimizes in real time. No manual updates. Ever.
          </p>
          <button className="liquid-glass-strong rounded-full px-6 py-2.5 text-sm font-medium">
            See how it works
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
