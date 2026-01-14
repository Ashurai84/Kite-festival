import React from 'react';
import sunElement from '@/assets/sun-element.png';
import { clamp, mapRange, easeOutCubic } from '@/hooks/useScrollProgress';

interface SceneSankrantiProps {
  sceneProgress: number;
  isActive: boolean;
}

const SceneSankranti: React.FC<SceneSankrantiProps> = ({ sceneProgress, isActive }) => {
  // Sun rotation and position
  const sunRotate = sceneProgress * 30;
  const sunScale = 0.8 + easeOutCubic(sceneProgress) * 0.4;
  const sunY = mapRange(sceneProgress, 0, 1, 100, -50);
  
  // Decorative kite using CSS
  const kiteY = mapRange(sceneProgress, 0, 0.5, -100, -200);
  const kiteOpacity = sceneProgress > 0.7 ? 1 - (sceneProgress - 0.7) * 3 : 1;
  
  // Text reveal timing
  const textOpacity = clamp(mapRange(sceneProgress, 0.3, 0.5, 0, 1), 0, 1);
  const textFadeOut = clamp(mapRange(sceneProgress, 0.8, 1, 1, 0), 0, 1);
  const finalTextOpacity = textOpacity * textFadeOut;

  // Sky transitions to warmer tones
  const skyHue = mapRange(sceneProgress, 0, 1, 200, 35);
  const skySaturation = mapRange(sceneProgress, 0, 1, 70, 90);

  return (
    <section className="scene" style={{ height: '200vh' }}>
      {/* Warm sky gradient */}
      <div 
        className="fixed inset-0 transition-all duration-500"
        style={{
          background: `linear-gradient(180deg, 
            hsl(${skyHue}, ${skySaturation}%, 75%) 0%, 
            hsl(${35 + sceneProgress * 10}, 95%, 65%) 50%, 
            hsl(30, 100%, 55%) 100%)`,
          opacity: isActive ? 1 : 0,
          pointerEvents: isActive ? 'auto' : 'none',
        }}
      />

      {/* Sun element */}
      <div 
        className="fixed pointer-events-none"
        style={{
          top: '30%',
          left: '50%',
          transform: `translateX(-50%) translateY(${sunY}px) rotate(${sunRotate}deg) scale(${sunScale})`,
          opacity: isActive ? 0.9 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <img 
          src={sunElement}
          alt="Golden sun"
          className="w-48 md:w-64 lg:w-80 animate-pulse-glow"
          style={{
            filter: `drop-shadow(0 0 60px hsla(35, 100%, 60%, 0.6)) 
                     drop-shadow(0 0 120px hsla(30, 100%, 50%, 0.4))`,
          }}
        />
      </div>

      {/* Decorative CSS kite shape */}
      <div 
        className="fixed pointer-events-none"
        style={{
          top: '15%',
          right: '20%',
          transform: `translateY(${kiteY}px) rotate(${sceneProgress * 10 + 15}deg)`,
          opacity: isActive ? kiteOpacity * 0.7 : 0,
          transition: 'opacity 0.3s ease-out',
        }}
      >
        <div 
          className="w-16 h-16 md:w-24 md:h-24 kite-sway"
          style={{
            background: 'linear-gradient(135deg, hsl(30, 100%, 55%) 0%, hsl(45, 100%, 60%) 50%, hsl(20, 95%, 50%) 100%)',
            clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
            filter: 'drop-shadow(0 5px 20px rgba(0,0,0,0.2))',
          }}
        />
        {/* Kite tail */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-full w-1"
          style={{
            height: '80px',
            background: 'linear-gradient(180deg, hsl(30, 100%, 55%) 0%, hsl(350, 80%, 55%) 50%, hsl(45, 100%, 60%) 100%)',
            transform: `rotate(${Math.sin(sceneProgress * Math.PI * 4) * 10}deg)`,
            transformOrigin: 'top center',
          }}
        />
      </div>

      {/* Poetic text */}
      <div 
        className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
        style={{
          opacity: isActive ? finalTextOpacity : 0,
        }}
      >
        <div className="text-center px-8 max-w-3xl space-y-6">
          <h2 
            className="text-caption text-sm tracking-[0.3em] mb-4"
            style={{ color: 'hsl(25, 50%, 25%)' }}
          >
            Makar Sankranti
          </h2>
          <p 
            className="text-poetic text-xl md:text-3xl lg:text-4xl leading-relaxed"
            style={{
              color: 'hsl(25, 40%, 20%)',
              textShadow: '0 2px 30px rgba(255,200,100,0.3)',
            }}
          >
            The sun returns north.
          </p>
          <p 
            className="text-poetic text-lg md:text-2xl italic"
            style={{
              color: 'hsl(25, 35%, 30%)',
            }}
          >
            A kite rises with prayers of renewal.
          </p>
        </div>
      </div>

      {/* Decorative sun rays */}
      <div 
        className="fixed inset-0 pointer-events-none overflow-hidden"
        style={{
          opacity: isActive ? sceneProgress * 0.3 : 0,
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 h-[200vh] w-1"
            style={{
              background: 'linear-gradient(180deg, hsla(40, 100%, 70%, 0.3) 0%, transparent 50%)',
              transform: `rotate(${i * 45 + sunRotate}deg)`,
              transformOrigin: 'top center',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default SceneSankranti;
