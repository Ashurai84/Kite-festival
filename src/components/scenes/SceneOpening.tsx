import React from 'react';
import heroImage from '@/assets/hero-kite-scene.png';
import CloudLayer from '../CloudLayer';
import { clamp, mapRange, easeOutQuad } from '@/hooks/useScrollProgress';

interface SceneOpeningProps {
  sceneProgress: number;
  isActive: boolean;
}

const SceneOpening: React.FC<SceneOpeningProps> = ({ sceneProgress, isActive }) => {
  // Text fades out as scroll begins
  const textOpacity = clamp(1 - sceneProgress * 3, 0, 1);
  
  // Parallax for background
  const bgY = sceneProgress * 50;
  const bgScale = 1 + sceneProgress * 0.05;

  return (
    <section className="scene" style={{ height: '200vh' }}>
      {/* Sky gradient background */}
      <div 
        className="fixed inset-0 transition-colors duration-1000"
        style={{
          background: `linear-gradient(180deg, 
            hsl(200, 70%, ${80 - sceneProgress * 15}%) 0%, 
            hsl(${200 - sceneProgress * 170}, ${70 + sceneProgress * 20}%, ${75 - sceneProgress * 10}%) 50%, 
            hsl(${35 + sceneProgress * 10}, 100%, ${70 - sceneProgress * 5}%) 100%)`,
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      />

      {/* Cloud layer */}
      {isActive && (
        <div className="fixed inset-0 pointer-events-none">
          <CloudLayer scrollProgress={sceneProgress} opacity={1 - sceneProgress * 0.5} />
        </div>
      )}

      {/* Hero background image */}
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: isActive ? 1 : 0,
          transform: `translateY(${bgY}px) scale(${bgScale})`,
        }}
      >
        <img 
          src={heroImage} 
          alt="Boy flying kite against golden sky"
          className="w-full h-full object-cover object-bottom"
          style={{
            filter: `brightness(${1 + sceneProgress * 0.1}) saturate(${1 + sceneProgress * 0.2})`,
          }}
        />
        
        {/* Gradient overlay for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.15) 100%)',
          }}
        />
      </div>

      {/* Opening text */}
      <div 
        className="fixed inset-0 flex items-center justify-center pointer-events-none"
        style={{
          opacity: isActive ? textOpacity : 0,
        }}
      >
        <div className="text-center px-8 max-w-4xl">
          <p 
            className="text-poetic text-2xl md:text-4xl lg:text-5xl leading-relaxed"
            style={{
              color: 'hsl(25, 30%, 20%)',
              textShadow: '0 2px 20px rgba(255,255,255,0.5)',
            }}
          >
            Across India, harvest festivals move with the wind, the fire, and the people.
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          opacity: isActive && sceneProgress < 0.1 ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div className="flex flex-col items-center gap-2 text-earth/60">
          <span className="text-caption text-xs">Scroll to begin</span>
          <div className="w-px h-8 bg-earth/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default SceneOpening;
