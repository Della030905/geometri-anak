import React, { useState } from 'react';
import { Shapes, Circle, Square, Triangle, Star } from 'lucide-react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { FloatingShapes } from '@/components/FloatingShapes';
import { AudioControls } from '@/components/AudioControls';
import { VoiceReader } from '@/components/VoiceReader';
import { cn } from '@/lib/utils';

const bangunDatar = [
  {
    name: 'Segitiga',
    icon: Triangle,
    color: 'bg-secondary',
    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
    ciri: ['Memiliki 3 sisi', 'Memiliki 3 sudut', 'Jumlah semua sudut = 180°'],
    contoh: ['Rambu peringatan', 'Atap rumah', 'Potongan pizza'],
    image: '/segitiga.jpeg'
  },
  {
    name: 'Persegi',
    icon: Square,
    color: 'bg-pink',
    ciri: ['Memiliki 4 sisi sama panjang', 'Memiliki 4 sudut siku-siku (90°)', 'Keempat sisi sejajar dua-dua'],
    contoh: ['Papan catur', 'Keramik lantai', 'Jendela'],
    image: '/catur.jpeg'
  },
  {
    name: 'Persegi Panjang',
    icon: Square,
    color: 'bg-green',
    ciri: ['Memiliki 4 sisi', 'Sisi yang berhadapan sama panjang', 'Memiliki 4 sudut siku-siku'],
    contoh: ['Buku', 'Pintu', 'Meja', 'Papan tulis'],
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=200&fit=crop'
  },
  {
    name: 'Lingkaran',
    icon: Circle,
    color: 'bg-primary',
    ciri: ['Tidak memiliki sudut', 'Tidak memiliki sisi lurus', 'Semua titik berjarak sama dari pusat'],
    contoh: ['Jam dinding', 'Piring', 'Roda', 'Koin'],
    image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=300&h=200&fit=crop'
  },
  {
    name: 'Segibanyak',
    icon: Star,
    color: 'bg-purple',
    ciri: ['Memiliki lebih dari 4 sisi', 'Contoh: Pentagon (5 sisi), Heksagon (6 sisi)', 'Bisa beraturan atau tidak beraturan'],
    contoh: ['Sarang lebah (heksagon)', 'Bola sepak (campuran)', 'Tanda STOP (oktagon)'],
    image: '/sarang-lebah.jpeg'
  },
];

const Materi2Page = () => {
  const [activeShape, setActiveShape] = useState(0);

  const voiceText = `Materi 2: Bangun Datar.
  
  Halo teman-teman! Sekarang kita akan belajar tentang bangun datar. Bangun datar adalah bentuk-bentuk yang hanya memiliki dua dimensi, yaitu panjang dan lebar. Bangun datar tidak memiliki ketebalan atau tinggi.

  Bayangkan selembar kertas yang kamu gambar. Gambar yang ada di kertas itu adalah bangun datar! Karena gambar itu hanya memiliki panjang dan lebar, tidak tebal.

  Ada beberapa jenis bangun datar yang akan kita pelajari:

  Pertama adalah Segitiga. Segitiga adalah bangun datar yang memiliki 3 sisi dan 3 sudut. Contoh segitiga dalam kehidupan sehari-hari adalah rambu lalu lintas peringatan dan atap rumah.

  Kedua adalah Persegi. Persegi memiliki 4 sisi yang sama panjang dan 4 sudut siku-siku. Contohnya adalah papan catur dan keramik lantai.

  Ketiga adalah Persegi Panjang. Mirip dengan persegi, tapi sisi-sisinya tidak sama panjang. Contohnya adalah buku, pintu, dan papan tulis.

  Keempat adalah Lingkaran. Lingkaran adalah bangun datar yang tidak memiliki sudut. Contohnya jam dinding, piring, dan roda.

  Kelima adalah Segibanyak. Segibanyak adalah bangun datar yang memiliki lebih dari 4 sisi. Contohnya sarang lebah yang berbentuk heksagon.

  Klik masing-masing bentuk untuk mempelajari lebih lanjut!`;

  const currentShape = bangunDatar[activeShape];

  return (
    <div className="min-h-screen gradient-sky relative overflow-hidden pb-24">
      <FloatingShapes />
      <AudioControls />
      <VoiceReader text={voiceText} />
      <div className="absolute inset-0 bg-geometry-pattern opacity-30" />
      
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <div className="inline-flex items-center gap-2 bg-pink/20 px-4 py-2 rounded-full mb-4">
            <Shapes className="w-5 h-5 text-pink" />
            <span className="font-body text-pink">Materi 2</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground text-shadow">
            Bangun Datar
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Introduction */}
          <div className="card-geometry slide-up">
            <h2 className="font-display text-xl text-foreground mb-3">Apa itu Bangun Datar?</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              Bangun datar adalah bentuk yang hanya memiliki <strong>dua dimensi</strong>, yaitu 
              <strong> panjang</strong> dan <strong>lebar</strong>. Bangun datar tidak memiliki ketebalan. 
              Contohnya seperti gambar yang kita buat di kertas!
            </p>
          </div>

          {/* Shape Selector */}
          <div className="flex flex-wrap justify-center gap-3 slide-up" style={{ animationDelay: '0.2s' }}>
            {bangunDatar.map((shape, index) => {
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
                <div 
                  className={cn(
                    'w-32 h-32 mb-4 animate-float',
                    currentShape.color,
                    currentShape.name === 'Lingkaran' && 'rounded-full',
                    currentShape.name === 'Persegi' && 'rounded-lg',
                    currentShape.name === 'Persegi Panjang' && 'rounded-lg w-40',
                    currentShape.name === 'Segibanyak' && 'rounded-lg',
                  )}
                  style={currentShape.clipPath ? { clipPath: currentShape.clipPath } : 
                    currentShape.name === 'Segibanyak' ? { clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' } : undefined}
                />
                <h2 className="font-display text-2xl text-foreground mb-2">{currentShape.name}</h2>
                <img 
                  src={currentShape.image}
                  alt={`Contoh ${currentShape.name}`}
                  className="w-40 h-40 object-cover rounded-xl"
                />
              </div>

              {/* Shape Info */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-display text-lg text-foreground mb-2 flex items-center gap-2">
                    <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-xs">✓</span>
                    </div>
                    Ciri-Ciri
                  </h3>
                  <ul className="space-y-2">
                    {currentShape.ciri.map((ciri, i) => (
                      <li key={i} className="flex items-start gap-2 font-body text-muted-foreground">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0" />
                        {ciri}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-display text-lg text-foreground mb-2 flex items-center gap-2">
                    <div className="w-6 h-6 bg-green rounded-full flex items-center justify-center">
                      <span className="text-xs text-green-foreground">!</span>
                    </div>
                    Contoh dalam Kehidupan
                  </h3>
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

      <NavigationButtons nextPath="/materi/3" backPath="/materi/1" />
    </div>
  );
};

export default Materi2Page;
