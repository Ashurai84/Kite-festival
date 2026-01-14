import React from 'react';
import { clamp, mapRange } from '@/hooks/useScrollProgress';

interface SceneTransitionProps {
  sceneProgress: number;
  isActive: boolean;
}

const SceneTransition: React.FC<SceneTransitionProps> = ({ sceneProgress, isActive }) => {
  // Darkness intensifies
  const darkness = mapRange(sceneProgress, 0, 0.7, 0, 0.85);
  
  // Warm glow emerges
  const glowOpacity = mapRange(sceneProgress, 0.3, 0.8, 0, 0.6);
  const glowScale = mapRange(sceneProgress, 0.3, 1, 0.5, 1.5);
  
  // Text appears in the middle
  const textOpacity = clamp(mapRange(sceneProgress, 0.4, 0.6, 0, 1), 0, 1) * 
                      clamp(mapRange(sceneProgress, 0.85, 1, 1, 0), 0, 1);

  return (
    <section className="scene" style={{ height: '150vh' }}>
      {/* Darkening overlay */}
      <div 
        className="fixed inset-0 transition-opacity duration-500"
        style={{
          background: `linear-gradient(180deg, 
            hsl(220, 50%, ${15 - sceneProgress * 5}%) 0%, 
            hsl(${220 - sceneProgress * 190}, ${50 - sceneProgress * 20}%, ${15 + sceneProgress * 5}%) 100%)`,
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      />

      {/* Night sky overlay */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center top, transparent 0%, hsl(220, 60%, 8%) 100%)',
          opacity: isActive ? darkness : 0,
        }}
      />

      {/* Warm fire glow from below */}
      <div 
        className="fixed pointer-events-none"
        style={{
          bottom: '-20%',
          left: '50%',
          width: '120vw',
          height: '60vh',
          transform: `translateX(-50%) scale(${glowScale})`,
          background: 'radial-gradient(ellipse at center bottom, hsl(25, 100%, 50%) 0%, hsl(15, 95%, 45%) 30%, transparent 70%)',
          opacity: isActive ? glowOpacity : 0,
          filter: 'blur(40px)',
          transition: 'opacity 0.5s ease-out',
        }}
      />

      {/* Transitional text */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: isActive ? textOpacity : 0,
        }}
      >
        <div className="text-center px-8 max-w-3xl">
          <p 
            className="text-poetic text-xl md:text-3xl lg:text-4xl leading-relaxed"
            style={{
              color: 'hsl(35, 90%, 85%)',
              textShadow: '0 0 40px hsla(25, 100%, 50%, 0.5)',
            }}
          >
            When the sky rests, the fire gathers the people.
          </p>
        </div>
      </div>

      {/* Subtle stars appearing */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: isActive ? darkness * 0.5 : 0,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-cream/60"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SceneTransition;
