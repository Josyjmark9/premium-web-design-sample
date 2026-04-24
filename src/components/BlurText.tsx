import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  direction?: 'top' | 'bottom';
}

export function BlurText({ text, delay = 200, className = "", direction = 'bottom' }: BlurTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const words = text.split(' ');

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => {
        const wordRef = useRef<HTMLSpanElement>(null);
        
        return (
          <motion.span
            key={index}
            ref={wordRef}
            initial={{ filter: 'blur(10px)', opacity: 0, y: direction === 'bottom' ? 50 : -50 }}
            animate={isInView ? { 
              filter: ['blur(10px)', 'blur(5px)', 'blur(0px)'], 
              opacity: [0, 0.5, 1], 
              y: [direction === 'bottom' ? 50 : -50, -5, 0] 
            } : {}}
            whileHover={{ 
              scale: 1.1, 
              color: "#fff",
              textShadow: "0 0 20px rgba(255,255,255,0.5)",
              transition: { duration: 0.2 }
            }}
            transition={{
              duration: 0.7,
              delay: (index * 0.1) + (delay / 1000),
              times: [0, 0.5, 1],
              ease: "easeOut"
            }}
            className="mr-[0.25em] mb-[0.1em] inline-block cursor-default select-none"
          >
            {word}
          </motion.span>
        );
      })}
    </div>
  );
}
