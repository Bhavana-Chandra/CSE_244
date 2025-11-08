/**
 * GameScreen
 * 
 * Main game screen where players drag and drop rights cards onto duty targets
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// Note: Audio import commented out - uncomment when sound files are available
// import { Audio } from 'expo-av';
import { DraggableCard } from '../components/DraggableCard';
import { DropTarget } from '../components/DropTarget';
import { Button } from '../components/Button';
import { theme } from '../styles/theme';
import { isCorrectMatch, areAllPairsMatched } from '../utils/matchingLogic';
import { updateLevelProgress } from '../utils/storage';
import levelsData from '../data/levels.json';

interface GameScreenProps {
  levelId: number;
  onComplete: (result: any) => void;
  onBack: () => void;
}

interface Match {
  rightId: string;
  dutyId: string;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  levelId,
  onComplete,
  onBack,
}) => {
  const level = levelsData.levels.find((l) => l.id === levelId);
  const [matches, setMatches] = useState<Match[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(level?.timeLimit || null);
  const [hintsRemaining, setHintsRemaining] = useState(level?.hints || 0);
  const [draggedCardId, setDraggedCardId] = useState<string | null>(null);
  const [activeTargetId, setActiveTargetId] = useState<string | null>(null);
  const [showConnector, setShowConnector] = useState<Record<string, string>>({});
  const [soundEnabled, setSoundEnabled] = useState(true);
  const shakeAnim = useRef(new Animated.Value(0)).current;

  // Timer effect
  useEffect(() => {
    if (timeLeft === null) return;

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
  }, [timeLeft]);

  // Load settings
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const { getSettings } = await import('../utils/storage');
      const settings = await getSettings();
      setSoundEnabled(settings.soundEnabled);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  // Play sound effect
  const playSound = async (soundName: 'correct' | 'incorrect') => {
    if (!soundEnabled) return;
    // Sound playback disabled until actual sound files are added
    // Uncomment when sound files are available:
    /*
    try {
      const { Audio } = await import('expo-av');
      const soundFile = soundName === 'correct' 
        ? require('../../assets/correct.wav')
        : require('../../assets/incorrect.wav');
      const { sound } = await Audio.Sound.createAsync(soundFile);
      await sound.playAsync();
    } catch (error) {
      console.log('Sound file not available');
    }
    */
  };

  // Shake animation for incorrect match
  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: -10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 10,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(shakeAnim, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleDragStart = (rightId: string) => {
    setDraggedCardId(rightId);
  };

  const handleDragEnd = () => {
    setDraggedCardId(null);
    setActiveTargetId(null);
  };

  const handleTargetPress = (dutyId: string) => {
    if (draggedCardId) {
      handleDrop(draggedCardId, dutyId);
    }
  };

  const handleDrop = (rightId: string, dutyId: string) => {
    if (!level) return;

    const isCorrect = isCorrectMatch(rightId, dutyId, level.pairs);

    if (isCorrect) {
      // Check if already matched
      const alreadyMatched = matches.some(
        (m) => m.rightId === rightId || m.dutyId === dutyId
      );
      if (alreadyMatched) {
        return; // Already matched
      }

      // Correct match
      const newMatches = [...matches, { rightId, dutyId }];
      setMatches(newMatches);
      setScore(score + 100);
      setShowConnector({ ...showConnector, [dutyId]: rightId });
      playSound('correct');

      // Check if all pairs matched
      if (areAllPairsMatched(newMatches, level.pairs.length)) {
        setTimeout(() => {
          handleLevelComplete(newMatches);
        }, 500);
      }
    } else {
      // Incorrect match
      setScore(Math.max(0, score - 10));
      shake();
      playSound('incorrect');
    }

    setDraggedCardId(null);
    setActiveTargetId(null);
  };

  const handleCheck = () => {
    if (!level) return;

    if (areAllPairsMatched(matches, level.pairs.length)) {
      handleLevelComplete(matches);
    } else {
      Alert.alert(
        'Incomplete',
        `You have matched ${matches.length} out of ${level.pairs.length} pairs. Keep trying!`
      );
    }
  };

  const handleHint = () => {
    if (hintsRemaining <= 0) {
      Alert.alert('No Hints Left', 'You have used all your hints for this level.');
      return;
    }

    if (!level) return;

    // Find first unmatched pair
    const unmatchedPair = level.pairs.find(
      (pair) =>
        !matches.some(
          (m) => m.rightId === pair.right.id && m.duty.id === pair.duty.id
        )
    );

    if (unmatchedPair) {
      // Auto-match the pair
      const newMatches = [...matches, { rightId: unmatchedPair.right.id, dutyId: unmatchedPair.duty.id }];
      setMatches(newMatches);
      setScore(Math.max(0, score - 50));
      setHintsRemaining(hintsRemaining - 1);
      setShowConnector({ ...showConnector, [unmatchedPair.duty.id]: unmatchedPair.right.id });
    }
  };

  const handleLevelComplete = async (finalMatches: Match[]) => {
    if (!level) return;

    // Calculate stars (1-3 based on score and time)
    let stars = 1;
    const baseScore = finalMatches.length * 100;
    const timeBonus = timeLeft ? Math.floor(timeLeft * 2) : 0;
    const finalScore = score + timeBonus;

    if (finalScore >= baseScore * 0.9) stars = 3;
    else if (finalScore >= baseScore * 0.7) stars = 2;

    // Save progress
    await updateLevelProgress(levelId, {
      completed: true,
      stars,
      bestScore: finalScore,
    });

    const result = {
      levelId,
      score: finalScore,
      stars,
      matches: finalMatches,
      timeLeft,
    };

    onComplete(result);
  };

  const handleTimeUp = () => {
    Alert.alert('Time Up!', 'Your time has run out. Better luck next time!', [
      { text: 'OK', onPress: onBack },
    ]);
  };

  if (!level) {
    return (
      <View style={styles.container}>
        <Text>Level not found</Text>
        <Button title="Back" onPress={onBack} />
      </View>
    );
  }

  // Shuffle duties for display (include distractors for hard levels)
  const allDuties = [
    ...level.pairs.map((p) => p.duty),
    ...(level.distractors || []),
  ];
  const shuffledDuties = [...allDuties].sort(() => Math.random() - 0.5);

  return (
    <LinearGradient
      colors={[theme.colors.background.primary, theme.colors.background.secondary]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Rights vs. Duties Challenge</Text>
      </View>

      <View style={styles.gameContainer}>
        <Text style={styles.instruction}>Match rights to duties</Text>

        <View style={styles.statsBar}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Score</Text>
            <Text style={styles.statValue}>{score}</Text>
          </View>
          {timeLeft !== null && (
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Time</Text>
              <Text style={[styles.statValue, timeLeft < 10 && styles.timeWarning]}>
                {timeLeft}s
              </Text>
            </View>
          )}
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Hints</Text>
            <Text style={styles.statValue}>{hintsRemaining}</Text>
          </View>
        </View>

        <ScrollView style={styles.gameArea} contentContainerStyle={styles.gameContent}>
          <View style={styles.columnsContainer}>
            {/* Left column - Rights */}
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Rights</Text>
              {level.pairs.map((pair) => {
                const isMatched = matches.some((m) => m.rightId === pair.right.id);
                return (
                  <DraggableCard
                    key={pair.right.id}
                    id={pair.right.id}
                    title={pair.right.title}
                    article={pair.right.article}
                    icon={pair.right.icon}
                    onDragStart={() => handleDragStart(pair.right.id)}
                    onDragEnd={handleDragEnd}
                    disabled={isMatched}
                    matched={isMatched}
                    style={{ transform: [{ translateX: shakeAnim }] }}
                  />
                );
              })}
            </View>

            {/* Right column - Duties */}
            <View style={styles.column}>
              <Text style={styles.columnTitle}>Duties</Text>
              {shuffledDuties.map((duty) => {
                const matchedRightId = matches.find((m) => m.dutyId === duty.id)?.rightId;
                const isMatched = !!matchedRightId;
                const isActive = activeTargetId === duty.id;

                return (
                  <TouchableOpacity
                    key={duty.id}
                    style={styles.dropTargetWrapper}
                    onPress={() => handleTargetPress(duty.id)}
                    disabled={isMatched || !draggedCardId}
                    activeOpacity={0.7}
                  >
                    <DropTarget
                      id={duty.id}
                      title={duty.title}
                      icon={duty.icon}
                      isActive={isActive}
                      isMatched={isMatched}
                      matchedRightId={matchedRightId}
                    />
                    {showConnector[duty.id] && (
                      <View style={styles.connectorLine} />
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.actionBar}>
          <Button
            title="Hint"
            onPress={handleHint}
            variant="outline"
            disabled={hintsRemaining <= 0}
            style={styles.hintButton}
          />
          <Button
            title="Check"
            onPress={handleCheck}
            style={styles.checkButton}
            disabled={!areAllPairsMatched(matches, level.pairs.length)}
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.accent.greenLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  backButtonText: {
    fontSize: 24,
    color: theme.colors.accent.greenDark,
    fontWeight: 'bold',
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  gameContainer: {
    flex: 1,
    backgroundColor: theme.colors.background.secondary,
    margin: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  instruction: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: theme.spacing.md,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.card,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  statValue: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
  },
  timeWarning: {
    color: theme.colors.accent.red,
  },
  gameArea: {
    flex: 1,
  },
  gameContent: {
    paddingVertical: theme.spacing.md,
  },
  columnsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  column: {
    flex: 1,
  },
  columnTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  dropTargetWrapper: {
    position: 'relative',
  },
  connectorLine: {
    position: 'absolute',
    left: -60,
    top: '50%',
    width: 50,
    height: 3,
    backgroundColor: theme.colors.accent.gold,
    borderRadius: 2,
    zIndex: 1,
  },
  actionBar: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  hintButton: {
    flex: 1,
  },
  checkButton: {
    flex: 2,
  },
});

