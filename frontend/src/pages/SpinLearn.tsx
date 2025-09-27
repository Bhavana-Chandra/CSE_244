import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, RefreshCw, Award, Gamepad2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { articles as allArticles, ArticleInfo } from '../data/articles';
import CoinDisplay from '../components/CoinDisplay';
import RewardPopup from '../components/RewardPopup';
import { getRandomReward, Reward } from '../data/rewardsData';

interface QuizState {
  current: ArticleInfo | null;
  options: string[]; // titles
  correctTitle: string;
  result: 'correct' | 'incorrect' | null;
}

const shuffle = <T,>(arr: T[]) => arr.map(v => ({ v, r: Math.random() })).sort((a,b)=>a.r-b.r).map(({v})=>v);

const SpinLearn: React.FC = () => {
  const { addCoins, coins } = useGame(); // Make sure to get coins from context too
  const [roundArticles, setRoundArticles] = useState<ArticleInfo[]>([]);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [spinsDone, setSpinsDone] = useState(0);
  const [quiz, setQuiz] = useState<QuizState>({ current: null, options: [], correctTitle: '', result: null });
  const [showQuiz, setShowQuiz] = useState(false);
  const [showFinalReward, setShowFinalReward] = useState(false);
  const [finalReward, setFinalReward] = useState<Reward | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // initialize round with 15 random unique articles
    const pool = shuffle(allArticles).slice(0, 15);
    setRoundArticles(pool);
  }, []);

  const sliceAngle = roundArticles.length > 0 ? 360 / roundArticles.length : 0;

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas || roundArticles.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const size = 340;
    const radius = size / 2;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate((rotation * Math.PI) / 180);

    // Vibrant colors for the wheel slices
    const colors = [
      '#FF6B6B', // Coral Red
      '#4ECDC4', // Turquoise
      '#45B7D1', // Sky Blue
      '#96CEB4', // Mint Green
      '#FFEAA7', // Warm Yellow
      '#DDA0DD', // Plum
      '#98D8C8', // Mint
      '#F7DC6F', // Light Gold
      '#BB8FCE', // Light Purple
      '#85C1E9', // Light Blue
      '#82E0AA', // Light Green
      '#F8C471', // Peach
      '#F1948A', // Salmon
      '#AED6F1', // Powder Blue
      '#A9DFBF'  // Light Mint
    ];

    // Draw wheel slices
    for (let i = 0; i < roundArticles.length; i++) {
      const start = (i * sliceAngle * Math.PI) / 180;
      const end = ((i + 1) * sliceAngle * Math.PI) / 180;
      
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius - 5, start, end);
      ctx.closePath();
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      
      // Add border to slices
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Labels (Article number)
      ctx.save();
      ctx.rotate(start + (end - start) / 2);
      ctx.translate(radius * 0.7, 0);
      ctx.rotate(Math.PI / 2);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 12px Arial, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Add text shadow for better readability
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;
      
      ctx.fillText(roundArticles[i].number.replace('Article ', 'Art. '), 0, 0);
      ctx.restore();
    }

    ctx.restore();

    // Draw center circle
    ctx.beginPath();
    ctx.arc(radius, radius, 25, 0, 2 * Math.PI);
    ctx.fillStyle = '#2C3E50';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Pointer triangle
    ctx.beginPath();
    ctx.moveTo(radius, 20);
    ctx.lineTo(radius + 15, 5);
    ctx.lineTo(radius - 15, 5);
    ctx.closePath();
    ctx.fillStyle = '#E74C3C';
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => { drawWheel(); /* eslint-disable-next-line */ }, [rotation, roundArticles]);

  const spin = () => {
    if (spinning || roundArticles.length === 0) return;
    setSpinning(true);

    const extra = 360 * 6; // 6 full rotations
    const targetIndex = Math.floor(Math.random() * roundArticles.length);
    const targetAngle = targetIndex * sliceAngle + sliceAngle / 2;
    const finalRotation = rotation + extra + (360 - targetAngle);

    let start: number | null = null;
    const duration = 3200;

    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = rotation + (finalRotation - rotation) * eased;
      setRotation(cur);
      if (p < 1) requestAnimationFrame(step);
      else {
        // where it landed
        const normalized = (finalRotation % 360 + 360) % 360;
        const landedIndex = Math.floor(normalized / sliceAngle) % roundArticles.length;
        const slice = roundArticles[(roundArticles.length - 1 - landedIndex + roundArticles.length) % roundArticles.length];
        // prepare quiz
        const distractors = shuffle(allArticles.filter(a => a.id !== slice.id)).slice(0, 3).map(a => a.title);
        const options = shuffle([slice.title, ...distractors]).slice(0, 4);
        setQuiz({ current: slice, options, correctTitle: slice.title, result: null });
        setShowQuiz(true);
        setSpinsDone(s => s + 1);
        setSpinning(false);
      }
    };

    requestAnimationFrame(step);
  };

  const answer = (title: string) => {
    if (!quiz.current) return;
    const correct = title === quiz.correctTitle;
    setQuiz(prev => ({ ...prev, result: correct ? 'correct' : 'incorrect' }));
    if (correct) {
      addCoins(50, 'gold'); // Add 50 coins for correct answer
    } else {
      addCoins(-25, 'gold'); // Subtract 25 coins for incorrect answer
    }
  };

  const nextAfterResult = () => {
    // if finished 15 spins, show final reward
    if (spinsDone >= 15) {
      const reward = getRandomReward();
      setFinalReward(reward);
      setShowFinalReward(true);
      setShowQuiz(false);
    } else {
      setShowQuiz(false);
      setQuiz({ current: null, options: [], correctTitle: '', result: null });
    }
  };

  const playAgain = () => {
    const pool = shuffle(allArticles).slice(0, 15);
    setRoundArticles(pool);
    setRotation(0);
    setSpinsDone(0);
    setShowFinalReward(false);
    setFinalReward(null);
  };

  return (
    <div className="min-h-screen hero-gradient">
      <div className="bg-card shadow-sm border-b" style={{ boxShadow: 'var(--shadow-header)' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/games">
                <Button variant="ghost" size="sm" className="nav-link">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Games Hub
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">🎡 Samvidhan Spin & Learn</h1>
                <p className="text-sm text-muted-foreground">Spin 15 articles, answer quizzes, win rewards</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <CoinDisplay />
      </div>

      <div className="container mx-auto px-4 pb-12">
        <Card className="constitutional-card max-w-3xl mx-auto">
          <CardContent className="p-8">
            <div className="flex flex-col items-center">
              <canvas ref={canvasRef} className="mb-6" />
              <Button onClick={spin} className="btn-saffron" disabled={spinning || roundArticles.length === 0}>
                {spinning ? 'Spinning...' : 'Spin Wheel'}
              </Button>
              <p className="text-xs text-muted-foreground mt-3">Wheel uses 15 random articles each round</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quiz Modal */}
      {showQuiz && quiz.current && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg mx-auto constitutional-card">
            <CardContent className="p-6">
              {quiz.result === null ? (
                <>
                  <h3 className="text-lg font-bold mb-1">{quiz.current.number} — What is the title?</h3>
                  <p className="text-sm text-muted-foreground mb-4">Choose the correct title for this Article.</p>
                  <div className="space-y-2">
                    {quiz.options.map(opt => (
                      <Button key={opt} onClick={() => answer(opt)} variant="outline" className="w-full text-left justify-start">
                        {opt}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  {quiz.result === 'correct' ? (
                    <div className="text-[hsl(var(--accent))] font-semibold mb-2">Correct! +50 coins</div>
                  ) : (
                    <div className="text-destructive font-semibold mb-2">Incorrect! -25 coins</div>
                  )}
                  <h4 className="font-semibold mb-1">{quiz.current.number} – {quiz.current.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{quiz.current.description}</p>
                  <p className="text-sm"><span className="font-medium">Example:</span> {quiz.current.example}</p>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={nextAfterResult} className="btn-saffron">Continue</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Final Reward */}
      {finalReward && (
        <RewardPopup reward={finalReward} isOpen={showFinalReward} onClose={() => setShowFinalReward(false)} />
      )}

      {/* Play Again */}
      {spinsDone >= 15 && !showFinalReward && (
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-3xl mx-auto text-center">
            <Button onClick={playAgain} className="btn-saffron">
              <RefreshCw className="h-4 w-4 mr-2" />
              Play Again with New Articles
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpinLearn;