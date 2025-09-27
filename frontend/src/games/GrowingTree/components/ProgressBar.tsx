import React from 'react';

interface Props { total: number; current: number; }

const ProgressBar: React.FC<Props> = ({ total, current }) => {
  const pct = Math.min(100, Math.max(0, (current / total) * 100));
  return (
    <div className="constitutional-card p-3">
      <div className="flex justify-between text-xs mb-1">
        <span className="font-medium">Progress</span>
        <span className="text-muted-foreground">{current}/{total}</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div className="h-2 rounded-full bg-[hsl(var(--primary))] transition-all" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

export default ProgressBar;
