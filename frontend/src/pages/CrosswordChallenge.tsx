import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { ArrowLeft, RotateCcw, Lightbulb, Clock, CheckCircle2, Sparkles, BookOpen, X } from 'lucide-react';
import { useGame } from '../context/GameContext';
import CoinDisplay from '../components/CoinDisplay';
import { crosswordLevels, CrosswordLevel, CrosswordWord, placeWordsOnGrid } from '../data/crosswordData';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

interface GridCell {
  letter: string | null;
  isFilled: boolean;
  isCorrect: boolean;
  wordIds: string[];
  revealedLetters: Set<number>; // Track which letter positions are revealed by hints
}

const CrosswordChallenge: React.FC = () => {
  const { updateGameScore, updateGameProgress, addCoins } = useGame();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [filledWords, setFilledWords] = useState<Set<string>>(new Set());
  const [showFact, setShowFact] = useState<{ word: string; fact: string } | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [learnMode, setLearnMode] = useState(false);
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [wordPositions, setWordPositions] = useState<Map<string, { row: number; col: number; direction: string; answer: string; number: number }>>(new Map());
  const [cellToWords, setCellToWords] = useState<Map<string, string[]>>(new Map());
  const [cellNumbers, setCellNumbers] = useState<Map<string, number>>(new Map());
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showWellDone, setShowWellDone] = useState(false);
  const [levelCompleteScore, setLevelCompleteScore] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState<Map<string, Set<number>>>(new Map()); // wordId -> Set of revealed positions
  const inputRef = useRef<HTMLInputElement>(null);

  const level = crosswordLevels.find((l) => l.id === currentLevel);

  useEffect(() => {
    if (level && gameStarted) {
      initializeGame();
    }
  }, [currentLevel, gameStarted, level]);

  useEffect(() => {
    if (timeLeft === null || !gameStarted || learnMode) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(timer);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameStarted, learnMode]);

  const initializeGame = () => {
    if (!level) return;

    const { grid: initialGrid, wordPositions: positions, cellToWords: cellMap, cellNumbers: numbers } = placeWordsOnGrid(level);
    const gridCells: GridCell[][] = initialGrid.map((row, rowIndex) =>
      row.map((letter, colIndex) => {
        const cellKey = `${rowIndex}-${colIndex}`;
        const wordIds = cellMap.get(cellKey) || [];
        return {
          letter,
          isFilled: false,
          isCorrect: false,
          wordIds,
          revealedLetters: new Set(),
        };
      })
    );

    setGrid(gridCells);
    setWordPositions(positions);
    setCellToWords(cellMap);
    setCellNumbers(numbers);
    setTimeLeft(level.timeLimit || null);
    setScore(0);
    setHintsUsed(0);
    setFilledWords(new Set());
    setCompletedWords(new Set());
    setSelectedWord(null);
    setUserInput('');
    setShowFact(null);
    setShowExplanation(false);
    setShowLevelComplete(false);
    setShowWellDone(false);
    setRevealedLetters(new Map());
  };

  const handleWordSelect = (wordId: string) => {
    setSelectedWord(wordId);
    setUserInput('');
    setShowExplanation(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInputChange = (value: string) => {
    setUserInput(value.toUpperCase().replace(/[^A-Z0-9]/g, ''));
  };

  const handleSubmit = () => {
    if (!selectedWord || !level || !userInput.trim()) return;

    const word = level.words.find((w) => w.id === selectedWord);
    if (!word) return;

    const userAnswer = userInput.trim().toUpperCase();
    const correctAnswer = word.answer.toUpperCase();

    if (userAnswer === correctAnswer) {
      // Correct answer
      const newFilledWords = new Set([...filledWords, selectedWord]);
      const newCompletedWords = new Set([...completedWords, selectedWord]);
      
      fillWordInGrid(selectedWord, word);
      setScore(score + 10);
      setFilledWords(newFilledWords);
      setCompletedWords(newCompletedWords);
      setUserInput('');
      setSelectedWord(null);

      // Show fact
      if (word.fact) {
        setShowFact({ word: word.answer, fact: word.fact });
        setTimeout(() => setShowFact(null), 5000);
      }

      // Check if level is complete
      if (newCompletedWords.size === level.words.length) {
        setShowWellDone(true);
        setTimeout(() => {
          setShowWellDone(false);
          handleLevelComplete();
        }, 2000);
      }
    } else {
      // Incorrect answer - clear input with shake animation
      setUserInput('');
      // Visual feedback could be added here
    }
  };

  const fillWordInGrid = (wordId: string, word: CrosswordWord) => {
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    const { row, col, direction, answer } = word;
    const letters = answer.split('');

    letters.forEach((letter, index) => {
      const currentRow = direction === 'across' ? row : row + index;
      const currentCol = direction === 'across' ? col + index : col;

      if (currentRow < level!.gridSize && currentCol < level!.gridSize) {
        newGrid[currentRow][currentCol].isFilled = true;
        newGrid[currentRow][currentCol].isCorrect = true;
      }
    });

    setGrid(newGrid);
  };

  const handleHint = () => {
    if (!level || !selectedWord) return;

    const word = level.words.find((w) => w.id === selectedWord);
    if (!word || filledWords.has(selectedWord)) return;

    // Get revealed positions for this word
    const currentRevealed = revealedLetters.get(selectedWord) || new Set<number>();
    
    // Find first unrevealed letter position
    let revealIndex = -1;
    for (let i = 0; i < word.answer.length; i++) {
      if (!currentRevealed.has(i)) {
        revealIndex = i;
        break;
      }
    }

    if (revealIndex === -1) return; // All letters already revealed

    // Update revealed letters
    const newRevealed = new Set(currentRevealed);
    newRevealed.add(revealIndex);
    setRevealedLetters(new Map(revealedLetters).set(selectedWord, newRevealed));

    // Update input to show revealed letter
    const currentInput = userInput.split('');
    currentInput[revealIndex] = word.answer[revealIndex];
    setUserInput(currentInput.join(''));

    // Deduct points
    setScore(Math.max(0, score - 2));
    setHintsUsed(hintsUsed + 1);
  };

  const handleShowExplanation = () => {
    if (!selectedWord || !level) return;

    const word = level.words.find((w) => w.id === selectedWord);
    if (word && word.fact) {
      setShowExplanation(true);
    }
  };

  const handleLevelComplete = () => {
    if (!level) return;

    const timeBonus = timeLeft ? Math.floor(timeLeft / 10) : 0;
    const speedBonus = completedWords.size === level.words.length && timeLeft && level.timeLimit && timeLeft > level.timeLimit / 2 ? 5 : 0;
    const finalScore = score + 10 + timeBonus + speedBonus; // +10 for the last word

    setLevelCompleteScore(finalScore);
    setShowLevelComplete(true);

    // Update game context
    updateGameScore('crossword', finalScore, 100);
    addCoins(Math.floor(finalScore / 10), 'gold');
  };

  const handleTimeUp = () => {
    alert('Time Up! Better luck next time.');
    setGameStarted(false);
  };

  const handleRestart = () => {
    initializeGame();
  };

  const handleNextLevel = () => {
    if (currentLevel < crosswordLevels.length) {
      setCurrentLevel(currentLevel + 1);
      setGameStarted(false);
      setShowLevelComplete(false);
    }
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const getRevealedLetter = (row: number, col: number, wordId: string): string | null => {
    const word = level?.words.find((w) => w.id === wordId);
    if (!word) return null;

    const revealed = revealedLetters.get(wordId) || new Set();
    const { row: wordRow, col: wordCol, direction, answer } = word;

    let letterIndex = -1;
    if (direction === 'across') {
      if (row === wordRow && col >= wordCol && col < wordCol + answer.length) {
        letterIndex = col - wordCol;
      }
    } else {
      if (col === wordCol && row >= wordRow && row < wordRow + answer.length) {
        letterIndex = row - wordRow;
      }
    }

    if (letterIndex >= 0 && revealed.has(letterIndex)) {
      return answer[letterIndex];
    }

    return null;
  };

  if (!level) {
    return (
      <div className="min-h-screen hero-gradient p-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6">
            <p>Level not found</p>
            <Link to="/games">
              <Button className="mt-4">Back to Games</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen hero-gradient p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/games">
              <Button variant="ghost">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Games
              </Button>
            </Link>
            <CoinDisplay />
          </div>

          <Card className="constitutional-card">
            <CardContent className="p-8">
              <h1 className="text-3xl font-bold text-center mb-4 text-[#5C4B3F]">
                Constitution Crossword Challenge
              </h1>
              <p className="text-center text-muted-foreground mb-8">
                Solve crossword clues related to the Indian Constitution
              </p>

              <div className="space-y-4 mb-8">
                <div className="p-4 bg-[#FFFDF7] rounded-lg border-2 border-[#5C4B3F]">
                  <h3 className="font-semibold mb-2 text-[#5C4B3F]">{level.name}</h3>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div>Difficulty: <span className="capitalize font-semibold">{level.difficulty}</span></div>
                    <div>Words: {level.words.length}</div>
                    <div>Grid Size: {level.gridSize}x{level.gridSize}</div>
                    {level.timeLimit && <div>Time Limit: {Math.floor(level.timeLimit / 60)} minutes</div>}
                  </div>
                </div>

                <div className="flex items-center space-x-2 p-3 bg-[#FFFDF7] rounded-lg">
                  <input
                    type="checkbox"
                    id="learnMode"
                    checked={learnMode}
                    onChange={(e) => setLearnMode(e.target.checked)}
                    className="w-4 h-4 accent-[hsl(var(--accent))]"
                  />
                  <label htmlFor="learnMode" className="text-sm text-[#5C4B3F] cursor-pointer">
                    Learn Mode (No timer, explanations after each clue)
                  </label>
                </div>
              </div>

              <Button onClick={handleStartGame} className="w-full btn-saffron" size="lg">
                Start Level {currentLevel}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const selectedWordData = selectedWord ? level.words.find((w) => w.id === selectedWord) : null;

  return (
    <div className="min-h-screen hero-gradient p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/games">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <CoinDisplay />
        </div>

        <Card className="constitutional-card mb-4 bg-[#FFFDF7]">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-[#5C4B3F]">Constitution Crossword Challenge</h1>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Score</div>
                  <div className="text-xl font-bold text-[hsl(var(--accent))]">{score}</div>
                </div>
                {timeLeft !== null && !learnMode && (
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Time</div>
                    <div className={`text-xl font-bold ${timeLeft < 60 ? 'text-red-500' : 'text-[#5C4B3F]'}`}>
                      {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Crossword Grid */}
            <div className="mb-6 flex justify-center">
              <div
                className="inline-grid gap-1 p-4 bg-[#FDFBF5] rounded-lg border-2 border-[#5C4B3F] shadow-md"
                style={{
                  gridTemplateColumns: `repeat(${level.gridSize}, minmax(0, 1fr))`,
                  maxWidth: '100%',
                }}
              >
                {grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isEmpty = cell.letter === null;
                    const isSelected = cell.wordIds.some((id) => id === selectedWord);
                    const isCompleted = cell.wordIds.some((id) => completedWords.has(id));
                    const cellKey = `${rowIndex}-${colIndex}`;
                    const cellNumber = cellNumbers.get(cellKey);
                    const revealedLetter = selectedWord && cell.wordIds.includes(selectedWord)
                      ? getRevealedLetter(rowIndex, colIndex, selectedWord)
                      : null;

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={`
                          aspect-square flex items-center justify-center min-w-[40px] min-h-[40px] relative
                          rounded-md border-2 font-bold text-lg transition-all duration-200
                          ${isEmpty ? 'bg-transparent border-transparent' : ''}
                          ${!isEmpty && !cell.isFilled
                            ? 'bg-white border-[#5C4B3F] text-[#5C4B3F] cursor-pointer hover:bg-[#FFFDF7] hover:border-[hsl(var(--accent))]'
                            : ''}
                          ${cell.isFilled && cell.isCorrect
                            ? 'bg-[#E8C547] border-[#E8C547] text-[#5C4B3F] shadow-lg'
                            : ''}
                          ${isSelected ? 'ring-2 ring-[hsl(var(--accent))] ring-offset-1' : ''}
                        `}
                        onClick={() => {
                          if (!isEmpty && !cell.isFilled) {
                            const wordId = cell.wordIds[0];
                            if (wordId) handleWordSelect(wordId);
                          }
                        }}
                      >
                        {/* Clue number in top-left corner */}
                        {cellNumber && (
                          <span className="absolute top-0 left-0 text-xs font-bold text-[#5C4B3F] bg-[#FDFBF5] px-0.5 rounded-br">
                            {cellNumber}
                          </span>
                        )}
                        {cell.isFilled ? (
                          <span className="text-[#5C4B3F]">{cell.letter}</span>
                        ) : revealedLetter ? (
                          <span className="text-[hsl(var(--accent))] opacity-70">{revealedLetter}</span>
                        ) : cell.letter ? (
                          <span className="text-[#8B7355]">?</span>
                        ) : null}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Clues Section */}
            <div className="mb-6">
              <h3 className="font-semibold mb-3 text-[#5C4B3F]">Clues:</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {level.words
                  .sort((a, b) => a.number - b.number)
                  .map((word) => {
                    const isCompleted = completedWords.has(word.id);
                    const isSelected = selectedWord === word.id;
                    const directionLabel = word.direction === 'across' ? 'Across' : 'Down';

                    return (
                      <div
                        key={word.id}
                        className={`
                          p-3 rounded-lg border-2 cursor-pointer transition-all
                          ${isCompleted
                            ? 'bg-[#E8C547]/20 border-[#E8C547]'
                            : isSelected
                            ? 'bg-[hsl(var(--accent))]/10 border-[hsl(var(--accent))]'
                            : 'bg-white border-[#5C4B3F] hover:bg-[#FFFDF7]'}
                        `}
                        onClick={() => handleWordSelect(word.id)}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[#5C4B3F]">
                            {word.number} {directionLabel}: {word.clue}
                          </span>
                          {isCompleted && (
                            <CheckCircle2 className="w-5 h-5 text-[#E8C547] flex-shrink-0" />
                          )}
                        </div>
                        {isCompleted && (
                          <div className="text-sm text-muted-foreground mt-1">
                            Answer: <span className="font-semibold text-[#5C4B3F]">{word.answer}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Input Section */}
            {selectedWord && selectedWordData && (
              <div className="mb-6 p-4 bg-[#FFFDF7] rounded-lg border-2 border-[#5C4B3F]">
                <div className="mb-3">
                  <div className="font-semibold text-[#5C4B3F] mb-1">
                    Selected: {selectedWordData.clue}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Answer length: {selectedWordData.answer.length} letters
                  </div>
                </div>
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSubmit();
                    }}
                    placeholder={`Enter ${selectedWordData.answer.length}-letter answer`}
                    className="flex-1 px-4 py-2 border-2 border-[#5C4B3F] rounded-lg focus:outline-none focus:ring-2 focus:ring-[hsl(var(--accent))] text-[#5C4B3F] font-semibold bg-white"
                    maxLength={selectedWordData.answer.length}
                  />
                  <Button
                    onClick={handleHint}
                    variant="outline"
                    disabled={filledWords.has(selectedWord)}
                    className="border-[#5C4B3F] text-[#5C4B3F] hover:bg-[#FFFDF7]"
                  >
                    <Lightbulb className="h-4 w-4 mr-2" />
                    Hint (-2)
                  </Button>
                  <Button
                    onClick={handleShowExplanation}
                    variant="outline"
                    className="border-[#5C4B3F] text-[#5C4B3F] hover:bg-[#FFFDF7]"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Explain
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!userInput.trim() || userInput.length !== selectedWordData.answer.length}
                    className="btn-saffron"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}

            {/* Fact Alert */}
            {showFact && (
              <Alert className="mb-4 bg-[#E8C547]/10 border-[#E8C547]">
                <Sparkles className="h-4 w-4 text-[#E8C547]" />
                <AlertDescription>
                  <strong className="text-[#5C4B3F]">{showFact.word}:</strong>{' '}
                  <span className="text-muted-foreground">{showFact.fact}</span>
                </AlertDescription>
              </Alert>
            )}

            {/* Explanation Dialog */}
            <Dialog open={showExplanation} onOpenChange={setShowExplanation}>
              <DialogContent className="bg-[#FFFDF7] border-2 border-[#5C4B3F]">
                <DialogHeader>
                  <DialogTitle className="text-[#5C4B3F]">
                    {selectedWordData?.answer} - Explanation
                  </DialogTitle>
                  <DialogDescription className="text-muted-foreground">
                    {selectedWordData?.fact}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* Well Done Message */}
            {showWellDone && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-[#FFFDF7] border-4 border-[#E8C547] rounded-xl p-8 shadow-2xl animate-bounce">
                  <h2 className="text-4xl font-bold text-center text-[#5C4B3F] mb-2">
                    Well Done! 🎉
                  </h2>
                  <p className="text-xl text-center text-muted-foreground">
                    You've completed the crossword!
                  </p>
                </div>
              </div>
            )}

            {/* Level Complete Dialog */}
            <Dialog open={showLevelComplete} onOpenChange={setShowLevelComplete}>
              <DialogContent className="bg-[#FFFDF7] border-2 border-[#E8C547]">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-[#5C4B3F] text-center">
                    🎉 Level Complete! 🎉
                  </DialogTitle>
                  <DialogDescription className="text-center space-y-2 pt-4">
                    <div className="text-3xl font-bold text-[hsl(var(--accent))]">
                      Score: {levelCompleteScore}
                    </div>
                    <div className="text-muted-foreground">
                      Great job! You've completed all the clues.
                    </div>
                    <div className="flex gap-2 pt-4">
                      {currentLevel < crosswordLevels.length && (
                        <Button onClick={handleNextLevel} className="flex-1 btn-saffron">
                          Next Level
                        </Button>
                      )}
                      <Button onClick={handleRestart} variant="outline" className="flex-1">
                        Replay
                      </Button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button onClick={handleRestart} variant="outline" className="flex-1 border-[#5C4B3F] text-[#5C4B3F]">
                <RotateCcw className="h-4 w-4 mr-2" />
                Restart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CrosswordChallenge;
