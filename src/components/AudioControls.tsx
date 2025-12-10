import React from 'react';
import { Volume2, VolumeX, Music, MicOff } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

export const AudioControls = () => {
  const { isMusicOn, setIsMusicOn, isVoiceOn, setIsVoiceOn } = useUser();

  const buttonBase = cn(
    'p-3 rounded-full transition-all duration-300 transform hover:scale-110',
    'shadow-lg'
  );

  return (
    <div className="fixed top-4 right-4 flex gap-3 z-50">
      <button
        onClick={() => setIsMusicOn(!isMusicOn)}
        className={cn(
          buttonBase,
          isMusicOn 
            ? 'bg-primary text-primary-foreground glow-primary' 
            : 'bg-muted text-muted-foreground'
        )}
        title={isMusicOn ? 'Matikan Musik' : 'Nyalakan Musik'}
      >
        {isMusicOn ? <Music className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
      </button>

      <button
        onClick={() => setIsVoiceOn(!isVoiceOn)}
        className={cn(
          buttonBase,
          isVoiceOn 
            ? 'bg-green text-green-foreground glow-green' 
            : 'bg-muted text-muted-foreground'
        )}
        title={isVoiceOn ? 'Matikan Suara Pembaca' : 'Nyalakan Suara Pembaca'}
      >
        {isVoiceOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
      </button>
    </div>
  );
};
