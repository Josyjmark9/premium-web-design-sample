import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "A complete rebuild in five days. The result outperformed everything we'd spent months building before.",
    name: "Sarah Chen",
    role: "CEO, Luminary"
  },
  {
    quote: "Conversions up 4x. That's not a typo. The design just works differently when it's built on real data.",
    name: "Marcus Webb",
    role: "Head of Growth, Arcline"
  },
  {
    quote: "They didn't just design our site. They defined our brand. World-class doesn't begin to cover it.",
    name: "Elena Voss",
    role: "Brand Director, Helix"
  }
];

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play reverse play reverse'
        },
      }
    );

    gsap.to(containerRef.current, {
      opacity: 0,
      y: -50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'bottom 80%',
        end: 'bottom 10%',
        scrub: true
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 px-6 lg:px-16 max-w-7xl mx-auto">
      <div className="flex flex-col items-center text-center mb-20">
        <div className="liquid-glass rounded-full px-3.5 py-1 text-xs font-medium text-white font-body mb-6">
          What They Say
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading italic text-white tracking-tight leading-[0.9]">
          Don't take our word for it.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, index) => (
          <div 
            key={index} 
            ref={(el) => (cardsRef.current[index] = el)}
            className="liquid-glass rounded-2xl p-10 flex flex-col h-full hover:bg-white/5 transition-colors duration-500"
          >
            <p className="text-lg md:text-xl text-white/80 font-body font-light italic mb-10 leading-relaxed">
              "{t.quote}"
            </p>
            <div className="mt-auto">
              <p className="text-white font-body font-medium text-base mb-1">
                {t.name}
              </p>
              <p className="text-white/40 font-body font-light text-sm">
                {t.role}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
