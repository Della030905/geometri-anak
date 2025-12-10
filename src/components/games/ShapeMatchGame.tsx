import React, { useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ShapeMatchGameProps {
  onBack: () => void;
}

const shapeQuestions = [
  { 
    shape: 'circle', 
    color: 'bg-primary', 
    answer: 'lingkaran', 
    options: ['lingkaran', 'persegi', 'segitiga', 'oval'] 
  },
  { 
    shape: 'square', 
    color: 'bg-pink', 
    answer: 'persegi', 
    options: ['lingkaran', 'persegi', 'persegi panjang', 'segitiga'] 
  },
  { 
    shape: 'triangle', 
    color: 'bg-secondary', 
    answer: 'segitiga', 
    options: ['lingkaran', 'persegi', 'segitiga', 'kerucut'] 
  },
  { 
    shape: 'rectangle', 
    color: 'bg-green', 
    answer: 'persegi panjang', 
    options: ['persegi', 'persegi panjang', 'segitiga', 'trapesium'] 
  },
  { 
    shape: 'hexagon', 
    color: 'bg-purple', 
    answer: 'segienam', 
    options: ['segilima', 'segienam', 'segitiga', 'lingkaran'] 
  },
];

export const ShapeMatchGame = ({ onBack }: ShapeMatchGameProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleAnswer = (answer: string) => {
    if (answered) return;
    
    setSelectedAnswer(answer);
    setAnswered(true);
    
    const isCorrect = answer === shapeQuestions[currentQuestion].answer;
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success('Benar! Kamu hebat! 🎉');
    } else {
      toast.error(`Jawaban yang benar: ${shapeQuestions[currentQuestion].answer}`);
    }

    setTimeout(() => {
      if (currentQuestion < shapeQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setAnswered(false);
        setSelectedAnswer(null);
      } else {
        setGameComplete(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setGameComplete(false);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  const renderShape = (shape: string, color: string) => {
    const baseClass = cn('w-32 h-32 md:w-40 md:h-40 animate-float shadow-xl', color);
    
    switch (shape) {
      case 'circle':
        return <div className={cn(baseClass, 'rounded-full')} />;
      case 'square':
        return <div className={cn(baseClass, 'rounded-lg')} />;
      case 'triangle':
        return (
          <div 
            className={cn(baseClass)} 
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
          />
        );
      case 'rectangle':
        return <div className={cn(baseClass, 'rounded-lg', 'w-48 h-28 md:w-56 md:h-32')} />;
      case 'hexagon':
        return (
          <div 
            className={cn(baseClass)} 
            style={{ clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' }}
          />
        );
      default:
        return null;
    }
  };

  const currentQ = shapeQuestions[currentQuestion];

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
          <span className="font-display text-lg">Skor: {score}/{shapeQuestions.length}</span>
        </div>
      </div>

      {!gameComplete ? (
        <div className="text-center">
          {/* Progress */}
          <div className="mb-6">
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / shapeQuestions.length) * 100}%` }}
              />
            </div>
            <p className="font-body text-sm text-muted-foreground mt-2">
              Pertanyaan {currentQuestion + 1} dari {shapeQuestions.length}
            </p>
          </div>

          <h2 className="font-display text-2xl text-foreground mb-6">
            Ini bentuk apa?
          </h2>

          {/* Shape Display */}
          <div className="flex justify-center mb-8">
            {renderShape(currentQ.shape, currentQ.color)}
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {currentQ.options.map((option) => {
              const isCorrect = option === currentQ.answer;
              const isSelected = option === selectedAnswer;
              
              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={answered}
                  className={cn(
                    'px-4 py-3 rounded-xl font-display text-base capitalize',
                    'transform transition-all duration-300',
                    !answered && 'hover:scale-105 active:scale-95',
                    answered
                      ? isCorrect
                        ? 'bg-green text-green-foreground'
                        : isSelected
                          ? 'bg-destructive text-destructive-foreground'
                          : 'bg-muted text-muted-foreground'
                      : 'bg-primary text-primary-foreground hover:glow-primary'
                  )}
                >
                  {option}
                </button>
              );
            })}
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
            Skormu: {score}/{shapeQuestions.length}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={resetGame}
              className={cn(
                'px-6 py-3 rounded-full font-display text-lg',
                'bg-green text-green-foreground',
                'transform transition-all duration-300 hover:scale-105',
                'hover:glow-green',
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
