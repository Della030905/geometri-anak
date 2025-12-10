import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, ArrowUp, ArrowDown, ArrowLeftIcon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface PositionGameProps {
  onBack: () => void;
}

interface PositionQuestion {
  id: number;
  instruction: string;
  targetPosition: 'atas' | 'bawah' | 'kiri' | 'kanan';
  objectName: string;
  objectColor: string;
}

const questions: PositionQuestion[] = [
  { id: 1, instruction: 'Letakkan BOLA di ATAS kotak!', targetPosition: 'atas', objectName: 'Bola', objectColor: 'bg-primary' },
  { id: 2, instruction: 'Letakkan SEGITIGA di BAWAH kotak!', targetPosition: 'bawah', objectName: 'Segitiga', objectColor: 'bg-secondary' },
  { id: 3, instruction: 'Letakkan PERSEGI di KIRI kotak!', targetPosition: 'kiri', objectName: 'Persegi', objectColor: 'bg-pink' },
  { id: 4, instruction: 'Letakkan LINGKARAN di KANAN kotak!', targetPosition: 'kanan', objectName: 'Lingkaran', objectColor: 'bg-green' },
  { id: 5, instruction: 'Letakkan BINTANG di ATAS kotak!', targetPosition: 'atas', objectName: 'Bintang', objectColor: 'bg-accent' },
];

const positions = [
  { id: 'atas', label: 'Atas', icon: ArrowUp, gridArea: 'top' },
  { id: 'bawah', label: 'Bawah', icon: ArrowDown, gridArea: 'bottom' },
  { id: 'kiri', label: 'Kiri', icon: ArrowLeftIcon, gridArea: 'left' },
  { id: 'kanan', label: 'Kanan', icon: ArrowRight, gridArea: 'right' },
];

export const PositionGame = ({ onBack }: PositionGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [placedPosition, setPlacedPosition] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const currentQ = questions[currentQuestion];

  const handlePositionClick = (position: string) => {
    if (showFeedback) return;

    setPlacedPosition(position);
    setShowFeedback(true);

    const isCorrect = position === currentQ.targetPosition;

    if (isCorrect) {
      setScore(prev => prev + 1);
      toast.success('Benar! Posisinya tepat! 🎉');
    } else {
      toast.error(`Oops! Seharusnya di ${currentQ.targetPosition}`);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setPlacedPosition(null);
        setShowFeedback(false);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameComplete(false);
    setPlacedPosition(null);
    setShowFeedback(false);
  };

  const renderObject = (color: string, name: string, size: string = 'w-12 h-12') => {
    if (name === 'Bola' || name === 'Lingkaran') {
      return <div className={cn(size, color, 'rounded-full shadow-lg')} />;
    }
    if (name === 'Segitiga') {
      return (
        <div 
          className={cn(size, color, 'shadow-lg')} 
          style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
        />
      );
    }
    if (name === 'Bintang') {
      return (
        <div 
          className={cn(size, color, 'shadow-lg')} 
          style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
        />
      );
    }
    return <div className={cn(size, color, 'rounded-lg shadow-lg')} />;
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
          <span className="font-display text-lg">Skor: {score}/{questions.length}</span>
        </div>
      </div>

      {!gameComplete ? (
        <div>
          {/* Progress */}
          <div className="mb-4">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              />
            </div>
            <p className="font-body text-sm text-muted-foreground text-center mt-2">
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </p>
          </div>

          {/* Instruction */}
          <div className="bg-accent/20 rounded-xl p-4 mb-6 text-center">
            <p className="font-display text-lg md:text-xl text-foreground">
              {currentQ.instruction}
            </p>
          </div>

          {/* Position Grid */}
          <div className="relative max-w-xs mx-auto">
            {/* Top */}
            <div className="flex justify-center mb-2">
              <button
                onClick={() => handlePositionClick('atas')}
                disabled={showFeedback}
                className={cn(
                  'w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center',
                  'transition-all duration-300',
                  !showFeedback && 'hover:bg-primary/20 hover:border-primary cursor-pointer',
                  placedPosition === 'atas' && (currentQ.targetPosition === 'atas' ? 'bg-green/30 border-green' : 'bg-destructive/30 border-destructive'),
                  showFeedback && currentQ.targetPosition === 'atas' && placedPosition !== 'atas' && 'bg-green/20 border-green'
                )}
              >
                {placedPosition === 'atas' ? (
                  renderObject(currentQ.objectColor, currentQ.objectName)
                ) : (
                  <span className="font-body text-xs text-muted-foreground">Atas</span>
                )}
              </button>
            </div>

            {/* Middle Row */}
            <div className="flex justify-center items-center gap-2">
              {/* Left */}
              <button
                onClick={() => handlePositionClick('kiri')}
                disabled={showFeedback}
                className={cn(
                  'w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center',
                  'transition-all duration-300',
                  !showFeedback && 'hover:bg-primary/20 hover:border-primary cursor-pointer',
                  placedPosition === 'kiri' && (currentQ.targetPosition === 'kiri' ? 'bg-green/30 border-green' : 'bg-destructive/30 border-destructive'),
                  showFeedback && currentQ.targetPosition === 'kiri' && placedPosition !== 'kiri' && 'bg-green/20 border-green'
                )}
              >
                {placedPosition === 'kiri' ? (
                  renderObject(currentQ.objectColor, currentQ.objectName)
                ) : (
                  <span className="font-body text-xs text-muted-foreground">Kiri</span>
                )}
              </button>

              {/* Center Box */}
              <div className="w-20 h-20 bg-purple rounded-xl flex items-center justify-center shadow-lg">
                <span className="font-display text-white text-xs">KOTAK</span>
              </div>

              {/* Right */}
              <button
                onClick={() => handlePositionClick('kanan')}
                disabled={showFeedback}
                className={cn(
                  'w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center',
                  'transition-all duration-300',
                  !showFeedback && 'hover:bg-primary/20 hover:border-primary cursor-pointer',
                  placedPosition === 'kanan' && (currentQ.targetPosition === 'kanan' ? 'bg-green/30 border-green' : 'bg-destructive/30 border-destructive'),
                  showFeedback && currentQ.targetPosition === 'kanan' && placedPosition !== 'kanan' && 'bg-green/20 border-green'
                )}
              >
                {placedPosition === 'kanan' ? (
                  renderObject(currentQ.objectColor, currentQ.objectName)
                ) : (
                  <span className="font-body text-xs text-muted-foreground">Kanan</span>
                )}
              </button>
            </div>

            {/* Bottom */}
            <div className="flex justify-center mt-2">
              <button
                onClick={() => handlePositionClick('bawah')}
                disabled={showFeedback}
                className={cn(
                  'w-20 h-20 rounded-xl border-2 border-dashed flex items-center justify-center',
                  'transition-all duration-300',
                  !showFeedback && 'hover:bg-primary/20 hover:border-primary cursor-pointer',
                  placedPosition === 'bawah' && (currentQ.targetPosition === 'bawah' ? 'bg-green/30 border-green' : 'bg-destructive/30 border-destructive'),
                  showFeedback && currentQ.targetPosition === 'bawah' && placedPosition !== 'bawah' && 'bg-green/20 border-green'
                )}
              >
                {placedPosition === 'bawah' ? (
                  renderObject(currentQ.objectColor, currentQ.objectName)
                ) : (
                  <span className="font-body text-xs text-muted-foreground">Bawah</span>
                )}
              </button>
            </div>
          </div>

          {/* Object to place */}
          <div className="mt-6 text-center">
            <p className="font-body text-sm text-muted-foreground mb-2">Bentuk yang harus diletakkan:</p>
            <div className="inline-flex items-center gap-3 bg-muted rounded-xl px-4 py-3">
              {renderObject(currentQ.objectColor, currentQ.objectName)}
              <span className="font-display text-lg">{currentQ.objectName}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">
            {score >= 4 ? '🏆' : score >= 3 ? '⭐' : '💪'}
          </div>
          <h2 className="font-display text-3xl text-foreground mb-2">
            {score >= 4 ? 'Luar Biasa!' : score >= 3 ? 'Bagus!' : 'Tetap Semangat!'}
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-6">
            Skormu: {score}/{questions.length}
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
