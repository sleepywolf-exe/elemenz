import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  saturation: number;
  lightness: number;
}

interface WaterParticlesProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  baseColor?: string; // Base color in HSL format e.g. '210'
  colorVariation?: number; // Hue variation amount e.g. 20 = ±20 degrees
  mouseInteraction?: boolean;
  connectParticles?: boolean;
}

const WaterParticles = ({
  count = 50,
  minSize = 3,
  maxSize = 10,
  speed = 0.5,
  baseColor = '210',
  colorVariation = 20,
  mouseInteraction = true,
  connectParticles = true,
}: WaterParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas to full screen
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Mouse position for interaction
    let mouseX = -1000;
    let mouseY = -1000;
    const mouseRadius = 120;
    
    if (mouseInteraction) {
      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
      });
      
      window.addEventListener('mouseout', () => {
        mouseX = -1000;
        mouseY = -1000;
      });
    }
    
    // Create particles
    const particles: Particle[] = [];
    
    for (let i = 0; i < count; i++) {
      const size = minSize + Math.random() * (maxSize - minSize);
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (-0.5 + Math.random()) * speed,
        speedY: (-0.5 + Math.random()) * speed,
        opacity: 0.2 + Math.random() * 0.8,
        saturation: 70 + Math.random() * 30,
        lightness: 60 + Math.random() * 20,
      });
    }
    
    // Animation function
    const animate = () => {
      // Clear canvas with very faint blue background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Bounce off walls
        if (p.x > canvas.width + p.size) {
          p.x = -p.size;
        } else if (p.x < -p.size) {
          p.x = canvas.width + p.size;
        }
        
        if (p.y > canvas.height + p.size) {
          p.y = -p.size;
        } else if (p.y < -p.size) {
          p.y = canvas.height + p.size;
        }
        
        // Mouse interaction
        if (mouseInteraction) {
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouseRadius) {
            const force = (mouseRadius - distance) / mouseRadius;
            const angle = Math.atan2(dy, dx);
            
            p.x += Math.cos(angle) * force * 2;
            p.y += Math.sin(angle) * force * 2;
          }
        }
        
        // Randomly change direction occasionally
        if (Math.random() < 0.01) {
          p.speedX = (-0.5 + Math.random()) * speed;
          p.speedY = (-0.5 + Math.random()) * speed;
        }
        
        // Hue variation
        const hue = Number(baseColor) + (Math.random() * colorVariation * 2) - colorVariation;
        
        // Draw particle
        ctx.beginPath();
        
        // Create gradient for particle
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, p.size
        );
        gradient.addColorStop(0, `hsla(${hue}, ${p.saturation}%, ${p.lightness}%, ${p.opacity})`);
        gradient.addColorStop(1, `hsla(${hue}, ${p.saturation}%, ${p.lightness}%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Connect particles with lines
      if (connectParticles) {
        const connectionDistance = 100;
        const connectionOpacity = 0.1;
        
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < connectionDistance) {
              const opacity = 1 - (distance / connectionDistance);
              
              ctx.beginPath();
              ctx.strokeStyle = `rgba(120, 200, 255, ${opacity * connectionOpacity})`;
              ctx.lineWidth = 1;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      if (mouseInteraction) {
        window.removeEventListener('mousemove', (e) => {
          mouseX = e.clientX;
          mouseY = e.clientY;
        });
        window.removeEventListener('mouseout', () => {
          mouseX = -1000;
          mouseY = -1000;
        });
      }
    };
  }, [count, minSize, maxSize, speed, baseColor, colorVariation, mouseInteraction, connectParticles]);
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

export default WaterParticles;