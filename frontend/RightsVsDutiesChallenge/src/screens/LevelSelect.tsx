/**
 * LevelSelect Screen
 * 
 * Shows available levels with progress, stars, and difficulty indicators
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StarRating } from '../components/StarRating';
import { theme } from '../styles/theme';
import { getProgress, LevelProgress } from '../utils/storage';
import levelsData from '../data/levels.json';

interface LevelSelectProps {
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

export const LevelSelect: React.FC<LevelSelectProps> = ({ onSelectLevel, onBack }) => {
  const [progress, setProgress] = useState<Record<number, LevelProgress>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress = async () => {
    const prog = await getProgress();
    setProgress(prog);
    setLoading(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return theme.colors.status.info;
      case 'medium':
        return theme.colors.status.warning;
      case 'hard':
        return theme.colors.status.incorrect;
      default:
        return theme.colors.text.secondary;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.accent.green} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.background.primary, theme.colors.background.secondary]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select Level</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {levelsData.levels.map((level) => {
          const levelProgress = progress[level.id];
          const isUnlocked = levelProgress?.unlocked ?? level.id === 1;
          const isCompleted = levelProgress?.completed ?? false;
          const stars = levelProgress?.stars ?? 0;

          return (
            <TouchableOpacity
              key={level.id}
              style={[
                styles.levelCard,
                !isUnlocked && styles.lockedCard,
              ]}
              onPress={() => isUnlocked && onSelectLevel(level.id)}
              disabled={!isUnlocked}
            >
              <View style={styles.levelHeader}>
                <Text style={styles.levelName}>{level.name}</Text>
                <View
                  style={[
                    styles.difficultyBadge,
                    { backgroundColor: getDifficultyColor(level.difficulty) + '30' },
                  ]}
                >
                  <Text
                    style={[
                      styles.difficultyText,
                      { color: getDifficultyColor(level.difficulty) },
                    ]}
                  >
                    {level.difficulty.toUpperCase()}
                  </Text>
                </View>
              </View>

              <View style={styles.levelInfo}>
                <Text style={styles.levelDetails}>
                  {level.pairs.length} pairs
                  {level.timeLimit && ` • ${level.timeLimit}s`}
                </Text>
                {isCompleted && (
                  <StarRating stars={stars} maxStars={3} size={20} />
                )}
              </View>

              {!isUnlocked && (
                <Text style={styles.lockedText}>Locked</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  backButtonText: {
    ...theme.typography.body,
    color: theme.colors.accent.green,
    fontWeight: '600',
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  levelCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    ...theme.shadows.md,
    marginBottom: theme.spacing.md,
  },
  lockedCard: {
    opacity: 0.6,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  levelName: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  difficultyText: {
    ...theme.typography.bodySmall,
    fontWeight: '600',
  },
  levelInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  levelDetails: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
  lockedText: {
    ...theme.typography.body,
    color: theme.colors.text.light,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
    fontStyle: 'italic',
  },
});

