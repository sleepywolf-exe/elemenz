import { useEffect, useRef } from 'react';

interface RainDropProps {
  density?: number; // Number of raindrops (default: 30)
  opacity?: number; // Opacity of raindrops (default: 0.3)
  speed?: number; // Animation speed (default: 1)
}

const RainDropEffect = ({ 
  density = 30, 
  opacity = 0.3, 
  speed = 1 
}: RainDropProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Create raindrops
    const drops: {
      x: number;
      y: number;
      l: number;
      xs: number;
      ys: number;
      opacity: number;
      radius: number;
    }[] = [];
    
    for (let i = 0; i < density; i++) {
      drops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        l: Math.random() * 5,
        xs: -4 + Math.random() * 4 + 2,
        ys: Math.random() * 10 * speed + 10 * speed,
        opacity: 0.2 + Math.random() * opacity,
        radius: 0.5 + Math.random() * 2
      });
    }
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw raindrops
      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i];
        
        ctx.beginPath();
        
        // Create gradient for drop
        const gradient = ctx.createLinearGradient(
          drop.x, drop.y, 
          drop.x, drop.y + drop.l
        );
        gradient.addColorStop(0, `rgba(120, 200, 255, 0)`);
        gradient.addColorStop(0.5, `rgba(120, 200, 255, ${drop.opacity})`);
        gradient.addColorStop(1, `rgba(120, 200, 255, 0)`);
        
        ctx.fillStyle = gradient;
        
        // Draw raindrop (slightly oval)
        ctx.ellipse(
          drop.x, 
          drop.y, 
          drop.radius, 
          drop.radius * 1.5, 
          0, 
          0, 
          Math.PI * 2
        );
        ctx.fill();
        
        // Water ripple at bottom
        if (drop.y > canvas.height - 10) {
          ctx.beginPath();
          ctx.arc(drop.x, canvas.height - 5, drop.radius * 3, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(120, 200, 255, ${drop.opacity / 3})`;
          ctx.stroke();
        }
        
        // Move drop
        drop.y += drop.ys;
        drop.x += drop.xs;
        
        // Reset drop when it reaches bottom
        if (drop.y > canvas.height) {
          drop.y = -20;
          drop.x = Math.random() * canvas.width;
        }
        
        // Reset drop if it goes off the side
        if (drop.x > canvas.width || drop.x < 0) {
          drop.x = Math.random() * canvas.width;
          drop.y = -20;
        }
      }
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, opacity, speed]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-10"
      style={{ opacity }}
    />
  );
};

export default RainDropEffect;