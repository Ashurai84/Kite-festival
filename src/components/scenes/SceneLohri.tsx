import React from 'react';
import lohriImage from '@/assets/lohri-bonfire.png';
import EmberParticles from '../EmberParticles';
import { clamp, mapRange, easeOutCubic } from '@/hooks/useScrollProgress';

interface SceneLohriProps {
  sceneProgress: number;
  isActive: boolean;
}

const SceneLohri: React.FC<SceneLohriProps> = ({ sceneProgress, isActive }) => {
  // Fire intensity increases with scroll
  const fireIntensity = easeOutCubic(Math.min(sceneProgress * 1.5, 1));
  const emberCount = Math.floor(fireIntensity * 40);
  
  // Glow pulsates
  const glowScale = 1 + Math.sin(sceneProgress * Math.PI * 4) * 0.1;
  const glowOpacity = 0.4 + fireIntensity * 0.4;
  
  // Text timing
  const textOpacity = clamp(mapRange(sceneProgress, 0.2, 0.4, 0, 1), 0, 1) *
                      clamp(mapRange(sceneProgress, 0.8, 1, 1, 0), 0, 1);
  
  // Image zoom
  const imageScale = 1 + sceneProgress * 0.1;

  return (
    <section className="scene" style={{ height: '200vh' }}>
      {/* Night sky background */}
      <div 
        className="fixed inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(220, 60%, ${8 + fireIntensity * 5}%) 0%, 
            hsl(${220 - fireIntensity * 190}, ${40 + fireIntensity * 40}%, ${12 + fireIntensity * 8}%) 100%)`,
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      />

      {/* Bonfire image */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: isActive ? 1 : 0,
          transform: `scale(${imageScale})`,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <img 
          src={lohriImage}
          alt="Lohri bonfire celebration"
          className="w-full h-full object-cover"
          style={{
            filter: `brightness(${0.8 + fireIntensity * 0.4}) saturate(${1 + fireIntensity * 0.3}) contrast(${1 + fireIntensity * 0.1})`,
          }}
        />
      </div>

      {/* Fire glow overlay */}
      <div 
        className="fixed pointer-events-none"
        style={{
          bottom: '0',
          left: '50%',
          width: '150vw',
          height: '70vh',
          transform: `translateX(-50%) scale(${glowScale})`,
          background: `radial-gradient(ellipse at center bottom, 
            hsla(25, 100%, 55%, ${glowOpacity}) 0%, 
            hsla(15, 95%, 45%, ${glowOpacity * 0.6}) 30%, 
            transparent 70%)`,
          opacity: isActive ? 1 : 0,
          filter: 'blur(60px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Secondary warm glow */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 80%, 
            hsla(${30 + fireIntensity * 10}, 100%, 50%, ${fireIntensity * 0.15}) 0%, 
            transparent 50%)`,
          opacity: isActive ? 1 : 0,
        }}
      />

      {/* Ember particles */}
      {isActive && (
        <EmberParticles count={emberCount} intensity={fireIntensity} />
      )}

      {/* Poetic text */}
      <div 
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          opacity: isActive ? textOpacity : 0,
        }}
      >
        <div className="text-center px-8 max-w-3xl space-y-6">
          <h2 
            className="text-caption text-sm tracking-[0.3em] mb-4"
            style={{ color: 'hsl(35, 80%, 80%)' }}
          >
            Lohri
          </h2>
          <p 
            className="text-poetic text-xl md:text-3xl lg:text-4xl leading-relaxed"
            style={{
              color: 'hsl(38, 100%, 92%)',
              textShadow: '0 0 40px hsla(25, 100%, 50%, 0.6)',
            }}
          >
            Around the fire, strangers become family.
          </p>
          <p 
            className="text-poetic text-lg md:text-2xl italic"
            style={{
              color: 'hsl(35, 70%, 80%)',
            }}
          >
            Warmth shared is warmth multiplied.
          </p>
        </div>
      </div>

      {/* Vignette effect */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
          opacity: isActive ? 0.7 : 0,
        }}
      />
    </section>
  );
};

export default SceneLohri;
