import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PuzzleGameProps {
  onBack: () => void;
}

interface Shape {
  id: string;
  name: string;
  type: 'datar' | 'ruang';
  color: string;
  style?: React.CSSProperties;
  className?: string;
}

const shapes: Shape[] = [
  { id: '1', name: 'Lingkaran', type: 'datar', color: 'bg-primary', className: 'rounded-full' },
  { id: '2', name: 'Kubus', type: 'ruang', color: 'bg-secondary', className: 'rounded-lg' },
  { id: '3', name: 'Segitiga', type: 'datar', color: 'bg-pink', style: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } },
  { id: '4', name: 'Bola', type: 'ruang', color: 'bg-green', className: 'rounded-full' },
  { id: '5', name: 'Persegi', type: 'datar', color: 'bg-purple', className: 'rounded-sm' },
  { id: '6', name: 'Kerucut', type: 'ruang', color: 'bg-accent', style: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' } },
];

export const PuzzleGame = ({ onBack }: PuzzleGameProps) => {
  const [placed, setPlaced] = useState<{ datar: string[]; ruang: string[] }>({ datar: [], ruang: [] });
  const [draggedShape, setDraggedShape] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);

  const availableShapes = shapes.filter(
    s => !placed.datar.includes(s.id) && !placed.ruang.includes(s.id)
  );

  const handleDragStart = (id: string) => {
    setDraggedShape(id);
  };

  const handleDrop = (category: 'datar' | 'ruang') => {
    if (!draggedShape) return;

    const shape = shapes.find(s => s.id === draggedShape);
    if (!shape) return;

    const isCorrect = shape.type === category;
    
    if (isCorrect) {
      setPlaced(prev => ({
        ...prev,
        [category]: [...prev[category], draggedShape]
      }));
      setScore(prev => prev + 1);
      toast.success(`Benar! ${shape.name} adalah bangun ${category}!`);
    } else {
      toast.error(`Oops! ${shape.name} bukan bangun ${category}`);
    }

    setDraggedShape(null);

    // Check if game is complete
    const totalPlaced = placed.datar.length + placed.ruang.length + (isCorrect ? 1 : 0);
    if (totalPlaced >= shapes.length) {
      setTimeout(() => setGameComplete(true), 500);
    }
  };

  const handleTouchDrop = (category: 'datar' | 'ruang') => {
    handleDrop(category);
  };

  const handleShapeClick = (id: string) => {
    if (draggedShape === id) {
      setDraggedShape(null);
    } else {
      setDraggedShape(id);
      toast.info('Sekarang klik kategori yang benar!');
    }
  };

  const resetGame = () => {
    setPlaced({ datar: [], ruang: [] });
    setDraggedShape(null);
    setGameComplete(false);
    setScore(0);
  };

  const renderShape = (shape: Shape, size: 'sm' | 'md' = 'md') => {
    const sizeClass = size === 'sm' ? 'w-10 h-10' : 'w-14 h-14 md:w-16 md:h-16';
    return (
      <div
        className={cn(sizeClass, shape.color, shape.className, 'shadow-lg')}
        style={shape.style}
      />
    );
  };

  return (
    <div className="card-geometry slide-up">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-muted rounded-full font-display text-sm hover:bg-muted/80 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali
        </button>
        <div className="flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full">
          <span className="font-display text-lg">Skor: {score}/{shapes.length}</span>
        </div>
      </div>

      {!gameComplete ? (
        <div>
          <h2 className="font-display text-xl md:text-2xl text-foreground text-center mb-2">
            Kelompokkan Bentuk!
          </h2>
          <p className="font-body text-sm text-muted-foreground text-center mb-6">
            Klik bentuk lalu klik kategori yang benar
          </p>

          {/* Available Shapes */}
          <div className="bg-muted rounded-2xl p-4 mb-6">
            <h3 className="font-display text-sm text-muted-foreground mb-3 text-center">
              Bentuk yang tersedia:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {availableShapes.map((shape) => (
                <button
                  key={shape.id}
                  onClick={() => handleShapeClick(shape.id)}
                  draggable
                  onDragStart={() => handleDragStart(shape.id)}
                  className={cn(
                    'p-3 rounded-xl bg-card transition-all duration-300',
                    'hover:scale-110 cursor-grab active:cursor-grabbing',
                    draggedShape === shape.id && 'ring-4 ring-accent scale-110'
                  )}
                >
                  {renderShape(shape)}
                  <p className="font-body text-xs text-center mt-2">{shape.name}</p>
                </button>
              ))}
              {availableShapes.length === 0 && (
                <p className="font-body text-muted-foreground">Semua bentuk sudah dikelompokkan!</p>
              )}
            </div>
          </div>

          {/* Drop Zones */}
          <div className="grid grid-cols-2 gap-4">
            {/* Bangun Datar */}
            <div
              onClick={() => draggedShape && handleTouchDrop('datar')}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop('datar')}
              className={cn(
                'bg-primary/10 border-2 border-dashed border-primary/30 rounded-2xl p-4 min-h-[180px]',
                'transition-all duration-300',
                draggedShape && 'border-primary bg-primary/20 cursor-pointer'
              )}
            >
              <h3 className="font-display text-base text-primary text-center mb-3">
                Bangun Datar
              </h3>
              <p className="font-body text-xs text-muted-foreground text-center mb-3">
                (2 dimensi)
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {placed.datar.map((id) => {
                  const shape = shapes.find(s => s.id === id);
                  if (!shape) return null;
                  return (
                    <div key={id} className="p-2 bg-card rounded-lg">
                      {renderShape(shape, 'sm')}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bangun Ruang */}
            <div
              onClick={() => draggedShape && handleTouchDrop('ruang')}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop('ruang')}
              className={cn(
                'bg-green/10 border-2 border-dashed border-green/30 rounded-2xl p-4 min-h-[180px]',
                'transition-all duration-300',
                draggedShape && 'border-green bg-green/20 cursor-pointer'
              )}
            >
              <h3 className="font-display text-base text-green text-center mb-3">
                Bangun Ruang
              </h3>
              <p className="font-body text-xs text-muted-foreground text-center mb-3">
                (3 dimensi)
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {placed.ruang.map((id) => {
                  const shape = shapes.find(s => s.id === id);
                  if (!shape) return null;
                  return (
                    <div key={id} className="p-2 bg-card rounded-lg">
                      {renderShape(shape, 'sm')}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">
            {score >= 5 ? '🏆' : score >= 4 ? '⭐' : '💪'}
          </div>
          <h2 className="font-display text-3xl text-foreground mb-2">
            {score >= 5 ? 'Sempurna!' : score >= 4 ? 'Bagus Sekali!' : 'Tetap Semangat!'}
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-6">
            Skormu: {score}/{shapes.length}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={resetGame}
              className={cn(
                'px-6 py-3 rounded-full font-display text-lg',
                'bg-green text-green-foreground',
                'transform transition-all duration-300 hover:scale-105',
                'flex items-center gap-2'
              )}
            >
              <RotateCcw className="w-5 h-5" />
              Main Lagi
            </button>
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-full font-display text-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
            >
              Game Lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
