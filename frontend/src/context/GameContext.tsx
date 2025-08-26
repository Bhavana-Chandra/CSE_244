import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameState {
  totalCoins: number;
  goldCoins: number;
  silverCoins: number;
  bronzeCoins: number;
  completedGames: string[];
}

interface GameContextType {
  gameState: GameState;
  addCoins: (amount: number, type: 'gold' | 'silver' | 'bronze') => void;
  completeGame: (gameId: string) => void;
  isGameCompleted: (gameId: string) => boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

interface GameProviderProps {
  children: React.ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('gameState');
    return saved ? JSON.parse(saved) : {
      totalCoins: 0,
      goldCoins: 0,
      silverCoins: 0,
      bronzeCoins: 0,
      completedGames: []
    };
  });

  useEffect(() => {
    localStorage.setItem('gameState', JSON.stringify(gameState));
  }, [gameState]);

  const addCoins = (amount: number, type: 'gold' | 'silver' | 'bronze') => {
    setGameState(prev => ({
      ...prev,
      totalCoins: prev.totalCoins + amount,
      [`${type}Coins`]: prev[`${type}Coins` as keyof GameState] as number + amount
    }));
  };

  const completeGame = (gameId: string) => {
    setGameState(prev => ({
      ...prev,
      completedGames: [...prev.completedGames, gameId]
    }));
  };

  const isGameCompleted = (gameId: string) => {
    return gameState.completedGames.includes(gameId);
  };

  return (
    <GameContext.Provider value={{
      gameState,
      addCoins,
      completeGame,
      isGameCompleted
    }}>
      {children}
    </GameContext.Provider>
  );
};
