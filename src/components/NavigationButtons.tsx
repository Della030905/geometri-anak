import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, LogOut, ChevronRight, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationButtonsProps {
  showBack?: boolean;
  showNext?: boolean;
  nextPath?: string;
  backPath?: string;
  onNext?: () => void;
  onBack?: () => void;
}

export const NavigationButtons = ({
  showBack = true,
  showNext = true,
  nextPath,
  backPath,
  onNext,
  onBack,
}: NavigationButtonsProps) => {
  const navigate = useNavigate();

  const handleHome = () => navigate('/home');
  const handleExit = () => navigate('/');
  const handleNext = () => {
    if (onNext) onNext();
    else if (nextPath) navigate(nextPath);
  };
  const handleBack = () => {
    if (onBack) onBack();
    else if (backPath) navigate(backPath);
  };

  const buttonBase = cn(
    'flex items-center gap-2 px-6 py-3 rounded-full font-display text-lg',
    'transition-all duration-300 transform hover:scale-105 active:scale-95',
    'shadow-lg'
  );

  return (
    <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-4 z-50 px-4">
      <button
        onClick={handleHome}
        className={cn(
          buttonBase,
          'bg-primary text-primary-foreground hover:glow-primary'
        )}
      >
        <Home className="w-5 h-5" />
        <span className="hidden sm:inline">Home</span>
      </button>

      {showBack && (backPath || onBack) && (
        <button
          onClick={handleBack}
          className={cn(
            buttonBase,
            'bg-purple text-purple-foreground hover:glow-purple'
          )}
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Kembali</span>
        </button>
      )}

      {showNext && (nextPath || onNext) && (
        <button
          onClick={handleNext}
          className={cn(
            buttonBase,
            'bg-green text-green-foreground hover:glow-green'
          )}
        >
          <span className="hidden sm:inline">Lanjut</span>
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      <button
        onClick={handleExit}
        className={cn(
          buttonBase,
          'bg-secondary text-secondary-foreground hover:glow-secondary'
        )}
      >
        <LogOut className="w-5 h-5" />
        <span className="hidden sm:inline">Keluar</span>
      </button>
    </div>
  );
};
