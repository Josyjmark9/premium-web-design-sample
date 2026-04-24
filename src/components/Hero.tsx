import { useEffect, useRef } from 'react';
import { BlurText } from './BlurText';
import { ArrowUpRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const rotateX = useTransform(springY, [-300, 300], [10, -10]);
  const rotateY = useTransform(springX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    gsap.to(videoRef.current, {
      scale: 4,
      opacity: 0,
      y: 400,
      rotationX: 15,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.to(".header-content", {
      opacity: 0,
      scale: 0.8,
      y: -150,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "80% top",
        scrub: true
      }
    });
  }, []);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden h-[1000px] w-full bg-black flex flex-col items-center justify-center"
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        onLoadedData={(e) => e.currentTarget.play()}
        poster="/images/hero_bg.jpeg"
        className="absolute left-0 w-full h-full object-cover z-0 opacity-40 pointer-events-none will-change-transform"
        style={{ objectPosition: 'center 20%' }}
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />
      <div 
        className="absolute bottom-0 left-0 right-0 h-[400px] z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, black)' }}
      />

      {/* Content */}
      <motion.div 
        style={{ rotateX, rotateY, perspective: 1000 }}
        className="header-content relative z-10 flex flex-col items-center px-6 text-center -mt-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-full px-1 py-1 flex items-center gap-2 pr-4 mb-8"
        >
          <span className="bg-white text-black rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider">New</span>
          <span className="text-white/80 text-xs font-body">Introducing AI-powered web design.</span>
        </motion.div>

        <BlurText 
          text="Josiah Johnmark" 
          className="text-6xl md:text-8xl lg:text-[7rem] font-heading italic text-foreground leading-[0.8] max-w-4xl tracking-[-4px] justify-center"
          delay={100}
        />

        <motion.p
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-sm md:text-lg text-white/70 font-body font-light mt-12 max-w-lg leading-relaxed"
        >
          Stunning design. Blazing performance. <br /> Built by AI, refined by experts. <br />
          This is web design, wildly reimagined.
        </motion.p>

        <motion.div
          initial={{ filter: 'blur(10px)', opacity: 0, y: 20 }}
          animate={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-12"
        >
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="liquid-glass-strong rounded-full px-10 py-4 flex items-center gap-2 text-sm font-medium"
          >
            Get Started
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Partners Bar */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-16 left-0 right-0 z-10 flex flex-col items-center gap-8"
      >
        <div className="liquid-glass rounded-full px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-white/30 font-body">
          Trusted by the teams behind
        </div>
        <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20">
          {['Stripe', 'Vercel', 'Linear', 'Notion', 'Figma'].map((partner) => (
            <motion.span 
              key={partner} 
              whileHover={{ scale: 1.1, color: '#fff' }}
              className="text-2xl md:text-3xl font-heading italic text-white/40 transition-colors"
            >
              {partner}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
