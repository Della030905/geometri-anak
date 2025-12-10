import React from 'react';
import { FileText, Star, Lightbulb, Heart } from 'lucide-react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { FloatingShapes } from '@/components/FloatingShapes';
import { AudioControls } from '@/components/AudioControls';
import { VoiceReader } from '@/components/VoiceReader';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';

const KesimpulanPage = () => {
  const { userName } = useUser();

  const voiceText = `Kesimpulan Pembelajaran Geometri.

  Selamat ${userName || 'teman'}! Kamu sudah menyelesaikan semua materi pembelajaran geometri. Mari kita ingat kembali apa saja yang sudah kita pelajari.

  Pertama, kita sudah belajar tentang Pengenalan Geometri. Geometri adalah ilmu yang mempelajari bentuk, ukuran, dan ruang. Bentuk-bentuk geometri ada di mana-mana di sekitar kita!

  Kedua, kita sudah mengenal Bangun Datar. Bangun datar adalah bentuk dua dimensi yang memiliki panjang dan lebar. Contohnya adalah segitiga, persegi, persegi panjang, lingkaran, dan segibanyak.

  Ketiga, kita sudah belajar tentang Bangun Ruang. Bangun ruang adalah bentuk tiga dimensi yang memiliki panjang, lebar, dan tinggi. Contohnya kubus, balok, bola, dan kerucut.

  Keempat, kita sudah mempelajari Komposisi, Dekomposisi, dan Posisi Benda. Komposisi adalah menyusun bentuk kecil menjadi bentuk besar. Dekomposisi adalah mengurai bentuk besar menjadi bentuk kecil. Dan posisi benda menjelaskan letak benda seperti atas, bawah, kiri, kanan, depan, dan belakang.

  Teruslah belajar dan jangan pernah menyerah! Matematika itu menyenangkan!`;

  const ringkasan = [
    {
      title: 'Pengenalan Geometri',
      icon: Lightbulb,
      color: 'bg-primary',
      points: ['Geometri mempelajari bentuk, ukuran, dan ruang', 'Bentuk geometri ada di sekitar kita']
    },
    {
      title: 'Bangun Datar',
      icon: Star,
      color: 'bg-secondary',
      points: ['Bentuk 2 dimensi (panjang & lebar)', 'Contoh: segitiga, persegi, lingkaran']
    },
    {
      title: 'Bangun Ruang',
      icon: Star,
      color: 'bg-pink',
      points: ['Bentuk 3 dimensi (panjang, lebar, tinggi)', 'Contoh: kubus, balok, bola, kerucut']
    },
    {
      title: 'Komposisi & Posisi',
      icon: Star,
      color: 'bg-green',
      points: ['Komposisi: menyusun bentuk', 'Posisi: atas, bawah, kiri, kanan']
    },
  ];

  return (
    <div className="min-h-screen gradient-sky relative overflow-hidden pb-24">
      <FloatingShapes />
      <AudioControls />
      <VoiceReader text={voiceText} />
      <div className="absolute inset-0 bg-geometry-pattern opacity-30" />
      
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <div className="inline-flex items-center gap-2 bg-primary/20 px-4 py-2 rounded-full mb-4">
            <FileText className="w-5 h-5 text-primary" />
            <span className="font-body text-primary">Kesimpulan</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground text-shadow">
            Apa yang Sudah Kita Pelajari?
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Congratulations */}
          <div className="card-geometry text-center slide-up">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="font-display text-2xl text-foreground mb-2">
              Selamat, {userName || 'Teman'}!
            </h2>
            <p className="font-body text-muted-foreground">
              Kamu sudah menyelesaikan semua materi pembelajaran geometri!
            </p>
          </div>

          {/* Summary Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            {ringkasan.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.title}
                  className="card-geometry slide-up"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                      item.color
                    )}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-foreground mb-2">{item.title}</h3>
                      <ul className="space-y-1">
                        {item.points.map((point, i) => (
                          <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Motivation */}
          <div className="card-geometry text-center slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-pink animate-bounce-gentle" />
              <h2 className="font-display text-xl text-foreground">Pesan Motivasi</h2>
              <Heart className="w-6 h-6 text-pink animate-bounce-gentle" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="font-body text-muted-foreground leading-relaxed max-w-lg mx-auto">
              Matematika itu menyenangkan dan ada di mana-mana! Teruslah belajar dengan semangat. 
              Jangan takut untuk bertanya dan mencoba hal baru. Kamu pasti bisa! 💪
            </p>
          </div>
        </div>
      </div>

      <NavigationButtons nextPath="/evaluasi" backPath="/games" />
    </div>
  );
};

export default KesimpulanPage;
