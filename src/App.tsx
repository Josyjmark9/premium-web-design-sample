import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { StartSection } from './components/StartSection';
import { FeaturesChess } from './components/FeaturesChess';
import { FeaturesGrid } from './components/FeaturesGrid';
import { Stats } from './components/Stats';
import { Testimonials } from './components/Testimonials';
import { CtaFooter } from './components/CtaFooter';
import { RippleCursor } from './components/RippleCursor';

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen">
      <RippleCursor />
      <Navbar />
      <main>
        <Hero />
        <div className="bg-black relative z-10">
          <StartSection />
          <FeaturesChess />
          <FeaturesGrid />
          <Stats />
          <Testimonials />
          <CtaFooter />
        </div>
      </main>
    </div>
  );
}
