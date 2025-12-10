import React, { useState } from 'react';
import { Gamepad2, Puzzle, Eye, Home as HomeIcon, Move, ArrowLeft } from 'lucide-react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { FloatingShapes } from '@/components/FloatingShapes';
import { AudioControls } from '@/components/AudioControls';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

// Game Components
import { ShapeMatchGame } from '@/components/games/ShapeMatchGame';
import { PuzzleGame } from '@/components/games/PuzzleGame';
import { PositionGame } from '@/components/games/PositionGame';
import { BuildHouseGame } from '@/components/games/BuildHouseGame';

const games = [
  { id: 'shape-match', title: 'Tebak Bentuk', icon: Eye, color: 'bg-primary', desc: 'Tebak nama bentuk dari gambar' },
  { id: 'puzzle', title: 'Puzzle Bentuk', icon: Puzzle, color: 'bg-secondary', desc: 'Cocokkan bentuk ke kategorinya' },
  { id: 'position', title: 'Posisi Benda', icon: Move, color: 'bg-pink', desc: 'Letakkan benda di posisi yang benar' },
  { id: 'build', title: 'Susun Rumah', icon: HomeIcon, color: 'bg-green', desc: 'Susun bentuk jadi gambar rumah' },
];

const GamesPage = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  const renderGame = () => {
    switch (activeGame) {
      case 'shape-match':
        return <ShapeMatchGame onBack={() => setActiveGame(null)} />;
      case 'puzzle':
        return <PuzzleGame onBack={() => setActiveGame(null)} />;
      case 'position':
        return <PositionGame onBack={() => setActiveGame(null)} />;
      case 'build':
        return <BuildHouseGame onBack={() => setActiveGame(null)} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen gradient-sky relative overflow-hidden pb-24">
      <FloatingShapes />
      <AudioControls />
      <div className="absolute inset-0 bg-geometry-pattern opacity-30" />
      
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <div className="inline-flex items-center gap-2 bg-accent/20 px-4 py-2 rounded-full mb-4">
            <Gamepad2 className="w-5 h-5 text-accent-foreground" />
            <span className="font-body text-accent-foreground">Game Interaktif</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground text-shadow">
            Ayo Bermain!
          </h1>
        </div>

        <div className="max-w-4xl mx-auto">
          {!activeGame ? (
            /* Game Selection */
            <div className="grid grid-cols-2 gap-4 slide-up">
              {games.map((game, index) => {
                const Icon = game.icon;
                return (
                  <button
                    key={game.id}
                    onClick={() => setActiveGame(game.id)}
                    className={cn(
                      'card-geometry p-4 md:p-6 flex flex-col items-center gap-3',
                      'transform transition-all duration-300 hover:scale-105 active:scale-95'
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={cn(
                      'w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg',
                      game.color
                    )}>
                      <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                    </div>
                    <span className="font-display text-base md:text-lg text-foreground">{game.title}</span>
                    <span className="font-body text-xs text-muted-foreground text-center hidden md:block">{game.desc}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            renderGame()
          )}
        </div>
      </div>

      <NavigationButtons nextPath="/kesimpulan" backPath="/materi/4" />
    </div>
  );
};

export default GamesPage;
