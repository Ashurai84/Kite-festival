import React from 'react';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import SceneOpening from './scenes/SceneOpening';
import SceneSankranti from './scenes/SceneSankranti';
import SceneTransition from './scenes/SceneTransition';
import SceneLohri from './scenes/SceneLohri';
import SceneReflection from './scenes/SceneReflection';
import SceneFuture from './scenes/SceneFuture';

const FestivalExperience: React.FC = () => {
  const { currentScene, sceneProgress } = useScrollProgress(6);

  return (
    <main className="relative">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/20">
        <div 
          className="h-full transition-all duration-300 ease-out"
          style={{
            width: `${((currentScene + sceneProgress) / 6) * 100}%`,
            background: currentScene >= 3 
              ? 'linear-gradient(90deg, hsl(30, 100%, 50%), hsl(15, 90%, 50%))' 
              : 'linear-gradient(90deg, hsl(200, 70%, 60%), hsl(35, 100%, 60%))',
          }}
        />
      </div>

      {/* Scene navigation dots */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {['Opening', 'Sankranti', 'Transition', 'Lohri', 'Reflection', 'Future'].map((name, i) => (
          <button
            key={name}
            onClick={() => {
              const sceneHeight = (document.documentElement.scrollHeight - window.innerHeight) / 6;
              window.scrollTo({ top: sceneHeight * i, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3"
            aria-label={`Go to ${name}`}
          >
            <span 
              className="text-caption text-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-right whitespace-nowrap"
              style={{ 
                color: currentScene >= 3 ? 'hsl(35, 80%, 85%)' : 'hsl(25, 40%, 40%)',
              }}
            >
              {name}
            </span>
            <div 
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                background: currentScene === i 
                  ? (currentScene >= 3 ? 'hsl(30, 100%, 55%)' : 'hsl(30, 100%, 50%)')
                  : (currentScene >= 3 ? 'hsla(35, 40%, 70%, 0.5)' : 'hsla(35, 30%, 50%, 0.4)'),
                transform: currentScene === i ? 'scale(1.5)' : 'scale(1)',
                boxShadow: currentScene === i 
                  ? '0 0 10px hsla(30, 100%, 50%, 0.5)' 
                  : 'none',
              }}
            />
          </button>
        ))}
      </nav>

      {/* Scenes */}
      <SceneOpening 
        sceneProgress={currentScene === 0 ? sceneProgress : currentScene > 0 ? 1 : 0} 
        isActive={currentScene === 0} 
      />
      <SceneSankranti 
        sceneProgress={currentScene === 1 ? sceneProgress : currentScene > 1 ? 1 : 0} 
        isActive={currentScene === 1} 
      />
      <SceneTransition 
        sceneProgress={currentScene === 2 ? sceneProgress : currentScene > 2 ? 1 : 0} 
        isActive={currentScene === 2} 
      />
      <SceneLohri 
        sceneProgress={currentScene === 3 ? sceneProgress : currentScene > 3 ? 1 : 0} 
        isActive={currentScene === 3} 
      />
      <SceneReflection 
        sceneProgress={currentScene === 4 ? sceneProgress : currentScene > 4 ? 1 : 0} 
        isActive={currentScene === 4} 
      />
      <SceneFuture 
        sceneProgress={currentScene === 5 ? sceneProgress : 0} 
        isActive={currentScene === 5} 
      />

      {/* Spacer to ensure enough scroll room */}
      <div style={{ height: '50vh' }} />
    </main>
  );
};

export default FestivalExperience;
