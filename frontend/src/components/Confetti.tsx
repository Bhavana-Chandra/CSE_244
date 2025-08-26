import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  color: string;
  velocity: {
    x: number;
    y: number;
    rotation: number;
  };
}

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
      '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
    ];

    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 150; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        velocity: {
          x: (Math.random() - 0.5) * 8,
          y: Math.random() * 3 + 2,
          rotation: (Math.random() - 0.5) * 10
        }
      });
    }

    setConfetti(pieces);

    const interval = setInterval(() => {
      setConfetti(prev => 
        prev.map(piece => ({
          ...piece,
          x: piece.x + piece.velocity.x,
          y: piece.y + piece.velocity.y,
          rotation: piece.rotation + piece.velocity.rotation,
          velocity: {
            ...piece.velocity,
            y: piece.velocity.y + 0.1 // gravity
          }
        })).filter(piece => piece.y < window.innerHeight + 50)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: piece.x,
            top: piece.y,
            transform: `rotate(${piece.rotation}deg) scale(${piece.scale})`,
            backgroundColor: piece.color,
            boxShadow: `0 0 4px ${piece.color}`
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
