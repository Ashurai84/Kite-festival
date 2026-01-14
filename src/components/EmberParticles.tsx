import React, { useMemo } from 'react';

interface EmberParticle {
  id: number;
  left: string;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

interface EmberParticlesProps {
  count?: number;
  intensity?: number; // 0-1 to control visibility
}

const EmberParticles: React.FC<EmberParticlesProps> = ({ 
  count = 30, 
  intensity = 1 
}) => {
  const particles = useMemo<EmberParticle[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 6 + 2, // 2-8px
      delay: Math.random() * 4, // 0-4s delay
      duration: Math.random() * 3 + 3, // 3-6s duration
      opacity: Math.random() * 0.5 + 0.5, // 0.5-1 opacity
    }));
  }, [count]);

  if (intensity <= 0) return null;

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity: intensity }}
    >
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="ember"
          style={{
            left: particle.left,
            bottom: '-10px',
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default EmberParticles;
