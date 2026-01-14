import React from 'react';
import { clamp, mapRange } from '@/hooks/useScrollProgress';

interface SceneFutureProps {
  sceneProgress: number;
  isActive: boolean;
}

const SceneFuture: React.FC<SceneFutureProps> = ({ sceneProgress, isActive }) => {
  // Text reveals
  const titleOpacity = clamp(mapRange(sceneProgress, 0.05, 0.2, 0, 1), 0, 1);
  const theme1Opacity = clamp(mapRange(sceneProgress, 0.15, 0.3, 0, 1), 0, 1);
  const theme2Opacity = clamp(mapRange(sceneProgress, 0.3, 0.45, 0, 1), 0, 1);
  const theme3Opacity = clamp(mapRange(sceneProgress, 0.45, 0.6, 0, 1), 0, 1);
  const finalOpacity = clamp(mapRange(sceneProgress, 0.65, 0.85, 0, 1), 0, 1);

  return (
    <section className="scene" style={{ height: '250vh' }}>
      {/* Hopeful gradient background */}
      <div 
        className="fixed inset-0"
        style={{
          background: `linear-gradient(180deg, 
            hsl(${35 + sceneProgress * 5}, ${60 + sceneProgress * 20}%, ${92 + sceneProgress * 3}%) 0%, 
            hsl(${30 + sceneProgress * 10}, ${70 + sceneProgress * 15}%, ${88 + sceneProgress * 5}%) 50%,
            hsl(${35 + sceneProgress * 15}, ${80 + sceneProgress * 10}%, ${85 + sceneProgress * 8}%) 100%)`,
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
          transition: 'opacity 0.5s ease-out',
        }}
      />

      {/* Subtle sun glow in background */}
      <div 
        className="fixed pointer-events-none"
        style={{
          top: '10%',
          left: '50%',
          width: '60vw',
          height: '60vw',
          maxWidth: '500px',
          maxHeight: '500px',
          transform: 'translateX(-50%)',
          background: `radial-gradient(circle, 
            hsla(40, 100%, 70%, ${sceneProgress * 0.2}) 0%, 
            hsla(35, 90%, 60%, ${sceneProgress * 0.1}) 40%,
            transparent 70%)`,
          opacity: isActive ? 1 : 0,
          filter: 'blur(30px)',
        }}
      />

      {/* Future vision content */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="text-center px-8 max-w-4xl">
          {/* Section title */}
          <h2 
            className="text-caption text-sm tracking-[0.3em] mb-16"
            style={{ 
              color: 'hsl(25, 50%, 40%)',
              opacity: titleOpacity,
            }}
          >
            What Comes Next
          </h2>

          {/* Future themes */}
          <div className="space-y-8 mb-20">
            <p 
              className="text-poetic text-lg md:text-xl"
              style={{
                color: 'hsl(25, 40%, 30%)',
                opacity: theme1Opacity,
                transform: `translateY(${(1 - theme1Opacity) * 15}px)`,
                transition: 'transform 0.4s ease-out',
              }}
            >
              Eco-friendly celebrations that honor the earth.
            </p>
            
            <p 
              className="text-poetic text-lg md:text-xl"
              style={{
                color: 'hsl(25, 40%, 30%)',
                opacity: theme2Opacity,
                transform: `translateY(${(1 - theme2Opacity) * 15}px)`,
                transition: 'transform 0.4s ease-out',
              }}
            >
              Responsible traditions passed through stories, not just rituals.
            </p>
            
            <p 
              className="text-poetic text-lg md:text-xl"
              style={{
                color: 'hsl(25, 40%, 30%)',
                opacity: theme3Opacity,
                transform: `translateY(${(1 - theme3Opacity) * 15}px)`,
                transition: 'transform 0.4s ease-out',
              }}
            >
              Digital storytelling that preserves culture across generations.
            </p>
          </div>

          {/* Final statement */}
          <div 
            className="pt-12 border-t border-earth/20"
            style={{
              opacity: finalOpacity,
              transform: `translateY(${(1 - finalOpacity) * 20}px)`,
              transition: 'transform 0.5s ease-out',
            }}
          >
            <p 
              className="text-poetic text-2xl md:text-4xl lg:text-5xl leading-relaxed font-light"
              style={{
                color: 'hsl(25, 50%, 20%)',
              }}
            >
              Traditions survive when they are allowed to move with time.
            </p>
          </div>
        </div>
      </div>

      {/* Closing visual - gentle animated elements */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: isActive ? finalOpacity * 0.3 : 0,
        }}
      >
        {/* Rising hope particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              bottom: `${10 + Math.random() * 20}%`,
              left: `${10 + Math.random() * 80}%`,
              width: `${4 + Math.random() * 4}px`,
              height: `${4 + Math.random() * 4}px`,
              background: `radial-gradient(circle, hsla(40, 100%, 70%, 0.8) 0%, hsla(35, 90%, 60%, 0.4) 50%, transparent 100%)`,
              animation: `float ${4 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* End marker */}
      <div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          opacity: isActive && sceneProgress > 0.9 ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div className="flex flex-col items-center gap-3">
          <div 
            className="w-2 h-2 rounded-full"
            style={{ background: 'hsl(30, 80%, 50%)' }}
          />
          <span 
            className="text-caption text-xs"
            style={{ color: 'hsl(25, 40%, 40%)' }}
          >
            The story continues
          </span>
        </div>
      </div>
    </section>
  );
};

export default SceneFuture;
