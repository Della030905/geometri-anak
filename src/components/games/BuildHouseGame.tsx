import React, { useState } from 'react';
import { ArrowLeft, RotateCcw, Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface BuildHouseGameProps {
  onBack: () => void;
}

interface ShapePiece {
  id: string;
  name: string;
  type: 'roof' | 'body' | 'door' | 'window' | 'chimney';
  color: string;
  shape: 'triangle' | 'square' | 'rectangle' | 'smallSquare' | 'smallRect';
}

const shapePieces: ShapePiece[] = [
  { id: 'roof', name: 'Atap', type: 'roof', color: 'bg-secondary', shape: 'triangle' },
  { id: 'body', name: 'Badan Rumah', type: 'body', color: 'bg-pink', shape: 'square' },
  { id: 'door', name: 'Pintu', type: 'door', color: 'bg-amber-600', shape: 'rectangle' },
  { id: 'window1', name: 'Jendela 1', type: 'window', color: 'bg-primary', shape: 'smallSquare' },
  { id: 'window2', name: 'Jendela 2', type: 'window', color: 'bg-primary', shape: 'smallSquare' },
  { id: 'chimney', name: 'Cerobong', type: 'chimney', color: 'bg-gray-600', shape: 'smallRect' },
];

const targetOrder = ['chimney', 'roof', 'window1', 'window2', 'body', 'door'];

export const BuildHouseGame = ({ onBack }: BuildHouseGameProps) => {
  const [placedPieces, setPlacedPieces] = useState<string[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const availablePieces = shapePieces.filter(p => !placedPieces.includes(p.id));

  const handlePieceClick = (id: string) => {
    if (placedPieces.includes(id)) return;
    
    setSelectedPiece(id);
    toast.info('Klik tempat yang sesuai di rumah!');
  };

  const handleSlotClick = (slotType: string) => {
    if (!selectedPiece) {
      toast.info('Pilih bentuk dulu!');
      return;
    }

    const piece = shapePieces.find(p => p.id === selectedPiece);
    if (!piece) return;

    // Check if the piece type matches the slot
    const isCorrect = piece.type === slotType || 
      (slotType === 'window1' && piece.id === 'window1') ||
      (slotType === 'window2' && piece.id === 'window2');

    if (piece.type === slotType || 
        (slotType.startsWith('window') && piece.type === 'window' && !placedPieces.includes(piece.id))) {
      setPlacedPieces(prev => [...prev, selectedPiece]);
      toast.success(`Benar! ${piece.name} sudah dipasang!`);
      setSelectedPiece(null);

      // Check if all pieces are placed
      if (placedPieces.length + 1 >= shapePieces.length) {
        setTimeout(() => setGameComplete(true), 500);
      }
    } else {
      toast.error('Bentuk ini tidak cocok di sini!');
    }
  };

  const resetGame = () => {
    setPlacedPieces([]);
    setSelectedPiece(null);
    setGameComplete(false);
  };

  const removePiece = (id: string) => {
    setPlacedPieces(prev => prev.filter(p => p !== id));
  };

  const isPlaced = (id: string) => placedPieces.includes(id);

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
          <span className="font-display text-lg">{placedPieces.length}/{shapePieces.length}</span>
        </div>
      </div>

      {!gameComplete ? (
        <div>
          <h2 className="font-display text-xl md:text-2xl text-foreground text-center mb-2">
            Susun Rumah dari Bentuk Geometri!
          </h2>
          <p className="font-body text-sm text-muted-foreground text-center mb-6">
            Klik bentuk, lalu klik tempat yang sesuai
          </p>

          {/* House Building Area */}
          <div className="bg-gradient-to-b from-blue-200 to-green-200 rounded-2xl p-6 mb-6 relative min-h-[280px]">
            {/* Ground */}
            <div className="absolute bottom-0 left-0 right-0 h-8 bg-green-500 rounded-b-2xl" />
            
            {/* House Structure */}
            <div className="relative mx-auto w-fit">
              {/* Chimney Slot */}
              <div className="absolute -top-6 left-8">
                <button
                  onClick={() => handleSlotClick('chimney')}
                  className={cn(
                    'w-8 h-12 rounded-sm border-2 border-dashed transition-all',
                    isPlaced('chimney') ? 'bg-gray-600 border-gray-600' : 'border-gray-400 hover:border-gray-600 hover:bg-gray-200',
                    selectedPiece && !isPlaced('chimney') && 'animate-pulse'
                  )}
                />
              </div>

              {/* Roof Slot */}
              <button
                onClick={() => handleSlotClick('roof')}
                className={cn(
                  'w-40 h-20 border-2 border-dashed transition-all mx-auto mb-0',
                  isPlaced('roof') ? 'border-transparent' : 'border-secondary hover:bg-secondary/20',
                  selectedPiece && !isPlaced('roof') && 'animate-pulse'
                )}
                style={{ 
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  backgroundColor: isPlaced('roof') ? 'hsl(var(--secondary))' : undefined
                }}
              />

              {/* Body Slot */}
              <button
                onClick={() => handleSlotClick('body')}
                className={cn(
                  'w-36 h-28 rounded-sm border-2 border-dashed transition-all mx-auto relative',
                  isPlaced('body') ? 'bg-pink border-pink' : 'border-pink hover:bg-pink/20',
                  selectedPiece && !isPlaced('body') && 'animate-pulse'
                )}
              >
                {/* Windows inside body */}
                {isPlaced('body') && (
                  <>
                    {/* Window 1 Slot */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSlotClick('window1'); }}
                      className={cn(
                        'absolute top-3 left-3 w-8 h-8 rounded-sm border-2 border-dashed transition-all',
                        isPlaced('window1') ? 'bg-primary border-primary' : 'border-primary hover:bg-primary/20',
                        selectedPiece && !isPlaced('window1') && 'animate-pulse'
                      )}
                    />
                    {/* Window 2 Slot */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSlotClick('window2'); }}
                      className={cn(
                        'absolute top-3 right-3 w-8 h-8 rounded-sm border-2 border-dashed transition-all',
                        isPlaced('window2') ? 'bg-primary border-primary' : 'border-primary hover:bg-primary/20',
                        selectedPiece && !isPlaced('window2') && 'animate-pulse'
                      )}
                    />
                    {/* Door Slot */}
                    <button
                      onClick={(e) => { e.stopPropagation(); handleSlotClick('door'); }}
                      className={cn(
                        'absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-14 rounded-t-lg border-2 border-dashed transition-all',
                        isPlaced('door') ? 'bg-amber-600 border-amber-600' : 'border-amber-600 hover:bg-amber-200',
                        selectedPiece && !isPlaced('door') && 'animate-pulse'
                      )}
                    />
                  </>
                )}
              </button>
            </div>

            {/* Sun decoration */}
            <div className="absolute top-4 right-4 w-12 h-12 bg-yellow-400 rounded-full shadow-lg" />
          </div>

          {/* Available Pieces */}
          <div className="bg-muted rounded-2xl p-4">
            <h3 className="font-display text-sm text-muted-foreground mb-3 text-center">
              Bentuk yang tersedia:
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {availablePieces.map((piece) => (
                <button
                  key={piece.id}
                  onClick={() => handlePieceClick(piece.id)}
                  className={cn(
                    'p-3 rounded-xl bg-card transition-all duration-300',
                    'hover:scale-110 cursor-pointer',
                    selectedPiece === piece.id && 'ring-4 ring-accent scale-110'
                  )}
                >
                  <div className="flex flex-col items-center gap-2">
                    {piece.shape === 'triangle' && (
                      <div className={cn('w-12 h-10', piece.color)} style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
                    )}
                    {piece.shape === 'square' && (
                      <div className={cn('w-12 h-12 rounded-sm', piece.color)} />
                    )}
                    {piece.shape === 'rectangle' && (
                      <div className={cn('w-8 h-12 rounded-sm', piece.color)} />
                    )}
                    {piece.shape === 'smallSquare' && (
                      <div className={cn('w-8 h-8 rounded-sm', piece.color)} />
                    )}
                    {piece.shape === 'smallRect' && (
                      <div className={cn('w-6 h-10 rounded-sm', piece.color)} />
                    )}
                    <span className="font-body text-xs">{piece.name}</span>
                  </div>
                </button>
              ))}
              {availablePieces.length === 0 && (
                <p className="font-body text-green text-center">Semua bentuk sudah dipasang! ✓</p>
              )}
            </div>
          </div>

          {/* Reset button */}
          {placedPieces.length > 0 && (
            <button
              onClick={resetGame}
              className="mt-4 mx-auto flex items-center gap-2 px-4 py-2 bg-destructive/20 text-destructive rounded-full font-display text-sm hover:bg-destructive/30 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Ulangi
            </button>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🏠</div>
          <h2 className="font-display text-3xl text-foreground mb-2">
            Rumahnya Jadi!
          </h2>
          <p className="font-body text-xl text-muted-foreground mb-4">
            Kamu berhasil menyusun rumah dari bentuk geometri!
          </p>
          <div className="bg-muted rounded-xl p-4 mb-6 inline-block">
            <p className="font-body text-sm text-muted-foreground">
              <strong>Bentuk yang digunakan:</strong><br />
              Segitiga (atap), Persegi (badan), Persegi Panjang (pintu & cerobong), dan Persegi Kecil (jendela)
            </p>
          </div>
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
