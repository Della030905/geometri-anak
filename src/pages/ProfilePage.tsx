import React from 'react';
import { User, Heart, BookOpen, Star } from 'lucide-react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { FloatingShapes } from '@/components/FloatingShapes';
import { AudioControls } from '@/components/AudioControls';
import { VoiceReader } from '@/components/VoiceReader';
import { cn } from '@/lib/utils';

const ProfilePage = () => {
  const voiceText = "Halaman Profil. Website pembelajaran geometri interaktif ini dibuat untuk membantu adik-adik kelas 2 SD belajar tentang bentuk-bentuk geometri dengan cara yang menyenangkan.";

  return (
    <div className="min-h-screen gradient-sky relative overflow-hidden pb-24">
      <FloatingShapes />
      <AudioControls />
      <VoiceReader text={voiceText} />
      <div className="absolute inset-0 bg-geometry-pattern opacity-30" />
      
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <h1 className="font-display text-3xl md:text-4xl text-foreground text-shadow">
            Profil
          </h1>
        </div>

        {/* Profile Card */}
        <div className="max-w-2xl mx-auto">
          <div className="card-geometry text-center slide-up">
            {/* Avatar */}
            <div className="relative inline-block mb-6">
              <img
                src="/profil.jpg"
                alt="Avatar"
                className="w-32 h-32 mx-auto rounded-full object-cover shadow-xl"
              />
              <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center animate-bounce-gentle">
                <Star className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>

            <h2 className="font-display text-2xl md:text-3xl text-foreground mb-2">
              KRISCAYANI SARUMAHA
            </h2>
            
            <p className="font-body text-muted-foreground mb-6">
              NIM. 242109143
            </p>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className={cn(
                'p-4 rounded-2xl bg-primary/10 border-2 border-primary/20'
              )}>
                <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-display text-lg text-foreground mb-1">Capaian Pembelajaran</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Siswa mampu mengenali bangun datar dan bangun ruang, menyusun dan menguraikan bentuk, memahami posisi–arah, serta mengidentifikasi pola dan simetri sederhana.
                </p>
              </div>

              <div className={cn(
                'p-4 rounded-2xl bg-pink/10 border-2 border-pink/20'
              )}>
                <Heart className="w-8 h-8 text-pink mx-auto mb-2" />
                <h3 className="font-display text-lg text-foreground mb-1">Tujuan Pembelajaran</h3>
                <p className="font-body text-sm text-muted-foreground">
                  Siswa mampu mengenali berbagai bangun datar dan bangun ruang di sekitar, menyusun serta menguraikan bentuk sederhana, menggunakan kata-kata posisi seperti kiri, kanan, depan, dan belakang untuk menentukan letak suatu benda, serta melanjutkan pola dan mengidentifikasi simetri lipat sederhana dalam kehidupan sehari-hari.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="bg-muted rounded-2xl p-4">
              <h3 className="font-display text-lg text-foreground mb-3">Fitur Pembelajaran</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <span className="font-body text-muted-foreground">Materi Interaktif</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-secondary rounded-full" />
                  <span className="font-body text-muted-foreground">Game Edukatif</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-pink rounded-full" />
                  <span className="font-body text-muted-foreground">Suara Pembaca</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green rounded-full" />
                  <span className="font-body text-muted-foreground">Evaluasi Mandiri</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavigationButtons showNext={false} showBack={false} />
    </div>
  );
};

export default ProfilePage;
