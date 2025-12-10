import { useEffect, useRef } from 'react';
import { useUser } from '@/contexts/UserContext';

interface VoiceReaderProps {
  text: string;
  autoPlay?: boolean;
}

export const VoiceReader = ({ text, autoPlay = true }: VoiceReaderProps) => {
  const { isVoiceOn } = useUser();
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (!isVoiceOn || !autoPlay || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.9;
    utterance.pitch = 3.1;
    utterance.volume = 1.0;
    
    utteranceRef.current = utterance;
    
    // Small delay to ensure voices are loaded
    setTimeout(() => {
      window.speechSynthesis.speak(utterance);
    }, 500);

    return () => {
      window.speechSynthesis.cancel();
    };
  }, [text, isVoiceOn, autoPlay]);

  return null;
};
