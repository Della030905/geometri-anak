import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, BookOpen, Shapes, Box, Puzzle, Gamepad2, FileText, ClipboardCheck } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { FloatingShapes } from '@/components/FloatingShapes';
import { AudioControls } from '@/components/AudioControls';
import { cn } from '@/lib/utils';

const menuItems = [
  { 
    id: 'profile', 
    title: 'Profil Pembuat', 
    icon: User, 
    path: '/profile',
    color: 'bg-primary',
    glow: 'hover:glow-primary',
    shape: 'rounded-full'
  },
  { 
    id: 'materi1', 
    title: 'Pengenalan Geometri', 
    icon: BookOpen, 
    path: '/materi/1',
    color: 'bg-secondary',
    glow: 'hover:glow-secondary',
    shape: 'rounded-2xl'
  },
  { 
    id: 'materi2', 
    title: 'Bangun Datar', 
    icon: Shapes, 
    path: '/materi/2',
    color: 'bg-pink',
    glow: 'hover:glow-pink',
    shape: 'rounded-full'
  },
  { 
    id: 'materi3', 
    title: 'Bangun Ruang', 
    icon: Box, 
    path: '/materi/3',
    color: 'bg-green',
    glow: 'hover:glow-green',
    shape: 'rounded-2xl'
  },
  { 
    id: 'materi4', 
    title: 'Komposisi & Posisi', 
    icon: Puzzle, 
    path: '/materi/4',
    color: 'bg-purple',
    glow: 'hover:glow-purple',
    shape: 'rounded-full'
  },
  { 
    id: 'games', 
    title: 'Game Interaktif', 
    icon: Gamepad2, 
    path: '/games',
    color: 'bg-accent',
    glow: 'hover:glow-accent',
    shape: 'rounded-2xl'
  },
  { 
    id: 'kesimpulan', 
    title: 'Kesimpulan', 
    icon: FileText, 
    path: '/kesimpulan',
    color: 'bg-primary',
    glow: 'hover:glow-primary',
    shape: 'rounded-2xl'
  },
  { 
    id: 'evaluasi', 
    title: 'Evaluasi', 
    icon: ClipboardCheck, 
    path: '/evaluasi',
    color: 'bg-secondary',
    glow: 'hover:glow-secondary',
    shape: 'rounded-full'
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const { userName } = useUser();

  return (
    <div className="min-h-screen gradient-sky relative overflow-hidden">
      <FloatingShapes />
      <AudioControls />
      <div className="absolute inset-0 bg-geometry-pattern opacity-30" />
      
      <div className="relative z-10 min-h-screen px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <h1 className="font-display text-3xl md:text-4xl text-foreground text-shadow mb-2">
            Halo, {userName || 'Teman'}! 👋
          </h1>
          <p className="font-body text-lg text-muted-foreground">
            Pilih materi yang ingin kamu pelajari
          </p>
        </div>

        {/* Menu Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 pb-8">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  'card-geometry p-4 md:p-6 flex flex-col items-center gap-3',
                  'transform transition-all duration-300 hover:scale-105 active:scale-95',
                  item.glow,
                  'slide-up'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={cn(
                  'w-16 h-16 md:w-20 md:h-20 flex items-center justify-center',
                  item.color,
                  item.shape,
                  'shadow-lg'
                )}>
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <span className="font-display text-sm md:text-base text-center text-foreground">
                  {item.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Exit Button */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate('/')}
            className={cn(
              'px-8 py-3 rounded-full font-display text-lg',
              'bg-muted text-muted-foreground',
              'transform transition-all duration-300 hover:scale-105 active:scale-95',
              'hover:bg-destructive hover:text-destructive-foreground'
            )}
          >
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
