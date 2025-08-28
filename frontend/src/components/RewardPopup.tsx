import React from 'react';
import { Reward } from '../data/rewardsData';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { X, Star, Sparkles } from 'lucide-react';
import Confetti from './Confetti';

interface RewardPopupProps {
  reward: Reward;
  isOpen: boolean;
  onClose: () => void;
}

const RewardPopup: React.FC<RewardPopupProps> = ({ reward, isOpen, onClose }) => {
  if (!isOpen) return null;

  const rarityClass = (rarity: string) => {
    const map: Record<string, string> = {
      common: 'bg-muted text-foreground border',
      rare: 'bg-[hsl(var(--secondary))/0.1] text-[hsl(var(--secondary))] border-[hsl(var(--secondary))/0.3]',
      epic: 'bg-[hsl(var(--accent))/0.1] text-[hsl(var(--accent))] border-[hsl(var(--accent))/0.3]',
      legendary: 'bg-[hsl(var(--gold))/0.15] text-[hsl(var(--gold))] border-[hsl(var(--gold))/0.3]'
    };
    return map[rarity] ?? map.common;
  };

  return (
    <>
      <Confetti />
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md mx-auto constitutional-card">
          <CardContent className="p-6 relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 h-8 w-8 p-0"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 text-[hsl(var(--gold))]" />
                <h2 className="text-xl font-bold">Special Surprise!</h2>
                <Sparkles className="h-5 w-5 text-[hsl(var(--gold))]" />
              </div>
              <p className="text-sm text-muted-foreground">Congratulations! You've earned a reward!</p>
            </div>

            <div className="rounded-lg p-6 mb-6 border constitutional-card">
              <div className="flex justify-between items-start mb-4">
                <Badge className={rarityClass(reward.rarity)}>
                  {reward.rarity.charAt(0).toUpperCase() + reward.rarity.slice(1)}
                </Badge>
                <div className="text-2xl">{reward.icon}</div>
              </div>

              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">{reward.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reward.description}</p>
              </div>

              <div className="mt-4">
                <Badge variant="secondary">
                  {reward.type.charAt(0).toUpperCase() + reward.type.slice(1)}
                </Badge>
              </div>
            </div>

            <div className="text-center">
              <Button 
                onClick={onClose}
                className="btn-saffron"
              >
                <Star className="h-4 w-4 mr-2" />
                Collect Reward
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-muted-foreground">
                +100 coins have been added to your balance!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default RewardPopup;
