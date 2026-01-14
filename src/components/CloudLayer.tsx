import React from 'react';

interface CloudLayerProps {
  scrollProgress: number;
  opacity?: number;
}

const CloudLayer: React.FC<CloudLayerProps> = ({ scrollProgress, opacity = 1 }) => {
  // Clouds move based on scroll
  const cloudOffset1 = scrollProgress * 100;
  const cloudOffset2 = scrollProgress * 60;
  const cloudOffset3 = scrollProgress * 80;

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ opacity }}
    >
      {/* Cloud 1 - Large, back layer */}
      <div
        className="absolute w-80 h-32"
        style={{
          top: '15%',
          left: `${-20 + cloudOffset1}%`,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, transparent 70%)',
          filter: 'blur(20px)',
          transform: 'scaleX(2)',
        }}
      />
      
      {/* Cloud 2 - Medium, mid layer */}
      <div
        className="absolute w-60 h-24"
        style={{
          top: '25%',
          right: `${-10 + cloudOffset2}%`,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 50%, transparent 70%)',
          filter: 'blur(15px)',
          transform: 'scaleX(1.8)',
        }}
      />
      
      {/* Cloud 3 - Small, front layer */}
      <div
        className="absolute w-48 h-20"
        style={{
          top: '35%',
          left: `${10 + cloudOffset3}%`,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, transparent 70%)',
          filter: 'blur(12px)',
          transform: 'scaleX(1.5)',
        }}
      />

      {/* Cloud 4 - Wispy */}
      <div
        className="absolute w-40 h-16"
        style={{
          top: '20%',
          left: `${50 + cloudOffset1 * 0.5}%`,
          background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, transparent 60%)',
          filter: 'blur(10px)',
          transform: 'scaleX(2.5)',
        }}
      />
    </div>
  );
};

export default CloudLayer;
