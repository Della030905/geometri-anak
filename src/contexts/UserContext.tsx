import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';

interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  isMusicOn: boolean;
  setIsMusicOn: (value: boolean) => void;
  isVoiceOn: boolean;
  setIsVoiceOn: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userName, setUserName] = useState('');
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isVoiceOn, setIsVoiceOn] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element for background music
    audioRef.current = new Audio('/lagu-saya.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.8;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMusicOn) {
        audioRef.current.play().catch(() => {
          // Autoplay might be blocked
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMusicOn]);

  return (
    <UserContext.Provider value={{ 
      userName, 
      setUserName, 
      isMusicOn, 
      setIsMusicOn,
      isVoiceOn,
      setIsVoiceOn
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
