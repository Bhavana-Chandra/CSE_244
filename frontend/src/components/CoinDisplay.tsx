import React from 'react';
import { useGame } from '../context/GameContext';
import { Badge } from './ui/badge';
import { Coins } from 'lucide-react';

const CoinDisplay: React.FC = () => {
  const { gameState } = useGame();

  return (
    <div className="constitutional-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 p-3 sm:p-4 w-full">
      <div className="flex items-center space-x-2">
        <Coins className="h-4 w-4 sm:h-5 sm:w-5 text-[hsl(var(--gold))] flex-shrink-0" />
        <span className="font-semibold text-sm sm:text-lg whitespace-nowrap">Total: {gameState.totalCoins}</span>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
        <Badge className="bg-[hsl(var(--gold))]/15 text-[hsl(var(--gold))] border-[hsl(var(--gold))]/30 text-xs">
          🥇 {gameState.goldCoins}
        </Badge>
        <Badge className="bg-muted text-foreground border text-xs">
          🥈 {gameState.silverCoins}
        </Badge>
        <Badge className="bg-muted text-foreground border text-xs">
          🥉 {gameState.bronzeCoins}
        </Badge>
      </div>
    </div>
  );
};

export default CoinDisplay;
