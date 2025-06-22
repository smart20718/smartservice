import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects: React.FC = () => {
  // Create floating particles with different styles
  const particles = Array.from({ length: 30 }).map((_, index) => ({
    id: index,
    size: Math.random() * 60 + 10, // 10-70px
    blur: Math.random() * 10 + 5, // 5-15px blur
    x: Math.random() * 100, // 0-100% position
    y: Math.random() * 100, // 0-100% position 
    duration: Math.random() * 20 + 30, // 30-50 seconds
    delay: -Math.random() * 20 // Delay of -0 to -20s for offset start
  }));

  // Canvas ref for neural network animation
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Neural network animation using canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const points: { x: number; y: number; vx: number; vy: number }[] = [];
    let animationFrameId: number;
    let w: number, h: number;

    // Set canvas dimensions
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      
      // Create points
      points.length = 0;
      const gap = 100; // Increase gap for more spread out network
      const countX = Math.ceil(w / gap);
      const countY = Math.ceil(h / gap);
      
      for (let i = 0; i < countX; i++) {
        for (let j = 0; j < countY; j++) {
          points.push({
            x: i * gap + Math.random() * 40 - 20, // Add some randomness
            y: j * gap + Math.random() * 40 - 20,
            vx: (Math.random() - 0.5) * 0.15,
            vy: (Math.random() - 0.5) * 0.15
          });
        }
      }
    };

    // Draw animation frame
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw connections between points
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(14, 245, 224, 0.06)'; // Electric teal with low opacity
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < points.length; i++) {
        const point = points[i];
        
        // Move points
        point.x += point.vx;
        point.y += point.vy;
        
        // Bounce off edges with some buffer
        if (point.x < -50 || point.x > w + 50) point.vx *= -1;
        if (point.y < -50 || point.y > h + 50) point.vy *= -1;
        
        // Connect to nearby points
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = point.x - p2.x;
          const dy = point.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 150) { // Increased connection distance
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(p2.x, p2.y);
          }
        }
      }
      
      ctx.stroke();
      
      // Draw points
      for (const point of points) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(14, 245, 224, 0.4)'; // Electric teal
        ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="background-effects">
      {/* Deep gradient background */}
      <div className="gradient-background"></div>
      
      {/* Canvas for neural network */}
      <canvas 
        ref={canvasRef} 
        className="neural-network"
        aria-hidden="true"
      ></canvas>
      
      {/* Floating particles */}
      {particles.map(particle => (
        <motion.div
          key={particle.id}
          className="floating-particle"
          style={{
            width: particle.size,
            height: particle.size,
            filter: `blur(${particle.blur}px)`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            x: [0, 30, -20, 40, 0],
            y: [0, -40, 20, -30, 0],
            opacity: [0.1, 0.2, 0.1, 0.15, 0.1],
          }}
          transition={{
            duration: particle.duration,
            times: [0, 0.25, 0.5, 0.75, 1],
            ease: "easeInOut",
            repeat: Infinity,
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Cinematic lighting effects */}
      <div className="lighting-effect lighting-effect-1"></div>
      <div className="lighting-effect lighting-effect-2"></div>
      <div className="lighting-effect lighting-effect-3"></div>
    </div>
  );
};

export default BackgroundEffects; 