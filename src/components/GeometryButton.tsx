import React from 'react';
import { cn } from '@/lib/utils';

interface GeometryButtonProps {
  shape: 'circle' | 'square' | 'triangle' | 'hexagon';
  color: 'primary' | 'secondary' | 'pink' | 'green' | 'purple' | 'accent';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const colorClasses = {
  primary: 'bg-primary text-primary-foreground hover:glow-primary',
  secondary: 'bg-secondary text-secondary-foreground hover:glow-secondary',
  pink: 'bg-pink text-pink-foreground hover:glow-pink',
  green: 'bg-green text-green-foreground hover:glow-green',
  purple: 'bg-purple text-purple-foreground hover:glow-purple',
  accent: 'bg-accent text-accent-foreground hover:glow-accent',
};

const sizeClasses = {
  sm: 'w-16 h-16 text-sm',
  md: 'w-24 h-24 text-base',
  lg: 'w-32 h-32 text-lg',
};

const shapeClasses = {
  circle: 'rounded-full',
  square: 'rounded-2xl',
  triangle: '',
  hexagon: '',
};

export const GeometryButton = ({
  shape,
  color,
  children,
  onClick,
  className,
  size = 'md',
}: GeometryButtonProps) => {
  const baseClasses = cn(
    'btn-geometry flex items-center justify-center font-display cursor-pointer',
    'transition-all duration-300 hover:scale-110 active:scale-95',
    colorClasses[color],
    sizeClasses[size],
    shapeClasses[shape],
    className
  );

  if (shape === 'triangle') {
    return (
      <button
        onClick={onClick}
        className={cn(baseClasses, 'relative')}
        style={{
          clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
          paddingTop: '20px',
        }}
      >
        <span className="mt-4">{children}</span>
      </button>
    );
  }

  if (shape === 'hexagon') {
    return (
      <button
        onClick={onClick}
        className={baseClasses}
        style={{
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
        }}
      >
        {children}
      </button>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
};
