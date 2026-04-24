import { useEffect, useRef } from 'react';
import { VideoBackground } from './VideoBackground';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function StartSection() {
  const videoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    // Background zoom and blur
    gsap.fromTo(videoRef.current, 
      { scale: 1, filter: 'blur(0px) saturate(0.5)', opacity: 0.5 },
      {
        scale: 2,
        filter: 'blur(10px) saturate(2)',
        opacity: 0.2,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1.5
        }
      }
    );

    // Color overlay animation
    gsap.to(".color-overlay", {
      opacity: 0.6,
      hueRotate: 90,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });

    // Fade out on scroll away
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -100,
      filter: 'blur(10px)',
      scrollTrigger: {
        trigger: containerRef.current,
        start: "bottom 70%",
        end: "bottom top",
        scrub: 1
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[600px] flex flex-col items-center justify-center py-24 px-6 overflow-hidden bg-black">
      {/* Background HLS Video */}
      <div ref={videoRef} className="absolute inset-0 z-0 will-change-transform">
        <VideoBackground src="https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8" />
        <div className="color-overlay absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 opacity-20 pointer-events-none mix-blend-overlay" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6"
        >
          How It Works
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-7xl font-heading italic tracking-tight leading-[0.9] text-white mb-6"
        >
          You dream it. <br /> We ship it.
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-white/60 font-body font-light text-sm md:text-base mb-10 max-w-xl"
        >
          Share your vision. Our AI handles the rest&mdash;wireframes, design, code, launch. 
          All in days, not quarters.
        </motion.p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="liquid-glass-strong rounded-full px-8 py-3.5 text-sm font-medium transition-transform"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
}
