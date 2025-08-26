import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Gamepad2, Brain, Map, Trophy, Star, Lock } from 'lucide-react';
import CoinDisplay from '../components/CoinDisplay';

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
    gradient: 'from-[hsl(var(--primary))] to-[hsl(var(--accent))]'
  },
  {
    id: 'rights-quest',
    title: 'Rights Quest',
    description: 'Scenario journey about fundamental rights. (Currently disabled)',
    icon: <Map className="w-8 h-8" />,
    route: '/rights-quest',
    isEnabled: false,
    isComingSoon: true,
    color: 'text-[hsl(var(--secondary))] ',
    gradient: 'from-[hsl(var(--secondary))] to-[hsl(var(--ashoka-blue))]'
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
    gradient: 'from-[hsl(var(--secondary))] to-[hsl(var(--ashoka-blue))]'
  }
];

const GamesHub: React.FC = () => {
  return (
    <div className="min-h-screen hero-gradient">
      <div className="bg-card shadow-sm border-b" style={{ boxShadow: 'var(--shadow-header)' }}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="nav-link">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">
                  🎮 Games Hub
                </h1>
                <p className="text-sm text-muted-foreground">
                  Choose your constitutional learning adventure
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge className="bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30">
                <Star className="h-3 w-3 mr-1" />
                Games Available
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <CoinDisplay />
      </div>

      <div className="container mx-auto px-4 mb-8">
        <Card className="constitutional-card">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[hsl(var(--primary))/0.15] rounded-full flex items-center justify-center mx-auto mb-4 text-[hsl(var(--primary))]">
                <Gamepad2 className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Welcome to the Games Hub!</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Learn through fun and interactive games. Complete challenges, earn coins, and unlock special rewards as you explore your rights and duties.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {games.map((game) => (
            <Card 
              key={game.id} 
              className={`constitutional-card group hover:shadow-lg transition-all duration-300 ${!game.isEnabled ? 'opacity-60' : ''}`}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.gradient} flex items-center justify-center text-white mb-4 mx-auto` }>
                  {game.icon}
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-2">
                    {game.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {game.description}
                  </p>
                </div>

                <div className="flex justify-center mb-4">
                  {game.isComingSoon ? (
                    <Badge className="bg-muted text-foreground border">
                      <Lock className="h-3 w-3 mr-1" />
                      Coming Soon
                    </Badge>
                  ) : game.isEnabled ? (
                    <Badge className="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] border-[hsl(var(--accent))/0.3]">
                      <Star className="h-3 w-3 mr-1" />
                      Available
                    </Badge>
                  ) : (
                    <Badge className="bg-muted text-foreground border">
                      <Lock className="h-3 w-3 mr-1" />
                      Disabled
                    </Badge>
                  )}
                </div>

                <div className="text-center">
                  {game.isEnabled ? (
                    <Link to={game.route}>
                      <Button className="btn-saffron w-full">
                        <Gamepad2 className="h-4 w-4 mr-2" />
                        Play Now
                      </Button>
                    </Link>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="w-full cursor-not-allowed opacity-50"
                      disabled
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      {game.isComingSoon ? 'Coming Soon' : 'Disabled'}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="constitutional-card">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">
                🎯 How to Play
              </h3>
              <p className="text-muted-foreground text-sm">
                Select any available game to start your journey. Complete challenges to earn coins and unlock special rewards. Your coins and progress are shared across games.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GamesHub;
