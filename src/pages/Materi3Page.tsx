import React, { useState } from 'react';
import { Box, Dice1, Circle, Triangle } from 'lucide-react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { FloatingShapes } from '@/components/FloatingShapes';
import { AudioControls } from '@/components/AudioControls';
import { VoiceReader } from '@/components/VoiceReader';
import { cn } from '@/lib/utils';

const bangunRuang = [
  {
    name: 'Kubus',
    icon: Dice1,
    color: 'bg-primary',
    sifat: { sisi: 6, rusuk: 12, titikSudut: 8 },
    ciri: ['Memiliki 6 sisi berbentuk persegi sama besar', 'Memiliki 12 rusuk sama panjang', 'Memiliki 8 titik sudut'],
    contoh: ['Dadu', 'Kotak kado', 'Rubik'],
    image: '/kubus.jpeg'
  },
  {
    name: 'Balok',
    icon: Box,
    color: 'bg-secondary',
    sifat: { sisi: 6, rusuk: 12, titikSudut: 8 },
    ciri: ['Memiliki 6 sisi berbentuk persegi panjang', 'Memiliki 12 rusuk', 'Sisi yang berhadapan sama besar'],
    contoh: ['Kotak susu', 'Kotak sepatu', 'Lemari', 'Kulkas'],
    image: '/balok.jpeg'
  },
  {
    name: 'Bola',
    icon: Circle,
    color: 'bg-pink',
    sifat: { sisi: 1, rusuk: 0, titikSudut: 0 },
    ciri: ['Memiliki 1 sisi lengkung', 'Tidak memiliki rusuk', 'Tidak memiliki titik sudut', 'Bentuknya bulat sempurna'],
    contoh: ['Bola sepak', 'Bola basket', 'Bola pingpong', 'Kelereng'],
    image: '/bola.jpeg'
  },
  {
    name: 'Kerucut',
    icon: Triangle,
    color: 'bg-green',
    sifat: { sisi: 2, rusuk: 1, titikSudut: 1 },
    ciri: ['Memiliki 1 sisi lengkung', 'Memiliki 1 sisi datar berbentuk lingkaran', 'Memiliki 1 titik puncak'],
    contoh: ['Cone es krim', 'Topi ulang tahun', 'Terompet', 'Caping petani'],
    image: '/kerucut.jpeg'
  },
];

const Materi3Page = () => {
  const [activeShape, setActiveShape] = useState(0);

  const voiceText = `Materi 3: Bangun Ruang.

  Selamat datang di pembelajaran bangun ruang! Berbeda dengan bangun datar, bangun ruang adalah bentuk yang memiliki tiga dimensi, yaitu panjang, lebar, dan tinggi atau ketebalan.

  Bangun ruang bisa kita pegang dan rasakan bentuknya. Contohnya seperti bola yang bisa kita lempar, atau kotak yang bisa kita isi dengan barang-barang.

  Mari kita kenali beberapa bangun ruang:

  Pertama adalah Kubus. Kubus memiliki 6 sisi yang berbentuk persegi dan sama besar. Kubus juga memiliki 12 rusuk dan 8 titik sudut. Contoh kubus adalah dadu dan kotak kado.

  Kedua adalah Balok. Balok mirip dengan kubus, tapi sisi-sisinya berbentuk persegi panjang. Balok juga memiliki 6 sisi, 12 rusuk, dan 8 titik sudut. Contohnya kotak susu dan kotak sepatu.

  Ketiga adalah Bola. Bola adalah bangun ruang yang paling unik. Bola hanya memiliki 1 sisi yang melengkung, tidak memiliki rusuk, dan tidak memiliki titik sudut. Contohnya bola sepak dan kelereng.

  Keempat adalah Kerucut. Kerucut memiliki 2 sisi, yaitu 1 sisi lengkung dan 1 sisi datar berbentuk lingkaran. Kerucut juga memiliki 1 titik puncak. Contohnya cone es krim dan topi ulang tahun.

  Klik setiap bangun ruang untuk mempelajari lebih detail!`;

  const currentShape = bangunRuang[activeShape];

  return (
    <div className="min-h-screen gradient-sky relative overflow-hidden pb-24">
      <FloatingShapes />
      <AudioControls />
      <VoiceReader text={voiceText} />
      <div className="absolute inset-0 bg-geometry-pattern opacity-30" />
      
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <div className="inline-flex items-center gap-2 bg-green/20 px-4 py-2 rounded-full mb-4">
            <Box className="w-5 h-5 text-green" />
            <span className="font-body text-green">Materi 3</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground text-shadow">
            Bangun Ruang
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Introduction */}
          <div className="card-geometry slide-up">
            <h2 className="font-display text-xl text-foreground mb-3">Apa itu Bangun Ruang?</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              Bangun ruang adalah bentuk yang memiliki <strong>tiga dimensi</strong>, yaitu 
              <strong> panjang</strong>, <strong>lebar</strong>, dan <strong>tinggi</strong>. 
              Bangun ruang memiliki <strong>sisi</strong>, <strong>rusuk</strong>, dan <strong>titik sudut</strong>. 
              Kita bisa memegangnya karena bentuknya nyata!
            </p>
          </div>

          {/* Shape Selector */}
          <div className="flex flex-wrap justify-center gap-3 slide-up" style={{ animationDelay: '0.2s' }}>
            {bangunRuang.map((shape, index) => {
              const Icon = shape.icon;
              return (
                <button
                  key={shape.name}
                  onClick={() => setActiveShape(index)}
                  className={cn(
                    'px-4 py-2 rounded-full font-display text-sm flex items-center gap-2',
                    'transition-all duration-300 transform hover:scale-105',
                    activeShape === index 
                      ? `${shape.color} text-white shadow-lg` 
                      : 'bg-card text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {shape.name}
                </button>
              );
            })}
          </div>

          {/* Shape Detail */}
          <div className="card-geometry slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Shape Visual */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div 
                    className={cn(
                      'w-32 h-32 animate-float flex items-center justify-center',
                      currentShape.color,
                      'rounded-2xl shadow-xl'
                    )}
                  >
                    {React.createElement(currentShape.icon, { 
                      className: 'w-16 h-16 text-white' 
                    })}
                  </div>
                </div>
                <h2 className="font-display text-2xl text-foreground mb-2">{currentShape.name}</h2>
                <img 
                  src={currentShape.image}
                  alt={`Contoh ${currentShape.name}`}
                  className="w-40 h-40 object-cover rounded-xl"
                />
              </div>

              {/* Shape Info */}
              <div className="space-y-4">
                {/* Properties */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-primary/10 rounded-xl p-3 text-center">
                    <div className="font-display text-2xl text-primary">{currentShape.sifat.sisi}</div>
                    <div className="font-body text-xs text-muted-foreground">Sisi</div>
                  </div>
                  <div className="bg-secondary/10 rounded-xl p-3 text-center">
                    <div className="font-display text-2xl text-secondary">{currentShape.sifat.rusuk}</div>
                    <div className="font-body text-xs text-muted-foreground">Rusuk</div>
                  </div>
                  <div className="bg-pink/10 rounded-xl p-3 text-center">
                    <div className="font-display text-2xl text-pink">{currentShape.sifat.titikSudut}</div>
                    <div className="font-body text-xs text-muted-foreground">Titik Sudut</div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display text-lg text-foreground mb-2">Ciri-Ciri</h3>
                  <ul className="space-y-2">
                    {currentShape.ciri.map((ciri, i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                        <div className="w-2 h-2 bg-green rounded-full mt-1.5 shrink-0" />
                        {ciri}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-lg text-foreground mb-2">Contoh</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentShape.contoh.map((contoh, i) => (
                      <span 
                        key={i} 
                        className="px-3 py-1 bg-muted rounded-full font-body text-sm text-muted-foreground"
                      >
                        {contoh}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <NavigationButtons nextPath="/materi/4" backPath="/materi/2" />
    </div>
  );
};

export default Materi3Page;
