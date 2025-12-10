import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { NavigationButtons } from '@/components/NavigationButtons';
import { FloatingShapes } from '@/components/FloatingShapes';
import { AudioControls } from '@/components/AudioControls';
import { useUser } from '@/contexts/UserContext';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  feedback: {
    correct: string;
    incorrect: string;
  };
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Bangun datar yang memiliki 3 sisi dan 3 sudut adalah...',
    options: ['Persegi', 'Lingkaran', 'Segitiga', 'Persegi Panjang'],
    correct: 2,
    feedback: {
      correct: 'Benar sekali! Segitiga memiliki 3 sisi dan 3 sudut. Nama segitiga berasal dari kata "tiga" dan "segi" yang berarti tiga sudut.',
      incorrect: 'Jawaban yang benar adalah Segitiga. Segitiga adalah satu-satunya bangun datar yang memiliki 3 sisi dan 3 sudut. Ingat, segitiga = tiga segi/sudut!'
    }
  },
  {
    id: 2,
    question: 'Bangun ruang yang berbentuk seperti bola adalah...',
    options: ['Kubus', 'Balok', 'Kerucut', 'Bola'],
    correct: 3,
    feedback: {
      correct: 'Tepat! Bola adalah bangun ruang yang berbentuk bulat sempurna tanpa sudut dan rusuk. Contohnya bola sepak dan kelereng.',
      incorrect: 'Jawaban yang benar adalah Bola. Bola adalah bangun ruang yang bentuknya bulat sempurna, tidak memiliki sudut dan rusuk. Contoh bola adalah bola sepak, bola basket, dan kelereng.'
    }
  },
  {
    id: 3,
    question: 'Menyusun bentuk-bentuk kecil menjadi bentuk baru disebut...',
    options: ['Dekomposisi', 'Komposisi', 'Posisi', 'Kondisi'],
    correct: 1,
    feedback: {
      correct: 'Hebat! Komposisi adalah proses menyusun atau menggabungkan bentuk-bentuk kecil menjadi bentuk yang lebih besar.',
      incorrect: 'Jawaban yang benar adalah Komposisi. Komposisi artinya menyusun atau menggabungkan. Seperti menyusun puzzle atau lego menjadi bentuk baru!'
    }
  },
  {
    id: 4,
    question: 'Kubus memiliki berapa sisi?',
    options: ['4 sisi', '5 sisi', '6 sisi', '8 sisi'],
    correct: 2,
    feedback: {
      correct: 'Benar! Kubus memiliki 6 sisi yang berbentuk persegi dan sama besar. Bayangkan dadu yang memiliki 6 permukaan!',
      incorrect: 'Jawaban yang benar adalah 6 sisi. Kubus memiliki 6 sisi berbentuk persegi yang sama besar. Coba lihat dadu - setiap permukaannya adalah satu sisi!'
    }
  },
  {
    id: 5,
    question: 'Jika buku ada di sebelah kiri pensil, maka pensil ada di sebelah ... buku.',
    options: ['Atas', 'Bawah', 'Kiri', 'Kanan'],
    correct: 3,
    feedback: {
      correct: 'Pintar! Jika buku di kiri pensil, maka pensil ada di kanan buku. Posisi kiri dan kanan saling berlawanan.',
      incorrect: 'Jawaban yang benar adalah Kanan. Posisi kiri dan kanan saling berlawanan. Jika A di kiri B, maka B di kanan A.'
    }
  },
];

const EvaluasiPage = () => {
  const { userName } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    setShowFeedback(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setShowResult(false);
    setShowFeedback(false);
  };

  const score = answers.reduce((acc, answer, index) => {
    return acc + (answer === questions[index].correct ? 1 : 0);
  }, 0);

  const currentQ = questions[currentQuestion];
  const isCorrect = answers[currentQuestion] === currentQ.correct;

  return (
    <div className="min-h-screen gradient-sky relative overflow-hidden pb-24">
      <FloatingShapes />
      <AudioControls />
      <div className="absolute inset-0 bg-geometry-pattern opacity-30" />
      
      <div className="relative z-10 px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 bounce-in">
          <div className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full mb-4">
            <ClipboardCheck className="w-5 h-5 text-secondary" />
            <span className="font-body text-secondary">Evaluasi</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl text-foreground text-shadow">
            Uji Pemahamanmu!
          </h1>
        </div>

        <div className="max-w-2xl mx-auto">
          {!showResult ? (
            <div className="card-geometry slide-up">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-body text-sm text-muted-foreground">
                    Soal {currentQuestion + 1} dari {questions.length}
                  </span>
                  <span className="font-display text-sm text-primary">
                    Skor: {score}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <h2 className="font-display text-xl text-foreground mb-6">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => !showFeedback && handleAnswer(index)}
                    disabled={showFeedback}
                    className={cn(
                      'w-full p-4 rounded-xl font-body text-left transition-all duration-300',
                      'border-2',
                      showFeedback
                        ? index === currentQ.correct
                          ? 'bg-green/20 border-green text-foreground'
                          : answers[currentQuestion] === index
                            ? 'bg-destructive/20 border-destructive text-foreground'
                            : 'bg-muted border-transparent text-muted-foreground'
                        : answers[currentQuestion] === index
                          ? 'bg-primary/20 border-primary text-foreground'
                          : 'bg-muted border-transparent text-foreground hover:border-primary/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-card flex items-center justify-center font-display text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span>{option}</span>
                      {showFeedback && index === currentQ.correct && (
                        <CheckCircle className="w-5 h-5 text-green ml-auto" />
                      )}
                      {showFeedback && answers[currentQuestion] === index && index !== currentQ.correct && (
                        <XCircle className="w-5 h-5 text-destructive ml-auto" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <div className={cn(
                  'p-4 rounded-xl mb-6 animate-scale-up',
                  isCorrect ? 'bg-green/20' : 'bg-secondary/20'
                )}>
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle className="w-6 h-6 text-green shrink-0" />
                    ) : (
                      <XCircle className="w-6 h-6 text-secondary shrink-0" />
                    )}
                    <p className="font-body text-sm text-foreground">
                      {isCorrect ? currentQ.feedback.correct : currentQ.feedback.incorrect}
                    </p>
                  </div>
                </div>
              )}

              {/* Next Button */}
              {showFeedback && (
                <button
                  onClick={nextQuestion}
                  className={cn(
                    'w-full py-3 rounded-full font-display text-lg',
                    'bg-primary text-primary-foreground',
                    'transform transition-all duration-300 hover:scale-105',
                    'hover:glow-primary'
                  )}
                >
                  {currentQuestion < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil'}
                </button>
              )}
            </div>
          ) : (
            /* Results */
            <div className="card-geometry text-center slide-up">
              <div className="text-6xl mb-4">
                {score >= 4 ? '🏆' : score >= 3 ? '⭐' : '💪'}
              </div>
              <h2 className="font-display text-3xl text-foreground mb-2">
                {score >= 4 ? 'Luar Biasa!' : score >= 3 ? 'Bagus!' : 'Tetap Semangat!'}
              </h2>
              <p className="font-body text-xl text-muted-foreground mb-4">
                {userName || 'Kamu'} mendapat skor
              </p>
              <div className="text-5xl font-display text-primary mb-6">
                {score}/{questions.length}
              </div>
              <p className="font-body text-muted-foreground mb-6">
                {score >= 4 
                  ? 'Kamu sudah memahami geometri dengan sangat baik!' 
                  : score >= 3 
                    ? 'Terus belajar, kamu hampir menguasainya!' 
                    : 'Jangan menyerah! Coba pelajari lagi materinya ya!'}
              </p>
              <button
                onClick={resetQuiz}
                className={cn(
                  'px-8 py-3 rounded-full font-display text-lg',
                  'bg-green text-green-foreground',
                  'transform transition-all duration-300 hover:scale-105',
                  'hover:glow-green',
                  'flex items-center gap-2 mx-auto'
                )}
              >
                <RotateCcw className="w-5 h-5" />
                Coba Lagi
              </button>
            </div>
          )}
        </div>
      </div>

      <NavigationButtons nextPath="/home" backPath="/kesimpulan" />
    </div>
  );
};

export default EvaluasiPage;
