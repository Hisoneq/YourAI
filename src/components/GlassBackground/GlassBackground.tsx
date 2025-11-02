import React, { useEffect, useRef, useCallback, useState } from 'react';
import styles from './GlassBackground.module.css';
import type { GlassBackgroundProps, MousePosition } from './types';
import { GLASS_CONSTANTS } from './constants';

const GlassBackground: React.FC<GlassBackgroundProps> = ({
  blurIntensity = 30,
  animationSpeed = 'slow',
  cursorFollowerSize = 500,
  cursorFollowerBlur = 150,
  children,
  className = ''
}) => {
  const followerRef = useRef<HTMLDivElement>(null);
  const targetPosition = useRef<MousePosition>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPosition = useRef<MousePosition>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const animationFrameId = useRef<number | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);

  const getLagFactor = useCallback(() => {
    switch (animationSpeed) {
      case 'slow': return 0.03;
      case 'normal': return 0.08;
      case 'fast': return 0.15;
      default: return 0.08;
    }
  }, [animationSpeed]);

  const animateFollower = useCallback(() => {
    if (!followerRef.current || !GLASS_CONSTANTS.INTERACTIVE) return;

    const lagFactor = getLagFactor();
    
    currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * lagFactor;
    currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * lagFactor;

    followerRef.current.style.transform = `translate(${currentPosition.current.x - cursorFollowerSize / 2}px, ${currentPosition.current.y - cursorFollowerSize / 2}px)`;

    animationFrameId.current = requestAnimationFrame(animateFollower);
  }, [getLagFactor, cursorFollowerSize]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!GLASS_CONSTANTS.INTERACTIVE) return;
    
    targetPosition.current = {
      x: e.clientX,
      y: e.clientY
    };
  }, []);

  useEffect(() => {
    if (GLASS_CONSTANTS.INTERACTIVE) {
      window.addEventListener('mousemove', handleMouseMove);
      animationFrameId.current = requestAnimationFrame(animateFollower);
      setIsReady(true);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleMouseMove, animateFollower]);

  return (
    <div className={`${styles.background} ${className}`}>
      {GLASS_CONSTANTS.INTERACTIVE && (
        <div 
          ref={followerRef}
          className={`${styles.cursorFollower} ${styles.followerDark} ${isReady ? styles.ready : ''}`}
          style={{
            width: `${cursorFollowerSize}px`,
            height: `${cursorFollowerSize}px`,
            filter: `blur(${cursorFollowerBlur}px)`,
          }}
        />
      )}
      
      <div 
        className={styles.glass}
        style={{
          backdropFilter: `blur(${blurIntensity}px)`,
          WebkitBackdropFilter: `blur(${blurIntensity}px)`,
          backgroundColor: `rgba(255, 255, 255, ${GLASS_CONSTANTS.OPACITY})`
        }}
      />
        
      <div className={styles.noise} />
      
      {children && (
        <div className={styles.content}>
          {children}
        </div>
      )}
    </div>
  );
};

export default GlassBackground;