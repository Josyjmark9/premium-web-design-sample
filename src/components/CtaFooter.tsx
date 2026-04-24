import { useEffect, useRef } from 'react';
import { VideoBackground } from './VideoBackground';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CtaFooter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    gsap.fromTo(videoRef.current,
      { scale: 1.3, y: -50 },
      {
        scale: 1,
        y: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative flex flex-col bg-black overflow-hidden">
        <div className="relative min-h-[800px] flex items-center justify-center py-32 px-6 overflow-hidden">
            {/* Background Video */}
            <div ref={videoRef} className="absolute inset-0 z-0 opacity-60 will-change-transform">
                <VideoBackground src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8" />
                <div className="absolute top-0 left-0 right-0 h-[300px] bg-gradient-to-b from-black to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-black to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col items-center text-center max-w-4xl">
                <motion.h2 
                    initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-heading italic text-white leading-[0.85] tracking-tighter mb-8"
                >
                    Your next website <br /> starts here.
                </motion.h2>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="text-white/70 font-body font-light text-base md:text-lg mb-12 max-w-xl"
                >
                    Book a free strategy call. See what AI-powered design can do. 
                    No commitment, no pressure. Just possibilities.
                </motion.p>

                <div className="flex flex-wrap items-center justify-center gap-6">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="liquid-glass-strong rounded-full px-8 py-4 text-sm font-medium transition-transform"
                    >
                        Book a Call
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white text-black rounded-full px-8 py-4 text-sm font-medium hover:bg-white/90 transition-all shadow-xl shadow-black/20"
                    >
                        View Pricing
                    </motion.button>
                </div>
            </div>
        </div>

        {/* Footer Bar */}
        <div className="relative z-10 px-8 lg:px-16 py-12 border-t border-white/10 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white/40 text-[0.65rem] font-body uppercase tracking-wider">
                &copy; 2026 Josiah Johnmark. All rights reserved.
            </div>
            
            <div className="flex items-center gap-8">
                {['Privacy', 'Terms', 'Contact'].map((link) => (
                    <motion.a 
                        key={link} 
                        href="#" 
                        whileHover={{ color: "#fff", x: 2 }}
                        className="text-white/40 text-[0.65rem] font-body uppercase tracking-wider transition-colors"
                    >
                        {link}
                    </motion.a>
                ))}
            </div>
        </div>
    </section>
  );
}
