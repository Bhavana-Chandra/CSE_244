import React from 'react';
import { useGame } from '../context/GameContext';
import { Badge } from './ui/badge';
import { Coins } from 'lucide-react';

const CoinDisplay: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="constitutional-card flex items-center justify-between p-4">
      <div className="flex items-center space-x-2">
        <Coins className="h-5 w-5 text-[hsl(var(--gold))]" />
        <span className="font-semibold text-lg">Total: {gameState.totalCoins}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Badge className="bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30">
          🥇 {gameState.goldCoins}
        </Badge>
        <Badge className="bg-muted text-foreground border">
          🥈 {gameState.silverCoins}
        </Badge>
        <Badge className="bg-muted text-foreground border">
          🥉 {gameState.bronzeCoins}
        </Badge>
      </div>
    </div>
  );
};

export default CoinDisplay;
