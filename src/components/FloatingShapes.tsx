import React from 'react';
import { cn } from '@/lib/utils';

export const FloatingShapes = () => {
  const shapes = [
    { type: 'circle', color: 'bg-primary/20', size: 'w-16 h-16', position: 'top-20 left-10', delay: '0s' },
    { type: 'square', color: 'bg-secondary/20', size: 'w-12 h-12', position: 'top-40 right-20', delay: '0.5s' },
    { type: 'triangle', color: 'bg-pink/20', size: 'w-14 h-14', position: 'bottom-40 left-20', delay: '1s' },
    { type: 'circle', color: 'bg-green/20', size: 'w-20 h-20', position: 'top-60 left-1/4', delay: '1.5s' },
    { type: 'square', color: 'bg-purple/20', size: 'w-10 h-10', position: 'bottom-60 right-1/4', delay: '2s' },
    { type: 'circle', color: 'bg-accent/30', size: 'w-8 h-8', position: 'top-32 right-1/3', delay: '0.3s' },
    { type: 'triangle', color: 'bg-primary/15', size: 'w-16 h-16', position: 'bottom-32 right-10', delay: '0.8s' },
    { type: 'square', color: 'bg-pink/15', size: 'w-14 h-14', position: 'top-1/2 left-5', delay: '1.2s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {shapes.map((shape, index) => (
        <div
          key={index}
          className={cn(
            'absolute animate-float',
            shape.color,
            shape.size,
            shape.position,
            shape.type === 'circle' && 'rounded-full',
            shape.type === 'square' && 'rounded-lg rotate-12',
          )}
          style={{
            animationDelay: shape.delay,
            ...(shape.type === 'triangle' && {
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
            }),
          }}
        />
      ))}
    </div>
  );
};
