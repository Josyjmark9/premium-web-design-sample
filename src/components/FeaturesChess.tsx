import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function FeaturesChess() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // We can target specific sections within the component for different staggers
    const sections = containerRef.current.querySelectorAll('.chess-section-row');

    sections.forEach((section) => {
      const elements = section.querySelectorAll('.animate-chess-item');
      
      gsap.fromTo(elements,
        { 
          opacity: 0, 
          y: 60, 
          scale: 0.9,
          filter: 'blur(10px)'
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 lg:px-16 flex flex-col gap-32 max-w-7xl mx-auto overflow-visible">
      {/* Header */}
      <div className="chess-section-row flex flex-col items-center text-center mb-8 relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6 animate-chess-item">
          Capabilities
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9] animate-chess-item">
          Pro features. Zero complexity.
        </h2>
      </div>

      {/* Row 1 */}
      <div className="chess-section-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
        <div className="absolute -left-20 top-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="flex flex-col items-start text-left order-2 lg:order-1 relative z-10">
          <h3 className="text-3xl md:text-4xl font-heading italic text-white mb-6 animate-chess-item">
            Designed to convert. Built to perform.
          </h3>
          <p className="text-white/60 font-body font-light text-base md:text-lg mb-8 animate-chess-item">
            Every pixel is intentional. Our AI studies what works across thousands of top sites&mdash;then builds yours to outperform them all.
          </p>
          <button className="liquid-glass-strong rounded-full px-6 py-2.5 text-sm font-medium animate-chess-item">
            Learn more
          </button>
        </div>
        <div className="order-1 lg:order-2 liquid-glass rounded-2xl overflow-hidden aspect-video animate-chess-item">
          <img 
            src="https://motionsites.ai/assets/hero-finlytic-preview-CV9g0FHP.gif" 
            alt="Feature 1" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="chess-section-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
        <div className="absolute -right-20 bottom-0 w-96 h-96 bg-pink-600/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="order-1 liquid-glass rounded-2xl overflow-hidden aspect-video relative z-10 animate-chess-item">
           <img 
            src="https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif" 
            alt="Feature 2" 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="flex flex-col items-start text-left order-2 relative z-10">
          <h3 className="text-3xl md:text-4xl font-heading italic text-white mb-6 animate-chess-item">
            It gets smarter. Automatically.
          </h3>
          <p className="text-white/60 font-body font-light text-base md:text-lg mb-8 animate-chess-item">
            Your site evolves on its own. AI monitors every click, scroll, and conversion&mdash;then optimizes in real time. No manual updates. Ever.
          </p>
          <button className="liquid-glass-strong rounded-full px-6 py-2.5 text-sm font-medium animate-chess-item">
            See how it works
          </button>
        </div>
      </div>
    </section>
  );
}
