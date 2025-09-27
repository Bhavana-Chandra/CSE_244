import React from 'react';
import { useGame } from '../../../context/GameContext';
import { Badge } from '../../../components/ui/badge';
import { Coins } from 'lucide-react';

interface Props { badges: string[]; }

const Scoreboard: React.FC<Props> = ({ badges }) => {
  const { gameState } = useGame();
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 constitutional-card px-3 py-1.5">
        <Coins className="h-4 w-4 text-[hsl(var(--gold))]" />
        <span className="text-sm font-semibold">{gameState.totalCoins}</span>
      </div>
      <div className="flex items-center gap-1">
        {badges.includes('bronze') && (
          <Badge className="bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] border-[hsl(var(--gold))/0.3]">Bronze</Badge>
        )}
        {badges.includes('silver') && (
          <Badge className="bg-muted text-foreground border">Silver</Badge>
        )}
        {badges.includes('gold') && (
          <Badge className="bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] border-[hsl(var(--gold))/0.3]">Gold</Badge>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
