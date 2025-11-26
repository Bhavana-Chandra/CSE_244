import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { ArrowLeft, Gamepad2, Brain, Map, Trophy, Star, Lock, TreePine, Target, TrendingUp, Scale, Grid3x3 } from 'lucide-react';
import CoinDisplay from '../components/CoinDisplay';
import { useGame } from '../context/GameContext';

interface GameCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  route: string;
  isEnabled: boolean;
  isComingSoon?: boolean;
  color: string;
  gradient: string;
  gameId: 'memory-match' | 'spin-learn' | 'growing-tree' | 'rights-duties' | 'crossword';
}

const games: GameCard[] = [
  {
    id: 'memory-match',
    title: 'Samvidhan Memory Match',
    description: 'Match rights, duties, and examples. Earn coins and unlock rewards!',
    icon: <Brain className="w-8 h-8" />,
    route: '/memory-match',
    isEnabled: true,
    color: 'text-[hsl(var(--accent))] ',
    gradient: 'from-[hsl(var(--primary))] to-[hsl(var(--accent))]',
    gameId: 'memory-match'
  },
  {
    id: 'spin-learn',
    title: 'Samvidhan Spin & Learn',
    description: 'Spin the wheel of Articles. Answer quick scenarios and win coins!',
    icon: <Map className="w-8 h-8" />,
    route: '/spin-learn',
    isEnabled: true,
    color: 'text-[hsl(var(--secondary))] ',
    gradient: 'from-[hsl(var(--secondary))] to-[hsl(var(--ashoka-blue))]',
    gameId: 'spin-learn'
  },
  {
    id: 'growing-tree',
    title: 'Growing Constitution Tree',
    description: 'Grow a beautiful tree by unlocking 10 stages of constitution-making with quizzes.',
    icon: <TreePine className="w-8 h-8" />,
    route: '/growing-tree',
    isEnabled: true,
    color: 'text-[hsl(var(--primary))] ',
    gradient: 'from-[hsl(var(--primary))] to-[hsl(var(--accent))]',
    gameId: 'growing-tree'
  },
  {
    id: 'rights-duties',
    title: 'Rights vs. Duties Challenge',
    description: 'Match constitutional rights with their corresponding duties. Learn the balance between freedoms and responsibilities!',
    icon: <Scale className="w-8 h-8" />,
    route: '/rights-duties',
    isEnabled: true,
    color: 'text-[hsl(var(--accent))] ',
    gradient: 'from-amber-400 to-orange-500',
    gameId: 'rights-duties'
  },
  {
    id: 'crossword',
    title: 'Constitution Crossword Challenge',
    description: 'Solve crossword clues related to the Indian Constitution. Test your knowledge of Articles, Rights, and Constitutional figures!',
    icon: <Grid3x3 className="w-8 h-8" />,
    route: '/crossword',
    isEnabled: true,
    color: 'text-[hsl(var(--primary))] ',
    gradient: 'from-amber-300 to-yellow-500',
    gameId: 'crossword'
  },
  {
    id: 'treasure-hunt',
    title: 'Constitutional Treasure Hunt',
    description: 'Explore and find hidden knowledge. (Coming soon)',
    icon: <Trophy className="w-8 h-8" />,
    route: '/treasure-hunt',
    isEnabled: false,
    isComingSoon: true,
    color: 'text-[hsl(var(--primary))] ',
    gradient: 'from-[hsl(var(--secondary))] to-[hsl(var(--ashoka-blue))]',
    gameId: 'memory-match' // placeholder since this game is not implemented
  }
];

const GamesHub: React.FC = () => {
  const { gameState } = useGame();
  
  // Calculate total score from all games with safe fallback
  const totalScore = React.useMemo(() => {
    if (!gameState?.gameScores) return 0;
    return Object.values(gameState.gameScores).reduce((sum, game) => {
      return sum + (game?.score || 0);
    }, 0);
  }, [gameState?.gameScores]);

  // Get game data with safe fallback
  const getGameData = (gameId: string) => {
    const defaultData = {
      score: 0,
      bestScore: 0,
      gamesPlayed: 0,
      progress: 0,
      currentStage: 1,
      unlockedStages: 1
    };
    
    if (!gameState?.gameScores) return defaultData;
    return gameState.gameScores[gameId as keyof typeof gameState.gameScores] || defaultData;
  };

  return (
    <div className="min-h-screen hero-gradient">
      {/* Header */}
      <div className="bg-card shadow-sm border-b" style={{ boxShadow: 'var(--shadow-header)' }}>
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto">
              <Link to="/" className="flex-shrink-0">
                <Button variant="ghost" size="sm" className="nav-link">
                  <ArrowLeft className="h-4 w-4 mr-1 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Home</span>
                  <span className="sm:hidden">Back</span>
                </Button>
              </Link>
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold truncate">🎮 Games Hub</h1>
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">Choose your constitutional learning adventure</p>
              </div>
            </div>
            <div className="w-full sm:w-auto sm:flex-shrink-0"><CoinDisplay /></div>
          </div>
        </div>
      </div>

      {/* Total Score Banner */}
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <Card className="constitutional-card max-w-4xl mx-auto">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] flex items-center justify-center text-white flex-shrink-0">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold">Total Score</h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">Combined score from all games</p>
                </div>
              </div>
              <div className="text-center sm:text-right w-full sm:w-auto">
                <div className="text-3xl sm:text-4xl font-bold text-[hsl(var(--accent))]">{totalScore}</div>
                <div className="flex items-center justify-center sm:justify-end text-xs sm:text-sm text-muted-foreground mt-1">
                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  <span className="hidden sm:inline">Keep playing to increase your score!</span>
                  <span className="sm:hidden">Keep playing!</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-3 sm:px-4 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {games.map((game) => {
            const gameData = getGameData(game.gameId);
            const isEnabled = game.isEnabled && !game.isComingSoon;
            
            return (
              <Card 
                key={game.id} 
                className={`constitutional-card group hover:shadow-lg transition-all duration-300 ${!isEnabled ? 'opacity-60' : ''}`}
              >
                <CardContent className="p-4 sm:p-6">
                  {/* Game Icon */}
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-white mb-3 sm:mb-4 mx-auto`}>
                    {React.cloneElement(game.icon as React.ReactElement, { className: "w-6 h-6 sm:w-8 sm:h-8" })}
                  </div>
                  
                  {/* Game Info */}
                  <div className="text-center mb-3 sm:mb-4">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 break-words">{game.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed break-words">{game.description}</p>
                  </div>

                  {/* Game Stats */}
                  {isEnabled && (
                    <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-muted-foreground">Current Score</span>
                        <span className="font-semibold text-xs sm:text-sm text-[hsl(var(--accent))]">{gameData.score}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-muted-foreground">Best Score</span>
                        <span className="font-semibold text-xs sm:text-sm text-[hsl(var(--primary))]">{gameData.bestScore}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-muted-foreground">Games Played</span>
                        <span className="font-semibold text-xs sm:text-sm">{gameData.gamesPlayed}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <span className="text-xs sm:text-sm text-muted-foreground">Progress</span>
                          <span className="text-xs sm:text-sm font-medium">{gameData.progress}%</span>
                        </div>
                        <Progress value={gameData.progress} className="h-2" />
                      </div>

                      {/* Special progress info for Growing Tree */}
                      {game.gameId === 'growing-tree' && (
                        <div className="text-center text-xs sm:text-sm text-muted-foreground">
                          Stage {gameData.currentStage || 1} of 10
                        </div>
                      )}
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="flex justify-center mb-3 sm:mb-4">
                    {isEnabled ? (
                      <Badge className="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] border-[hsl(var(--accent))/0.3] text-xs">
                        <Star className="h-3 w-3 mr-1" /> Available
                      </Badge>
                    ) : (
                      <Badge className="bg-muted text-foreground border text-xs">
                        <Lock className="h-3 w-3 mr-1" /> Coming Soon
                      </Badge>
                    )}
                  </div>

                  {/* Play Button */}
                  <div className="text-center">
                    {isEnabled ? (
                      <Link to={game.route}>
                        <Button className="btn-saffron w-full text-sm">
                          <Gamepad2 className="h-4 w-4 mr-2" /> Play Now
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="w-full text-sm" disabled>Coming Soon</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GamesHub;