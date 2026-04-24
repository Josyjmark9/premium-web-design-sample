import { useEffect, useRef } from 'react';

export function RippleCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const ripples: { x: number; y: number; r: number; opacity: number }[] = [];

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Less aggressive throttling for more ripples
      if (Math.random() > 0.4) return; 

      ripples.push({
        x: e.clientX,
        y: e.clientY,
        r: 1,
        opacity: 0.25
      });
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < ripples.length; i++) {
        const ripple = ripples[i];
        
        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ripple.r += 1.8;
        ripple.opacity -= 0.004;

        if (ripple.opacity <= 0) {
          ripples.splice(i, 1);
          i--;
        }
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60] opacity-30"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
