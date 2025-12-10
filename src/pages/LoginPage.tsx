import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, ArrowRight, Sparkles } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { FloatingShapes } from '@/components/FloatingShapes';
import { cn } from '@/lib/utils';

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUserName } = useUser();
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Nama harus minimal 2 huruf ya!');
      return;
    }
    setUserName(name.trim());
    navigate('/home');
  };

  return (
    <div className="min-h-screen gradient-sky relative overflow-hidden">
      <FloatingShapes />
      <div className="absolute inset-0 bg-geometry-pattern opacity-30" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        <div className="card-geometry max-w-md w-full text-center bounce-in">
          {/* Decorative character */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-purple rounded-full flex items-center justify-center shadow-xl animate-float">
              <User className="w-12 h-12 text-primary-foreground" />
            </div>
            <div className="absolute -top-2 -right-4 w-8 h-8 bg-accent rounded-full animate-bounce-gentle" />
            <div className="absolute -bottom-2 -left-4 w-6 h-6 bg-pink rounded-full animate-bounce-gentle" style={{ animationDelay: '0.3s' }} />
          </div>

          <h1 className="font-display text-3xl md:text-4xl text-foreground mb-2 text-shadow">
            Siapa Namamu?
          </h1>
          
          <p className="font-body text-muted-foreground mb-6">
            Masukkan namamu untuk memulai petualangan seru!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError('');
                }}
                placeholder="Ketik namamu di sini..."
                className={cn(
                  'w-full px-6 py-4 rounded-full font-body text-lg',
                  'bg-muted border-2 border-transparent',
                  'focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20',
                  'transition-all duration-300',
                  'placeholder:text-muted-foreground/60',
                  error && 'border-destructive'
                )}
                maxLength={20}
              />
              <Sparkles className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
            </div>

            {error && (
              <p className="text-destructive font-body text-sm animate-wiggle">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={cn(
                'w-full py-4 rounded-full font-display text-xl',
                'gradient-warm text-secondary-foreground',
                'transform transition-all duration-300 hover:scale-105 active:scale-95',
                'shadow-xl hover:glow-secondary',
                'flex items-center justify-center gap-3'
              )}
            >
              <span>Ayo Mulai!</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </form>

          {/* Fun shapes */}
          <div className="flex justify-center gap-4 mt-8">
            <div className="w-10 h-10 bg-primary/30 rounded-full" />
            <div className="w-10 h-10 bg-secondary/30 rounded-lg rotate-12" />
            <div 
              className="w-10 h-10 bg-pink/30" 
              style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
