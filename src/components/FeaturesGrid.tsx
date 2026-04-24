import { useEffect, useRef } from 'react';
import { Zap, Palette, BarChart3, Shield } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Zap,
    title: 'Days, Not Months',
    description: 'Concept to launch at a pace that redefines fast. Because waiting isn\'t a strategy.',
  },
  {
    icon: Palette,
    title: 'Obsessively Crafted',
    description: 'Every detail considered. Every element refined. Design so precise, it feels inevitable.',
  },
  {
    icon: BarChart3,
    title: 'Built to Convert',
    description: 'Layouts informed by data. Decisions backed by performance. Results you can measure.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included.',
  },
];

export function FeaturesGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      cardsRef.current,
      { 
        y: 60, 
        opacity: 0,
        filter: 'blur(10px)',
        scale: 0.9,
        rotate: -2
      },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        scale: 1,
        rotate: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        },
      }
    );

    gsap.fromTo(containerRef.current,
      { opacity: 1, scale: 1 },
      {
        opacity: 0.3,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'bottom 90%',
          end: 'bottom 20%',
          scrub: true
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 lg:px-16 max-w-7xl mx-auto relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
      <div className="flex flex-col items-center text-center mb-20 relative z-10">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6">
          Why Us
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          The difference is everything.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <div 
            key={index} 
            ref={(el) => (cardsRef.current[index] = el)}
            className="liquid-glass rounded-2xl p-8 flex flex-col items-start group hover:bg-white/5 transition-colors duration-500"
          >
            <div className="liquid-glass-strong rounded-full w-12 h-12 flex items-center justify-center mb-6">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-body font-medium text-white mb-3">
                {feature.title}
            </h3>
            <p className="text-white/50 font-body font-light text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
