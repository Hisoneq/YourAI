export interface GlassBackgroundProps {
  blurIntensity?: number;
  animationSpeed?: 'slow' | 'normal' | 'fast';
  cursorFollowerSize?: number;
  cursorFollowerBlur?: number;
  children?: React.ReactNode;
  className?: string;
}

export interface MousePosition {
  x: number;
  y: number;
}