import React, { createContext, useContext, useState, useEffect } from 'react';

interface GameState {
  totalCoins: number;
  goldCoins: number;
  silverCoins: number;
  bronzeCoins: number;
  completedGames: string[];
  gameScores: {
    'memory-match': {
      score: number;
      bestScore: number;
      gamesPlayed: number;
      progress: number; // percentage
    };
    'spin-learn': {
      score: number;
      bestScore: number;
      gamesPlayed: number;
      progress: number; // percentage
    };
    'growing-tree': {
      score: number;
      bestScore: number;
      gamesPlayed: number;
      progress: number; // percentage
      currentStage: number;
      unlockedStages: number;
    };
    'rights-duties': {
      score: number;
      bestScore: number;
      gamesPlayed: number;
      progress: number; // percentage
    };
    'crossword': {
      score: number;
      bestScore: number;
      gamesPlayed: number;
      progress: number; // percentage
    };
  };
}

interface GameContextType {
  gameState: GameState;
  addCoins: (amount: number, type: 'gold' | 'silver' | 'bronze') => void;
  completeGame: (gameId: string) => void;
  isGameCompleted: (gameId: string) => boolean;
  updateGameScore: (gameId: keyof GameState['gameScores'], score: number, progress?: number) => void;
  updateGameProgress: (gameId: keyof GameState['gameScores'], progress: number, additionalData?: any) => void;
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

// Default state factory
const createDefaultState = (): GameState => ({
  totalCoins: 0,
  goldCoins: 0,
  silverCoins: 0,
  bronzeCoins: 0,
  completedGames: [],
  gameScores: {
    'memory-match': {
      score: 0,
      bestScore: 0,
      gamesPlayed: 0,
      progress: 0
    },
    'spin-learn': {
      score: 0,
      bestScore: 0,
      gamesPlayed: 0,
      progress: 0
    },
    'growing-tree': {
      score: 0,
      bestScore: 0,
      gamesPlayed: 0,
      progress: 0,
      currentStage: 1,
      unlockedStages: 1
    },
    'rights-duties': {
      score: 0,
      bestScore: 0,
      gamesPlayed: 0,
      progress: 0
    },
    'crossword': {
      score: 0,
      bestScore: 0,
      gamesPlayed: 0,
      progress: 0
    }
  }
});

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>(() => {
    const defaultState = createDefaultState();

    try {
      const saved = localStorage.getItem('gameState');
      if (saved) {
        const parsed = JSON.parse(saved);
        
        // Merge with default state to ensure all properties exist
        const mergedState = {
          ...defaultState,
          ...parsed,
          gameScores: {
            ...defaultState.gameScores,
            ...(parsed.gameScores || {})
          }
        };
        
        // Validate and fix any missing or invalid properties
        Object.keys(defaultState.gameScores).forEach(gameId => {
          if (!mergedState.gameScores[gameId]) {
            mergedState.gameScores[gameId] = defaultState.gameScores[gameId];
          } else {
            // Ensure all required properties exist
            const defaultGameData = defaultState.gameScores[gameId];
            mergedState.gameScores[gameId] = {
              ...defaultGameData,
              ...mergedState.gameScores[gameId]
            };
          }
        });
        
        return mergedState;
      }
    } catch (error) {
      console.warn('Failed to parse saved game state, using defaults:', error);
    }
    
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem('gameState', JSON.stringify(gameState));
    } catch (error) {
      console.warn('Failed to save game state:', error);
    }
  }, [gameState]);

  const addCoins = (amount: number, type: 'gold' | 'silver' | 'bronze') => {
    setGameState(prev => ({
      ...prev,
      totalCoins: prev.totalCoins + amount,
      [`${type}Coins`]: Math.max(0, (prev[`${type}Coins` as keyof GameState] as number) + amount)
    }));
  };

  const completeGame = (gameId: string) => {
    setGameState(prev => ({
      ...prev,
      completedGames: prev.completedGames.includes(gameId) 
        ? prev.completedGames 
        : [...prev.completedGames, gameId]
    }));
  };

  const isGameCompleted = (gameId: string) => {
    return gameState.completedGames.includes(gameId);
  };

  const updateGameScore = (gameId: keyof GameState['gameScores'], score: number, progress?: number) => {
    setGameState(prev => ({
      ...prev,
      gameScores: {
        ...prev.gameScores,
        [gameId]: {
          ...prev.gameScores[gameId],
          score: Math.max(0, score),
          bestScore: Math.max(prev.gameScores[gameId].bestScore, score),
          gamesPlayed: prev.gameScores[gameId].gamesPlayed + 1,
          progress: progress !== undefined ? Math.min(100, Math.max(0, progress)) : prev.gameScores[gameId].progress
        }
      }
    }));
  };

  const updateGameProgress = (gameId: keyof GameState['gameScores'], progress: number, additionalData?: any) => {
    setGameState(prev => ({
      ...prev,
      gameScores: {
        ...prev.gameScores,
        [gameId]: {
          ...prev.gameScores[gameId],
          progress: Math.min(100, Math.max(0, progress)),
          ...(additionalData || {})
        }
      }
    }));
  };

  return (
    <GameContext.Provider value={{
      gameState,
      addCoins,
      completeGame,
      isGameCompleted,
      updateGameScore,
      updateGameProgress
    }}>
      {children}
    </GameContext.Provider>
  );
};