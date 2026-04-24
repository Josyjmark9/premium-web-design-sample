import { useEffect, useRef } from 'react';
import { VideoBackground } from './VideoBackground';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const stats = [
    { value: '200+', label: 'Sites launched' },
    { value: '98%', label: 'Client satisfaction' },
    { value: '3.2x', label: 'More conversions' },
    { value: '5 days', label: 'Average delivery' },
  ];

  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    // Background zoom
    gsap.to(videoRef.current, {
      scale: 1.5,
      opacity: 0.2,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    gsap.fromTo(
      itemsRef.current,
      { y: 40, opacity: 0, filter: 'blur(10px)', scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[600px] flex items-center justify-center py-32 px-6 bg-black overflow-hidden">
      {/* Background Video (Desaturated) */}
      <div ref={videoRef} className="absolute inset-0 z-0 opacity-40 will-change-transform">
        <VideoBackground 
            src="https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8" 
            desaturated={true}
        />
        <div className="absolute inset-0 bg-blue-600/10 mix-blend-color" />
        <div className="absolute top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-black to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-6xl">
        <div className="liquid-glass rounded-[2rem] p-12 md:p-20 overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                ref={(el) => (itemsRef.current[index] = el)}
                className="flex flex-col items-center text-center"
              >
                <span className="text-4xl md:text-5xl lg:text-7xl font-heading italic text-white mb-2">
                  {stat.value}
                </span>
                <span className="text-white/50 font-body font-light text-sm uppercase tracking-widest">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
