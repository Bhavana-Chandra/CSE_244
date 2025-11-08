import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, Gamepad2, Trophy, Star, Clock, Lightbulb } from 'lucide-react';
import { useGame } from '../context/GameContext';
import CoinDisplay from '../components/CoinDisplay';
import levelsData from '../data/rightsVsDutiesLevels';

interface Match {
  rightId: string;
  dutyId: string;
}

interface GameResult {
  levelId: number;
  score: number;
  stars: number;
  matches: Match[];
  timeLeft: number | null;
}

const RightsVsDuties: React.FC = () => {
  const { updateGameScore, updateGameProgress, addCoins } = useGame();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [matches, setMatches] = useState<Match[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [hintsRemaining, setHintsRemaining] = useState(0);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const level = levelsData.levels.find((l) => l.id === currentLevel);

  useEffect(() => {
    if (level && gameStarted) {
      setTimeLeft(level.timeLimit || null);
      setHintsRemaining(level.hints || 0);
      setMatches([]);
      setScore(0);
      setDraggedCardId(null);
    }
  }, [currentLevel, gameStarted, level]);

  useEffect(() => {
    if (timeLeft === null || !gameStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameStarted]);

  const isCorrectMatch = (rightId: string, dutyId: string): boolean => {
    if (!level) return false;
    return level.pairs.some(
      (pair) => pair.right.id === rightId && pair.duty.id === dutyId
    );
  };

  const areAllPairsMatched = (): boolean => {
    if (!level) return false;
    return matches.length === level.pairs.length;
  };

  const handleCardDragStart = (rightId: string) => {
    setDraggedCardId(rightId);
  };

  const handleDutyClick = (dutyId: string) => {
    if (!draggedCardId || !level) return;

    const isCorrect = isCorrectMatch(draggedCardId, dutyId);
    const alreadyMatched = matches.some(
      (m) => m.rightId === draggedCardId || m.dutyId === dutyId
    );

    if (alreadyMatched) return;

    if (isCorrect) {
      const newMatches = [...matches, { rightId: draggedCardId, dutyId }];
      setMatches(newMatches);
      setScore(score + 100);
      setDraggedCardId(null);

      if (areAllPairsMatched()) {
        setTimeout(() => handleLevelComplete(newMatches), 500);
      }
    } else {
      setScore(Math.max(0, score - 10));
      setDraggedCardId(null);
    }
  };

  const handleHint = () => {
    if (hintsRemaining <= 0 || !level) return;

    const unmatchedPair = level.pairs.find(
      (pair) =>
        !matches.some(
          (m) => m.rightId === pair.right.id && m.duty.id === pair.duty.id
        )
    );

    if (unmatchedPair) {
      const newMatches = [...matches, { rightId: unmatchedPair.right.id, dutyId: unmatchedPair.duty.id }];
      setMatches(newMatches);
      setScore(Math.max(0, score - 50));
      setHintsRemaining(hintsRemaining - 1);
    }
  };

  const handleCheck = () => {
    if (areAllPairsMatched()) {
      handleLevelComplete(matches);
    } else {
      alert(`You have matched ${matches.length} out of ${level?.pairs.length} pairs. Keep trying!`);
    }
  };

  const handleLevelComplete = (finalMatches: Match[]) => {
    if (!level) return;

    const baseScore = finalMatches.length * 100;
    const timeBonus = timeLeft ? Math.floor(timeLeft * 2) : 0;
    const finalScore = score + timeBonus;

    let stars = 1;
    if (finalScore >= baseScore * 0.9) stars = 3;
    else if (finalScore >= baseScore * 0.7) stars = 2;

    const result: GameResult = {
      levelId: currentLevel,
      score: finalScore,
      stars,
      matches: finalMatches,
      timeLeft,
    };

    setGameResult(result);
    setShowResult(true);

    // Update game context
    updateGameScore('rights-duties', finalScore, (finalMatches.length / level.pairs.length) * 100);
    addCoins(Math.floor(finalScore / 10), 'gold');
  };

  const handleTimeUp = () => {
    alert('Time Up! Your time has run out.');
    setGameStarted(false);
  };

  const handleStartGame = () => {
    setGameStarted(true);
    setShowResult(false);
    setGameResult(null);
  };

  const handleNextLevel = () => {
    if (currentLevel < levelsData.levels.length) {
      setCurrentLevel(currentLevel + 1);
      setGameStarted(false);
      setShowResult(false);
    }
  };

  const handleReplay = () => {
    setGameStarted(false);
    setShowResult(false);
    setGameResult(null);
  };

  if (!level) {
    return (
      <div className="min-h-screen hero-gradient p-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p>Level not found</p>
            <Link to="/games">
              <Button className="mt-4">Back to Games</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allDuties = [
    ...level.pairs.map((p) => p.duty),
    ...(level.distractors || []),
  ];
  const shuffledDuties = [...allDuties].sort(() => Math.random() - 0.5);

  if (showResult && gameResult) {
    return (
      <div className="min-h-screen hero-gradient p-8">
        <div className="max-w-4xl mx-auto">
          <Link to="/games">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Games
            </Button>
          </Link>

          <Card className="constitutional-card">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-center mb-6">Level Complete!</h1>
              
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[hsl(var(--accent))] mb-2">
                  {gameResult.score}
                </div>
                <div className="text-muted-foreground">Final Score</div>
              </div>

              <div className="text-center mb-6">
                <div className="flex justify-center gap-2 mb-2">
                  {[1, 2, 3].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 ${
                        star <= gameResult.stars
                          ? 'fill-[hsl(var(--accent))] text-[hsl(var(--accent))]'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <div className="text-muted-foreground">{gameResult.stars} Stars Earned</div>
              </div>

              <div className="space-y-4 mb-6">
                <h2 className="text-xl font-bold">Correct Pairs</h2>
                {gameResult.matches.map((match, index) => {
                  const pair = level.pairs.find(
                    (p) => p.right.id === match.rightId && p.duty.id === match.dutyId
                  );
                  if (!pair) return null;

                  return (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="font-semibold mb-2">
                        {pair.right.title} → {pair.duty.title}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {pair.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4">
                <Button onClick={handleReplay} variant="outline" className="flex-1">
                  Replay
                </Button>
                {currentLevel < levelsData.levels.length && (
                  <Button onClick={handleNextLevel} className="flex-1">
                    Next Level
                  </Button>
                )}
                <Link to="/games" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Back to Games
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen hero-gradient p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/games">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
            </Link>
            <CoinDisplay />
          </div>

          <Card className="constitutional-card">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-center mb-4">
                Rights vs. Duties Challenge
              </h1>
              <p className="text-center text-muted-foreground mb-8">
                Match constitutional rights with their corresponding duties
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold mb-2">{level.name}</h3>
                  <div className="text-sm text-muted-foreground">
                    <div>Difficulty: <span className="capitalize">{level.difficulty}</span></div>
                    <div>Pairs: {level.pairs.length}</div>
                    {level.timeLimit && <div>Time Limit: {level.timeLimit}s</div>}
                    <div>Hints: {level.hints}</div>
                  </div>
                </div>
              </div>

              <Button onClick={handleStartGame} className="w-full" size="lg">
                <Gamepad2 className="h-5 w-5 mr-2" />
                Start Level {currentLevel}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-gradient p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/games">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <CoinDisplay />
        </div>

        <Card className="constitutional-card mb-4">
          <CardContent className="p-4">
            <h1 className="text-2xl font-bold text-center mb-4">
              Rights vs. Duties Challenge
            </h1>
            <p className="text-center text-muted-foreground mb-4">
              Match rights to duties
            </p>

            <div className="flex justify-around items-center mb-4 pb-4 border-b">
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Score</div>
                <div className="text-2xl font-bold text-[hsl(var(--accent))]">{score}</div>
              </div>
              {timeLeft !== null && (
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Time</div>
                  <div className={`text-2xl font-bold ${timeLeft < 10 ? 'text-red-500' : ''}`}>
                    {timeLeft}s
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="text-sm text-muted-foreground">Hints</div>
                <div className="text-2xl font-bold">{hintsRemaining}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold mb-3 text-center">Rights</h3>
                <div className="space-y-2">
                  {level.pairs.map((pair) => {
                    const isMatched = matches.some((m) => m.rightId === pair.right.id);
                    return (
                      <button
                        key={pair.right.id}
                        onClick={() => handleCardDragStart(pair.right.id)}
                        disabled={isMatched}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          draggedCardId === pair.right.id
                            ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 scale-105'
                            : isMatched
                            ? 'border-green-500 bg-green-500/10 opacity-60'
                            : 'border-border bg-card hover:border-[hsl(var(--accent))] cursor-pointer'
                        }`}
                      >
                        <div className="font-semibold">{pair.right.title}</div>
                        {pair.right.article && (
                          <div className="text-sm text-muted-foreground">{pair.right.article}</div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-center">Duties</h3>
                <div className="space-y-2">
                  {shuffledDuties.map((duty) => {
                    const matchedRightId = matches.find((m) => m.dutyId === duty.id)?.rightId;
                    const isMatched = !!matchedRightId;
                    return (
                      <button
                        key={duty.id}
                        onClick={() => handleDutyClick(duty.id)}
                        disabled={isMatched || !draggedCardId}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          isMatched
                            ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/20'
                            : draggedCardId
                            ? 'border-[hsl(var(--accent))] bg-[hsl(var(--accent))]/10 cursor-pointer hover:scale-105'
                            : 'border-border bg-card opacity-60'
                        }`}
                      >
                        <div className="font-semibold">{duty.title}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleHint}
                variant="outline"
                disabled={hintsRemaining <= 0}
                className="flex-1"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Hint ({hintsRemaining})
              </Button>
              <Button
                onClick={handleCheck}
                disabled={!areAllPairsMatched()}
                className="flex-2"
              >
                Check
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RightsVsDuties;

