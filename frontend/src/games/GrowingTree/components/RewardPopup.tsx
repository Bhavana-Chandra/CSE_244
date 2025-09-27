import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';

interface Props {
  open: boolean;
  onClose: () => void;
  stageIndex: number; // 1..10
}

const RewardPopup: React.FC<Props> = ({ open, onClose, stageIndex }) => {
  if (!open) return null;
  const badge = stageIndex === 5 ? 'Bronze Badge Unlocked' : stageIndex === 8 ? 'Silver Badge Unlocked' : stageIndex === 10 ? 'Gold Badge Unlocked' : null;

  return (
    <div role="dialog" aria-modal="true" aria-label="Reward unlocked" className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto constitutional-card">
        <CardContent className="p-6 text-center">
          <div className="text-3xl mb-2">💰 +50 Coins</div>
          {badge && <div className="text-[hsl(var(--gold))] font-semibold mb-2">{badge}</div>}
          <p className="text-sm text-muted-foreground mb-4">Great job! The tree grows stronger.</p>
          <Button className="btn-saffron" onClick={onClose}>Continue</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RewardPopup;
