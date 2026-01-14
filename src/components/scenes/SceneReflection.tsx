import React from 'react';
import { clamp, mapRange } from '@/hooks/useScrollProgress';

interface SceneReflectionProps {
  sceneProgress: number;
  isActive: boolean;
}

const SceneReflection: React.FC<SceneReflectionProps> = ({ sceneProgress, isActive }) => {
  // Fade from warm to calm
  const warmth = 1 - sceneProgress * 0.5;
  
  // Text reveals sequentially
  const text1Opacity = clamp(mapRange(sceneProgress, 0.1, 0.3, 0, 1), 0, 1);
  const text2Opacity = clamp(mapRange(sceneProgress, 0.3, 0.5, 0, 1), 0, 1);
  const text3Opacity = clamp(mapRange(sceneProgress, 0.5, 0.7, 0, 1), 0, 1);

  return (
    <section className="scene" style={{ height: '200vh' }}>
      {/* Calming background gradient */}
      <div 
        className="fixed inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(${38 - sceneProgress * 8}, ${90 - sceneProgress * 40}%, ${95 - sceneProgress * 5}%) 0%, 
            hsl(${35 - sceneProgress * 5}, ${80 - sceneProgress * 30}%, ${90 - sceneProgress * 5}%) 100%)`,
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-out',
        }}
      />

      {/* Subtle warm glow remnant */}
      <div 
        className="fixed pointer-events-none"
        style={{
          bottom: '0',
          left: '50%',
          width: '100vw',
          height: '30vh',
          transform: 'translateX(-50%)',
          background: `radial-gradient(ellipse at center bottom, 
            hsla(30, 80%, 60%, ${warmth * 0.15}) 0%, 
            transparent 60%)`,
          opacity: isActive ? 1 : 0,
          filter: 'blur(40px)',
        }}
      />

      {/* Reflective content */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="text-center px-8 max-w-3xl space-y-12">
          <h2 
            className="text-caption text-sm tracking-[0.3em] mb-8"
            style={{ 
              color: 'hsl(25, 40%, 35%)',
              opacity: text1Opacity,
            }}
          >
            Why It Still Matters
          </h2>
          
          <p 
            className="text-poetic text-lg md:text-2xl leading-relaxed"
            style={{
              color: 'hsl(25, 35%, 25%)',
              opacity: text1Opacity,
              transform: `translateY(${(1 - text1Opacity) * 20}px)`,
              transition: 'transform 0.5s ease-out',
            }}
          >
            In a world of screens and distance,
          </p>
          
          <p 
            className="text-poetic text-lg md:text-2xl leading-relaxed"
            style={{
              color: 'hsl(25, 35%, 25%)',
              opacity: text2Opacity,
              transform: `translateY(${(1 - text2Opacity) * 20}px)`,
              transition: 'transform 0.5s ease-out',
            }}
          >
            these festivals remind us to gather.
          </p>
          
          <p 
            className="text-poetic text-xl md:text-3xl leading-relaxed font-medium"
            style={{
              color: 'hsl(25, 50%, 20%)',
              opacity: text3Opacity,
              transform: `translateY(${(1 - text3Opacity) * 20}px)`,
              transition: 'transform 0.5s ease-out',
            }}
          >
            To look up. To look around. To belong.
          </p>
        </div>
      </div>

      {/* Decorative elements - subtle geometric patterns */}
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: isActive ? sceneProgress * 0.1 : 0,
        }}
      >
        <div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full border border-earth/10"
          style={{ transform: `scale(${1 + sceneProgress * 0.5})` }}
        />
        <div 
          className="absolute bottom-40 right-20 w-24 h-24 rounded-full border border-saffron-light/20"
          style={{ transform: `scale(${1 + sceneProgress * 0.3})` }}
        />
      </div>
    </section>
  );
};

export default SceneReflection;
