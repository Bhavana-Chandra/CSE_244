import React from 'react';
import { MemoryCard as MemoryCardType } from '../data/memoryGameData';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';

interface MemoryCardProps {
  card: MemoryCardType;
  isFlipped: boolean;
  isMatched: boolean;
  isSelected: boolean;
  onClick: () => void;
}

const MemoryCard: React.FC<MemoryCardProps> = ({
  card,
  isFlipped,
  isMatched,
  isSelected,
  onClick
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'right':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'duty':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'directive':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'example':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCardStyle = () => {
    if (isMatched) {
      return 'bg-gradient-to-br from-green-100 to-green-200 border-green-400 shadow-lg';
    }
    if (isSelected) {
      return 'bg-gradient-to-br from-blue-100 to-blue-200 border-blue-400 shadow-lg';
    }
    return 'bg-white border-gray-200 hover:border-blue-300';
  };

  return (
    <Card
      className={`
        w-full h-32 cursor-pointer transition-all duration-300 transform
        ${getCardStyle()}
        ${isFlipped ? 'rotate-y-180' : ''}
        ${isMatched ? 'scale-105' : 'hover:scale-105'}
        ${isSelected ? 'ring-2 ring-blue-400' : ''}
      `}
      onClick={onClick}
    >
      <CardContent className="p-4 h-full flex flex-col items-center justify-center relative">
        {isFlipped ? (
          <>
            {/* Card Content */}
            <div className="text-center">
              <div className="text-2xl mb-2">{card.icon}</div>
              <h3 className="font-semibold text-sm mb-1 text-gray-800">
                {card.content}
              </h3>
              <Badge className={getTypeColor(card.type)}>
                {card.category}
              </Badge>
            </div>
          </>
        ) : (
          <>
            {/* Card Back */}
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <p className="text-xs text-gray-600 font-medium">Click to reveal</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryCard;
