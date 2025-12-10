import React, { useState } from 'react';
import { Puzzle, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Layers } from 'lucide-react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { FloatingShapes } from '@/components/FloatingShapes';
import { AudioControls } from '@/components/AudioControls';
import { VoiceReader } from '@/components/VoiceReader';
import { cn } from '@/lib/utils';

const Materi4Page = () => {
  const [activeTab, setActiveTab] = useState<'komposisi' | 'dekomposisi' | 'posisi'>('komposisi');

  const voiceText = `Materi 4: Komposisi, Dekomposisi, dan Posisi Benda.

  Di materi terakhir ini, kita akan belajar tiga hal menarik: komposisi, dekomposisi, dan posisi benda.

  Pertama, apa itu Komposisi? Komposisi adalah menyusun bentuk-bentuk kecil menjadi bentuk baru yang lebih besar. Bayangkan kamu punya potongan-potongan puzzle. Ketika kamu menyusun puzzle itu, kamu sedang melakukan komposisi! Misalnya, dua segitiga bisa disusun menjadi persegi.

  Kedua, Dekomposisi. Dekomposisi adalah kebalikan dari komposisi. Dekomposisi berarti membagi atau mengurai bentuk besar menjadi bentuk-bentuk kecil. Misalnya, sebuah persegi panjang bisa dibagi menjadi dua persegi.

  Ketiga, Posisi Benda. Kita juga perlu memahami posisi benda dalam ruang. Ada posisi atas dan bawah, kiri dan kanan, serta depan dan belakang. Misalnya, buku di atas meja, pensil di sebelah kiri buku, atau tas di belakang kursi.

  Mari kita pelajari lebih lanjut dengan contoh-contoh yang menarik!`;

  const tabs = [
    { id: 'komposisi', label: 'Komposisi', icon: Layers },
    { id: 'dekomposisi', label: 'Dekomposisi', icon: Puzzle },
    { id: 'posisi', label: 'Posisi Benda', icon: ArrowUp },
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
          <div className="inline-flex items-center gap-2 bg-purple/20 px-4 py-2 rounded-full mb-4">
            <Puzzle className="w-5 h-5 text-purple" />
            <span className="font-body text-purple">Materi 4</span>
          </div>
          <h1 className="font-display text-2xl md:text-4xl text-foreground text-shadow">
            Komposisi, Dekomposisi & Posisi
          </h1>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Tab Selector */}
          <div className="flex flex-wrap justify-center gap-3 slide-up">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={cn(
                    'px-4 py-2 rounded-full font-display text-sm flex items-center gap-2',
                    'transition-all duration-300 transform hover:scale-105',
                    activeTab === tab.id 
                      ? 'bg-purple text-white shadow-lg' 
                      : 'bg-card text-foreground hover:bg-muted'
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Komposisi Content */}
          {activeTab === 'komposisi' && (
            <div className="card-geometry slide-up space-y-6">
              <div>
                <h2 className="font-display text-2xl text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple rounded-full flex items-center justify-center">
                    <Layers className="w-5 h-5 text-purple-foreground" />
                  </div>
                  Apa itu Komposisi?
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  <strong>Komposisi</strong> adalah menyusun bentuk-bentuk kecil menjadi bentuk baru yang lebih besar. 
                  Seperti bermain puzzle atau lego, kita menggabungkan potongan-potongan untuk membuat sesuatu yang baru!
                </p>
              </div>

              <div className="bg-muted rounded-2xl p-6">
                <h3 className="font-display text-lg text-foreground mb-4">Contoh Komposisi:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-4 text-center">
                    <div className="flex justify-center gap-2 mb-3">
                      <div 
                        className="w-12 h-12 bg-secondary" 
                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                      />
                      <span className="text-2xl self-center">+</span>
                      <div 
                        className="w-12 h-12 bg-secondary rotate-180" 
                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                      />
                      <span className="text-2xl self-center">=</span>
                      <div className="w-12 h-12 bg-pink rounded-sm" />
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      2 Segitiga = 1 Persegi
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-4 text-center">
                    <div className="flex justify-center gap-2 mb-3">
                      <div className="w-10 h-10 bg-primary rounded-sm" />
                      <span className="text-2xl self-center">+</span>
                      <div className="w-10 h-10 bg-primary rounded-sm" />
                      <span className="text-2xl self-center">=</span>
                      <div className="w-20 h-10 bg-green rounded-sm" />
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      2 Persegi = 1 Persegi Panjang
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dekomposisi Content */}
          {activeTab === 'dekomposisi' && (
            <div className="card-geometry slide-up space-y-6">
              <div>
                <h2 className="font-display text-2xl text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                    <Puzzle className="w-5 h-5 text-secondary-foreground" />
                  </div>
                  Apa itu Dekomposisi?
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  <strong>Dekomposisi</strong> adalah kebalikan dari komposisi. Kita membagi atau mengurai 
                  bentuk besar menjadi bentuk-bentuk yang lebih kecil. Seperti memotong kue menjadi beberapa bagian!
                </p>
              </div>

              <div className="bg-muted rounded-2xl p-6">
                <h3 className="font-display text-lg text-foreground mb-4">Contoh Dekomposisi:</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card rounded-xl p-4 text-center">
                    <div className="flex justify-center gap-2 mb-3">
                      <div className="w-20 h-10 bg-green rounded-sm" />
                      <span className="text-2xl self-center">=</span>
                      <div className="w-10 h-10 bg-primary rounded-sm" />
                      <span className="text-2xl self-center">+</span>
                      <div className="w-10 h-10 bg-primary rounded-sm" />
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      1 Persegi Panjang = 2 Persegi
                    </p>
                  </div>
                  <div className="bg-card rounded-xl p-4 text-center">
                    <div className="flex justify-center gap-2 mb-3">
                      <div className="w-12 h-12 bg-pink rounded-sm" />
                      <span className="text-2xl self-center">=</span>
                      <div 
                        className="w-12 h-12 bg-secondary" 
                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                      />
                      <span className="text-2xl self-center">+</span>
                      <div 
                        className="w-12 h-12 bg-secondary rotate-180" 
                        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
                      />
                    </div>
                    <p className="font-body text-sm text-muted-foreground">
                      1 Persegi = 2 Segitiga
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Posisi Content */}
          {activeTab === 'posisi' && (
            <div className="card-geometry slide-up space-y-6">
              <div>
                <h2 className="font-display text-2xl text-foreground mb-3 flex items-center gap-3">
                  <div className="w-10 h-10 bg-green rounded-full flex items-center justify-center">
                    <ArrowUp className="w-5 h-5 text-green-foreground" />
                  </div>
                  Posisi Benda
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-4">
                  Posisi benda menunjukkan <strong>di mana</strong> suatu benda berada dibandingkan dengan benda lain. 
                  Ada beberapa kata untuk menjelaskan posisi.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-primary/10 rounded-2xl p-4 text-center">
                  <div className="flex justify-center gap-2 mb-3">
                    <ArrowUp className="w-8 h-8 text-primary" />
                    <ArrowDown className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">Atas & Bawah</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    "Lampu di <strong>atas</strong> meja"<br />
                    "Karpet di <strong>bawah</strong> meja"
                  </p>
                </div>

                <div className="bg-secondary/10 rounded-2xl p-4 text-center">
                  <div className="flex justify-center gap-2 mb-3">
                    <ArrowLeft className="w-8 h-8 text-secondary" />
                    <ArrowRight className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">Kiri & Kanan</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    "Pensil di <strong>kiri</strong> buku"<br />
                    "Penghapus di <strong>kanan</strong> buku"
                  </p>
                </div>

                <div className="bg-pink/10 rounded-2xl p-4 text-center">
                  <div className="flex flex-col items-center mb-3">
                    <div className="w-8 h-4 bg-pink rounded mb-1" />
                    <div className="w-6 h-6 bg-pink/50 rounded" />
                  </div>
                  <h3 className="font-display text-lg text-foreground mb-2">Depan & Belakang</h3>
                  <p className="font-body text-sm text-muted-foreground">
                    "Guru di <strong>depan</strong> kelas"<br />
                    "Tas di <strong>belakang</strong> kursi"
                  </p>
                </div>
              </div>

              {/* Interactive Example */}
              <div className="bg-muted rounded-2xl p-6">
                <h3 className="font-display text-lg text-foreground mb-4">Contoh Posisi di Kamar:</h3>
                <div className="relative bg-card rounded-xl p-6 h-48">
                  {/* Objects */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-accent rounded-lg flex items-center justify-center text-xs font-body">
                    Jam (atas)
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-12 bg-secondary rounded-lg flex items-center justify-center text-xs font-body text-secondary-foreground">
                    Meja (tengah)
                  </div>
                  <div className="absolute top-1/2 left-4 -translate-y-1/2 w-14 h-10 bg-primary rounded-lg flex items-center justify-center text-xs font-body text-primary-foreground">
                    Kursi (kiri)
                  </div>
                  <div className="absolute top-1/2 right-4 -translate-y-1/2 w-14 h-16 bg-pink rounded-lg flex items-center justify-center text-xs font-body text-pink-foreground">
                    Lemari (kanan)
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-green rounded flex items-center justify-center text-xs font-body text-green-foreground">
                    Karpet (bawah)
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <NavigationButtons nextPath="/games" backPath="/materi/3" />
    </div>
  );
};

export default Materi4Page;
