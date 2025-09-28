import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ConstitutionTree from './components/ConstitutionTree';
import StageCard from './components/StageCard';
import QuizModal from './components/QuizModal';
import RewardPopup from './components/RewardPopup';
import ProgressBar from './components/ProgressBar';
import Scoreboard from './components/Scoreboard';
import stagesData from './data/stages.json';
import '../../index.css';
import './styles.css';
import { useGame } from '../../context/GameContext';

export type Stage = typeof stagesData[number];

const LOCAL_KEY = 'growing-tree-progress-v1';

const GrowingTreeGame: React.FC = () => {
  const { addCoins, updateGameScore, updateGameProgress } = useGame();
  const [stages] = React.useState<Stage[]>(stagesData);
  const [currentIdx, setCurrentIdx] = React.useState<number>(0);
  const [unlocked, setUnlocked] = React.useState<number>(0);
  const [quizOpen, setQuizOpen] = React.useState<boolean>(false);
  const [wrongOpen, setWrongOpen] = React.useState<{open:boolean, explanation?:string, image?:string}>({open:false});
  const [rewardOpen, setRewardOpen] = React.useState<boolean>(false);
  const [finalCelebration, setFinalCelebration] = React.useState<boolean>(false);
  const [badges, setBadges] = React.useState<string[]>([]);

  React.useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentIdx(parsed.stageIndex ?? 0);
        setUnlocked(parsed.unlocked ?? 0);
        setBadges(parsed.badges ?? []);
      } catch {}
    }
  }, []);

  const persist = React.useCallback((nextIdx:number, nextUnlocked:number, nextBadges:string[]) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify({ stageIndex: nextIdx, unlocked: nextUnlocked, badges: nextBadges }));
  }, []);

  const openQuiz = () => setQuizOpen(true);
  const closeQuiz = () => setQuizOpen(false);

  const onCorrect = () => {
    // award coins and unlock
    addCoins(50, 'gold');
    const nextUnlocked = Math.max(unlocked, currentIdx + 1);
    setUnlocked(nextUnlocked);

    // badges at 5,8,10 (1-based stages)
    const stageNum = currentIdx + 1;
    const nextBadges = [...badges];
    if (stageNum === 5 && !nextBadges.includes('bronze')) nextBadges.push('bronze');
    if (stageNum === 8 && !nextBadges.includes('silver')) nextBadges.push('silver');
    if (stageNum === 10 && !nextBadges.includes('gold')) nextBadges.push('gold');
    setBadges(nextBadges);

    try {
      // Calculate score and progress
      const score = stageNum * 100; // 100 points per stage
      const progress = Math.min(100, (nextUnlocked / 10) * 100);
      
      // Update game score and progress
      updateGameScore('growing-tree', score, progress);
      updateGameProgress('growing-tree', progress, { 
        currentStage: stageNum, 
        unlockedStages: nextUnlocked 
      });
    } catch (error) {
      console.error('Error updating game score:', error);
    }

    setRewardOpen(true);
    closeQuiz();

    const isFinal = stageNum === 10;
    if (isFinal) {
      setTimeout(() => setFinalCelebration(true), 400);
    }

    persist(currentIdx, nextUnlocked, nextBadges);
  };

  const onIncorrect = (explanation: string, image?: string) => {
    setWrongOpen({open:true, explanation, image});
  };

  const retryStage = () => {
    setWrongOpen({open:false});
    setQuizOpen(true);
  };

  const continueNext = () => {
    setRewardOpen(false);
    if (currentIdx < stages.length - 1) {
      const nextIdx = currentIdx + 1;
      setCurrentIdx(nextIdx);
      persist(nextIdx, unlocked, badges);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const playAgain = () => {
    setCurrentIdx(0);
    setUnlocked(0);
    setBadges([]);
    setRewardOpen(false);
    setFinalCelebration(false);
    
    // Reset game progress in context
    updateGameProgress('growing-tree', 0, { 
      currentStage: 1, 
      unlockedStages: 1 
    });
    
    persist(0, 0, []);
  };

  const currentStage = stages[currentIdx];

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header / Back */}
      <div className="bg-card shadow-sm border-b" style={{ boxShadow: 'var(--shadow-header)' }}>
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to="/games">
              <Button variant="ghost" size="sm" className="nav-link">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games Hub
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">🌳 Growing Constitution Tree</h1>
              <p className="text-sm text-muted-foreground">Unlock each stage to grow the tree from seed to blossom</p>
            </div>
          </div>
          <Scoreboard badges={badges} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <ProgressBar total={10} current={unlocked} />
      </div>

      <div className="container mx-auto px-4 pb-12 grid lg:grid-cols-2 gap-6">
        <Card className="constitutional-card">
          <CardContent className="p-4">
            <ConstitutionTree unlocked={unlocked} finalCelebration={finalCelebration} />
          </CardContent>
        </Card>

        <StageCard 
          stage={currentStage}
          disabled={currentIdx > unlocked}
          onStudy={() => {}}
          onTakeQuiz={() => setQuizOpen(true)}
        />
      </div>

      {/* Quiz */}
      <QuizModal 
        open={quizOpen}
        stage={currentStage}
        onClose={closeQuiz}
        onCorrect={onCorrect}
        onIncorrect={onIncorrect}
      />

      {/* Wrong Answer Popup */}
      {wrongOpen.open && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg mx-auto constitutional-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold mb-2 text-destructive">Incorrect</h3>
              {wrongOpen.image && (
                <img src={wrongOpen.image} alt="Explanation" className="w-full h-40 object-cover rounded mb-3" />
              )}
              <p className="text-sm text-muted-foreground mb-4">{wrongOpen.explanation}</p>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setWrongOpen({open:false})}>Close</Button>
                <Button className="btn-saffron" onClick={retryStage}>Study & Retry</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reward Popup */}
      <RewardPopup 
        open={rewardOpen}
        onClose={continueNext}
        stageIndex={currentIdx + 1}
      />

      {/* Final celebration */}
      {finalCelebration && (
        <div className="fixed inset-0 z-40 pointer-events-none">
          <Confetti colors={["#FF9933", "#FFFFFF", "#138808"]} numberOfPieces={300} recycle={false} />
        </div>
      )}

      {finalCelebration && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg mx-auto constitutional-card">
            <CardContent className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">🎉 Congratulations!</h3>
              <p className="text-muted-foreground mb-4">You completed all 10 stages. The Constitution Tree is in full bloom.</p>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Button variant="outline">Download Certificate (soon)</Button>
                <Link to="/games"><Button className="btn-saffron">Back to Games Hub</Button></Link>
              </div>
              <Button variant="outline" onClick={playAgain}>Play Again</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default GrowingTreeGame;
