import React, { useState } from 'react';
import { Lightbulb, Eye, Home as HomeIcon, Shapes } from 'lucide-react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { FloatingShapes } from '@/components/FloatingShapes';
import { AudioControls } from '@/components/AudioControls';
import { VoiceReader } from '@/components/VoiceReader';
import { cn } from '@/lib/utils';

const shapes = [
  { name: 'Lingkaran', desc: 'Bentuk bulat tanpa sudut', color: 'bg-primary', shape: 'rounded-full' },
  { name: 'Segitiga', desc: 'Bentuk dengan 3 sudut', color: 'bg-secondary', clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
  { name: 'Persegi', desc: 'Bentuk kotak dengan 4 sisi sama', color: 'bg-pink', shape: 'rounded-lg' },
  { name: 'Persegi Panjang', desc: 'Bentuk kotak memanjang', color: 'bg-green', shape: 'rounded-lg' },
];

const Materi1Page = () => {
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  const voiceText = `Materi 1: Pengenalan Geometri. 
  
  Halo teman-teman! Hari ini kita akan berkenalan dengan dunia yang sangat seru, yaitu dunia geometri! Geometri adalah ilmu yang mempelajari tentang bentuk-bentuk di sekitar kita. Tahukah kamu? Sebenarnya kita sudah sering bertemu dengan geometri dalam kehidupan sehari-hari, lho!

  Coba lihat ke sekelilingmu sekarang. Apakah kamu melihat jam dinding? Jam dinding berbentuk lingkaran! Bagaimana dengan buku yang sering kamu baca? Buku berbentuk persegi panjang! Atau rambu lalu lintas peringatan? Itu berbentuk segitiga!

  Geometri membantu kita mengenal dan memahami bentuk-bentuk tersebut. Dengan belajar geometri, kita bisa tahu perbedaan antara lingkaran dan persegi, atau antara segitiga dan bintang. Seru sekali, kan?

  Di rumah kita, banyak sekali benda-benda geometri. Piring makan berbentuk lingkaran, kotak susu berbentuk balok, atap rumah seringkali berbentuk segitiga. Bahkan mainan-mainan kita pun banyak yang berbentuk geometri!

  Nah, dalam pembelajaran ini, kita akan belajar tentang berbagai macam bentuk geometri. Ada bangun datar seperti lingkaran, segitiga, dan persegi. Ada juga bangun ruang seperti kubus, bola, dan kerucut. Semuanya akan kita pelajari bersama dengan cara yang menyenangkan!

  Ayo semangat belajar geometri! Klik bentuk-bentuk di bawah untuk mengenalnya lebih dekat!`;

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
            <Lightbulb className="w-5 h-5 text-primary" />
            <span className="font-body text-primary">Materi 1</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground text-shadow">
            Pengenalan Geometri
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hero Image */}
          <div className="card-geometry overflow-hidden slide-up">
            <img 
              src="/geometri-materi1.jpeg"
              alt="Anak bermain dengan bentuk geometri"
              className="w-full h-48 md:h-64 object-cover rounded-2xl"
            />
          </div>

          {/* Content */}
          <div className="card-geometry slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center shrink-0">
                <Eye className="w-5 h-5 text-secondary-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl text-foreground mb-2">Apa itu Geometri?</h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Geometri adalah ilmu yang mempelajari tentang <strong>bentuk</strong>, <strong>ukuran</strong>, 
                  dan <strong>ruang</strong>. Dengan belajar geometri, kita bisa mengenal berbagai bentuk 
                  yang ada di sekitar kita, seperti lingkaran, segitiga, persegi, dan masih banyak lagi!
                </p>
              </div>
            </div>
          </div>

          {/* Examples */}
          <div className="card-geometry slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-pink rounded-full flex items-center justify-center shrink-0">
                <HomeIcon className="w-5 h-5 text-pink-foreground" />
              </div>
              <div>
                <h2 className="font-display text-xl text-foreground mb-2">Geometri di Sekitar Kita</h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  Tahukah kamu? Banyak benda di rumah yang berbentuk geometri! Coba perhatikan:
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <span className="text-3xl mb-2 block">🍽️</span>
                    <span className="font-body text-sm">Piring = Lingkaran</span>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <span className="text-3xl mb-2 block">📚</span>
                    <span className="font-body text-sm">Buku = Persegi Panjang</span>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <span className="text-3xl mb-2 block">🏠</span>
                    <span className="font-body text-sm">Atap = Segitiga</span>
                  </div>
                  <div className="bg-muted rounded-xl p-3 text-center">
                    <span className="text-3xl mb-2 block">🎲</span>
                    <span className="font-body text-sm">Dadu = Kubus</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Shapes */}
          <div className="card-geometry slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-green rounded-full flex items-center justify-center shrink-0">
                <Shapes className="w-5 h-5 text-green-foreground" />
              </div>
              <div className="w-full">
                <h2 className="font-display text-xl text-foreground mb-2">Klik Bentuknya!</h2>
                <p className="font-body text-muted-foreground mb-4">
                  Klik bentuk di bawah untuk mengetahui namanya:
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {shapes.map((shape) => (
                    <button
                      key={shape.name}
                      onClick={() => setSelectedShape(shape.name)}
                      className={cn(
                        'aspect-square flex items-center justify-center p-4',
                        'transition-all duration-300 transform hover:scale-110 active:scale-95',
                        selectedShape === shape.name ? 'ring-4 ring-accent' : ''
                      )}
                    >
                      <div 
                        className={cn(
                          'w-16 h-16 md:w-20 md:h-20',
                          shape.color,
                          shape.shape,
                          'shadow-lg'
                        )}
                        style={shape.clipPath ? { clipPath: shape.clipPath } : undefined}
                      />
                    </button>
                  ))}
                </div>

                {selectedShape && (
                  <div className="mt-4 p-4 bg-accent/20 rounded-xl text-center animate-scale-up">
                    <h3 className="font-display text-xl text-foreground">{selectedShape}</h3>
                    <p className="font-body text-muted-foreground">
                      {shapes.find(s => s.name === selectedShape)?.desc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavigationButtons nextPath="/materi/2" backPath="/home" />
    </div>
  );
};

export default Materi1Page;
