import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Play } from 'lucide-react';
import { FloatingShapes } from '@/components/FloatingShapes';
import { cn } from '@/lib/utils';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-sky relative overflow-hidden">
      <FloatingShapes />
      
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-geometry-pattern opacity-30" />
      
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
        {/* Main Card */}
        <div className="card-geometry max-w-2xl w-full text-center bounce-in">
          {/* Decorative shapes around card */}
          <div className="absolute -top-8 -left-8 w-20 h-20 bg-primary rounded-full opacity-80 animate-float" />
          <div className="absolute -top-4 -right-6 w-16 h-16 bg-secondary rounded-lg rotate-12 opacity-80 animate-float" style={{ animationDelay: '0.5s' }} />
          <div 
            className="absolute -bottom-6 left-1/4 w-14 h-14 bg-pink opacity-80 animate-float" 
            style={{ 
              clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              animationDelay: '1s' 
            }} 
          />
          <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-green rounded-full opacity-80 animate-float" style={{ animationDelay: '1.5s' }} />

          {/* Welcome illustration */}
          <div className="mb-6 relative">
            <img
              src="/welcome.jpeg"
              alt="Anak-anak belajar geometri"
              className="w-full h-48 object-cover rounded-2xl shadow-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent rounded-2xl" />
          </div>

          {/* Title */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-accent animate-bounce-gentle" />
            <h1 className="font-display text-4xl md:text-5xl text-foreground text-shadow">
              Selamat Datang
            </h1>
            <Sparkles className="w-8 h-8 text-accent animate-bounce-gentle" style={{ animationDelay: '0.3s' }} />
          </div>
          
          <h2 className="font-display text-2xl md:text-3xl gradient-hero bg-clip-text text-transparent mb-6">
            di Dunia Geometri!
          </h2>

          <p className="font-body text-lg text-muted-foreground mb-8 leading-relaxed">
            Ayo bertualang bersama bentuk-bentuk seru! 
            Temukan lingkaran, segitiga, persegi, dan banyak bentuk menarik lainnya!
          </p>

          {/* Decorative shapes row */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="w-12 h-12 bg-primary rounded-full animate-float shadow-lg" />
            <div className="w-12 h-12 bg-secondary rounded-lg rotate-12 animate-float shadow-lg" style={{ animationDelay: '0.3s' }} />
            <div 
              className="w-12 h-12 bg-pink animate-float shadow-lg" 
              style={{ 
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                animationDelay: '0.6s' 
              }} 
            />
            <div className="w-12 h-12 bg-green rounded-full animate-float shadow-lg" style={{ animationDelay: '0.9s' }} />
          </div>

          {/* Start Button */}
          <button
            onClick={() => navigate('/login')}
            className={cn(
              'group relative px-10 py-4 rounded-full font-display text-xl',
              'gradient-hero text-primary-foreground',
              'transform transition-all duration-300 hover:scale-105 active:scale-95',
              'shadow-xl hover:shadow-2xl pulse-glow'
            )}
          >
            <span className="flex items-center gap-3">
              <Play className="w-6 h-6 group-hover:animate-wiggle" />
              Mulai Petualangan
            </span>
          </button>
        </div>

        {/* Bottom illustration */}
        <div className="mt-8 flex gap-4 opacity-60">
          <img 
            src="https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=100&h=100&fit=crop"
            alt="Mainan geometri"
            className="w-16 h-16 rounded-full object-cover animate-float"
          />
          <img 
            src="https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=100&h=100&fit=crop"
            alt="Balok warna-warni"
            className="w-16 h-16 rounded-full object-cover animate-float"
            style={{ animationDelay: '0.5s' }}
          />
          <img 
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=100&h=100&fit=crop"
            alt="Bentuk geometri"
            className="w-16 h-16 rounded-full object-cover animate-float"
            style={{ animationDelay: '1s' }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
