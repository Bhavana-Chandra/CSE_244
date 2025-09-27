import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Gamepad2, Brain, Map, Trophy, Star, Lock, TreePine } from 'lucide-react';
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
    id: 'spin-learn',
    title: 'Samvidhan Spin & Learn',
    description: 'Spin the wheel of Articles. Answer quick scenarios and win coins!',
    icon: <Map className="w-8 h-8" />,
    route: '/spin-learn',
    isEnabled: true,
    color: 'text-[hsl(var(--secondary))] ',
    gradient: 'from-[hsl(var(--secondary))] to-[hsl(var(--ashoka-blue))]'
  },
  {
    id: 'growing-tree',
    title: 'Growing Constitution Tree',
    description: 'Grow a beautiful tree by unlocking 10 stages of constitution-making with quizzes.',
    icon: <TreePine className="w-8 h-8" />,
    route: '/growing-tree',
    isEnabled: true,
    color: 'text-[hsl(var(--primary))] ',
    gradient: 'from-[hsl(var(--primary))] to-[hsl(var(--accent))]'
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
                <h1 className="text-2xl font-bold">🎮 Games Hub</h1>
                <p className="text-sm text-muted-foreground">Choose your constitutional learning adventure</p>
              </div>
            </div>
            <div className="w-[320px]"><CoinDisplay /></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6">
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
                  <h3 className="text-xl font-bold mb-2">{game.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{game.description}</p>
                </div>
                <div className="flex justify-center mb-4">
                  {game.isEnabled ? (
                    <Badge className="bg-[hsl(var(--accent))]/10 text-[hsl(var(--accent))] border-[hsl(var(--accent))/0.3]">
                      <Star className="h-3 w-3 mr-1" /> Available
                    </Badge>
                  ) : (
                    <Badge className="bg-muted text-foreground border">
                      <Lock className="h-3 w-3 mr-1" /> Coming Soon
                    </Badge>
                  )}
                </div>
                <div className="text-center">
                  {game.isEnabled ? (
                    <Link to={game.route}>
                      <Button className="btn-saffron w-full">
                        <Gamepad2 className="h-4 w-4 mr-2" /> Play Now
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>Coming Soon</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamesHub;
