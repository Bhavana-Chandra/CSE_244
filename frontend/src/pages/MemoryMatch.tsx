import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, RotateCcw, Trophy, Star, Gamepad2 } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { getShuffledCards, MemoryCard as MemoryCardType } from '../data/memoryGameData';
import { getRandomReward, Reward } from '../data/rewardsData';
import CoinDisplay from '../components/CoinDisplay';
import MemoryCard from '../components/MemoryCard';
import RewardPopup from '../components/RewardPopup';

const MemoryMatch: React.FC = () => {
  const { addCoins, completeGame, isGameCompleted, updateGameScore, updateGameProgress } = useGame();
  const [cards, setCards] = useState<MemoryCardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [currentReward, setCurrentReward] = useState<Reward | null>(null);
  const [showChestAnimation, setShowChestAnimation] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const shuffledCards = getShuffledCards();
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
    setShowReward(false);
    setCurrentReward(null);
    setShowChestAnimation(false);
    setShowWinScreen(false);
  };

  const handleCardClick = (cardId: string) => {
    if (flippedCards.length === 2 || flippedCards.includes(cardId) || matchedPairs.includes(cardId)) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);
      
      const [firstCardId, secondCardId] = newFlippedCards;
      const firstCard = cards.find(card => card.id === firstCardId);
      const secondCard = cards.find(card => card.id === secondCardId);

      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, firstCardId, secondCardId]);
          setFlippedCards([]);
          const newMatchedPairs = [...matchedPairs, firstCardId, secondCardId];
          if (newMatchedPairs.length === cards.length) {
            handleGameWin();
          }
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleGameWin = () => {
    setGameWon(true);
    addCoins(100, 'gold');
    completeGame('memory-match');
    
    try {
      // Calculate score based on moves (fewer moves = higher score)
      const maxMoves = cards.length; // Total possible moves
      const score = Math.max(0, Math.floor((maxMoves - moves) * 10)); // Score decreases with more moves
      const progress = Math.min(100, (matchedPairs.length / cards.length) * 100);
      
      // Update game score and progress
      updateGameScore('memory-match', score, progress);
    } catch (error) {
      console.error('Error updating game score:', error);
    }
    
    setShowChestAnimation(true);
    setTimeout(() => {
      setShowWinScreen(true);
      setShowChestAnimation(false);
    }, 2000);
  };

  const handlePlayAgain = () => startNewGame();

  const handleShowReward = () => {
    const reward = getRandomReward();
    setCurrentReward(reward);
    setShowReward(true);
    setShowWinScreen(false);
  };

  const isCardFlipped = (cardId: string) => flippedCards.includes(cardId) || matchedPairs.includes(cardId);
  const isCardMatched = (cardId: string) => matchedPairs.includes(cardId);
  const isCardSelected = (cardId: string) => flippedCards.includes(cardId) && !matchedPairs.includes(cardId);

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
                <h1 className="text-2xl font-bold">
                  🎯 Samvidhan Memory Match
                </h1>
                <p className="text-sm text-muted-foreground">
                  Match constitutional rights, duties, and examples
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge className="bg-[hsl(var(--secondary))/0.1] text-[hsl(var(--secondary))] border-[hsl(var(--secondary))/0.3]">
                <Star className="h-3 w-3 mr-1" />
                Moves: {moves}
              </Badge>
              {isGameCompleted('memory-match') && (
                <Badge className="bg-[hsl(var(--accent))/0.1] text-[hsl(var(--accent))] border-[hsl(var(--accent))/0.3]">
                  <Trophy className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <CoinDisplay />
      </div>

      <div className="container mx-auto px-4 mb-8">
        <Card className="constitutional-card">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-xl font-bold mb-2">How to Play</h2>
              <p className="text-muted-foreground">
                Click on cards to reveal constitutional concepts. Match rights with their examples, duties with their actions, and directive principles with real-life applications!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-4 mb-8">
            {cards.map((card) => (
              <MemoryCard
                key={card.id}
                card={card}
                isFlipped={isCardFlipped(card.id)}
                isMatched={isCardMatched(card.id)}
                isSelected={isCardSelected(card.id)}
                onClick={() => handleCardClick(card.id)}
              />
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Button onClick={startNewGame} variant="outline" className="flex items-center space-x-2">
              <RotateCcw className="h-4 w-4" />
              <span>New Game</span>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="constitutional-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[hsl(var(--secondary))]">{moves}</div>
                <p className="text-sm text-muted-foreground">Total Moves</p>
              </CardContent>
            </Card>
            <Card className="constitutional-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[hsl(var(--accent))]">{matchedPairs.length / 2}</div>
                <p className="text-sm text-muted-foreground">Pairs Found</p>
              </CardContent>
            </Card>
            <Card className="constitutional-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-[hsl(var(--primary))]">{cards.length / 2}</div>
                <p className="text-sm text-muted-foreground">Total Pairs</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showChestAnimation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <img src="/src/assets/rewards/chest-open.svg" alt="Chest Opening" className="w-32 h-32 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-white mb-2">Congratulations!</h2>
            <p className="text-white/80">You've completed the memory challenge!</p>
          </div>
        </div>
      )}

      {showWinScreen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md mx-auto constitutional-card">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 mx-auto mb-4">
                <img src="/src/assets/rewards/chest-open.svg" alt="Treasure Chest" />
              </div>
              <h2 className="text-2xl font-bold mb-2">You Won!</h2>
              <p className="text-muted-foreground mb-6">
                Congratulations! You've completed the Samvidhan Memory Match and earned <span className="text-[hsl(var(--gold))] font-semibold">+100 coins</span>!
              </p>
              
              <div className="space-y-3">
                <Button onClick={handleShowReward} className="btn-saffron w-full">
                  <Trophy className="h-4 w-4 mr-2" />
                  Claim Your Reward
                </Button>
                
                <Button onClick={handlePlayAgain} variant="outline" className="w-full">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Play Again
                </Button>
                
                <Link to="/games">
                  <Button variant="outline" className="w-full">
                    <Gamepad2 className="h-4 w-4 mr-2" />
                    Back to Games Hub
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {currentReward && (
        <RewardPopup
          reward={currentReward}
          isOpen={showReward}
          onClose={() => {
            setShowReward(false);
            setShowWinScreen(true);
          }}
        />
      )}
    </div>
  );
};

export default MemoryMatch;
