import { useState, useEffect, useCallback, useRef } from 'react';

interface ScrollProgress {
  progress: number; // 0-1 overall progress
  sceneProgress: number; // 0-1 progress within current scene
  currentScene: number; // 0-5 for 6 scenes
  scrollY: number;
  viewportHeight: number;
  documentHeight: number;
}

export const useScrollProgress = (totalScenes: number = 6): ScrollProgress => {
  const [scrollData, setScrollData] = useState<ScrollProgress>({
    progress: 0,
    sceneProgress: 0,
    currentScene: 0,
    scrollY: 0,
    viewportHeight: typeof window !== 'undefined' ? window.innerHeight : 0,
    documentHeight: 0,
  });

  const rafRef = useRef<number | null>(null);
  const lastScrollY = useRef(0);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    rafRef.current = requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - viewportHeight;
      
      // Calculate overall progress (0-1)
      const progress = Math.min(Math.max(scrollY / documentHeight, 0), 1);
      
      // Calculate current scene and scene progress
      const sceneHeight = documentHeight / totalScenes;
      const currentScene = Math.min(Math.floor(scrollY / sceneHeight), totalScenes - 1);
      const sceneStart = currentScene * sceneHeight;
      const sceneProgress = Math.min(Math.max((scrollY - sceneStart) / sceneHeight, 0), 1);

      // Only update if scroll position actually changed
      if (scrollY !== lastScrollY.current) {
        lastScrollY.current = scrollY;
        setScrollData({
          progress,
          sceneProgress,
          currentScene,
          scrollY,
          viewportHeight,
          documentHeight,
        });
      }
    });
  }, [totalScenes]);

  useEffect(() => {
    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  return scrollData;
};

// Utility function for smooth interpolation
export const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

// Utility function to map a value from one range to another
export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => {
  return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
};

// Clamp a value between min and max
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

// Ease functions for smoother animations
export const easeOutQuad = (t: number): number => t * (2 - t);
export const easeInOutQuad = (t: number): number => 
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
export const easeOutCubic = (t: number): number => (--t) * t * t + 1;
