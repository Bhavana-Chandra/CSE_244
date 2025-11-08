/**
 * ResultScreen
 * 
 * Shows level completion results: score, stars, explanations for each pair
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StarRating } from '../components/StarRating';
import { Button } from '../components/Button';
import { ConfettiEffect } from '../components/ConfettiEffect';
import { theme } from '../styles/theme';
import { getPairExplanation } from '../utils/matchingLogic';
import levelsData from '../data/levels.json';

interface ResultScreenProps {
  result: {
    levelId: number;
    score: number;
    stars: number;
    matches: Array<{ rightId: string; dutyId: string }>;
    timeLeft: number | null;
  };
  onReplay: () => void;
  onNextLevel: () => void;
  onBackToMenu: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  result,
  onReplay,
  onNextLevel,
  onBackToMenu,
}) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const level = levelsData.levels.find((l) => l.id === result.levelId);

  useEffect(() => {
    // Hide confetti after animation
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!level) {
    return (
      <View style={styles.container}>
        <Text>Level not found</Text>
        <Button title="Back to Menu" onPress={onBackToMenu} />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[theme.colors.background.primary, theme.colors.background.secondary]}
      style={styles.container}
    >
      <ConfettiEffect visible={showConfetti} />
      
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.resultCard}>
          <Text style={styles.title}>Level Complete!</Text>
          
          <View style={styles.scoreSection}>
            <Text style={styles.scoreLabel}>Score</Text>
            <Text style={styles.scoreValue}>{result.score}</Text>
          </View>

          <View style={styles.starsSection}>
            <Text style={styles.starsLabel}>Stars Earned</Text>
            <StarRating stars={result.stars} maxStars={3} size={40} showLabel />
          </View>

          {result.timeLeft !== null && (
            <View style={styles.timeSection}>
              <Text style={styles.timeLabel}>Time Remaining</Text>
              <Text style={styles.timeValue}>{result.timeLeft}s</Text>
            </View>
        </View>

        <View style={styles.explanationsCard}>
          <Text style={styles.explanationsTitle}>Correct Pairs</Text>
          
          {result.matches.map((match, index) => {
            const pair = level.pairs.find(
              (p) => p.right.id === match.rightId && p.duty.id === match.dutyId
            );
            const explanation = getPairExplanation(
              match.rightId,
              match.dutyId,
              level.pairs
            );

            if (!pair || !explanation) return null;

            return (
              <View key={index} style={styles.explanationItem}>
                <View style={styles.pairHeader}>
                  <Text style={styles.rightText}>{pair.right.title}</Text>
                  <Text style={styles.arrow}>→</Text>
                  <Text style={styles.dutyText}>{pair.duty.title}</Text>
                </View>
                <Text style={styles.explanationText}>{explanation}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.actions}>
          <Button
            title="Replay"
            onPress={onReplay}
            variant="outline"
            style={styles.actionButton}
          />
          <Button
            title="Next Level"
            onPress={onNextLevel}
            style={styles.actionButton}
          />
          <Button
            title="Back to Menu"
            onPress={onBackToMenu}
            variant="outline"
            style={styles.actionButton}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
  },
  resultCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
    ...theme.shadows.lg,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.lg,
    textAlign: 'center',
  },
  scoreSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  scoreLabel: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  scoreValue: {
    ...theme.typography.h1,
    color: theme.colors.accent.gold,
    fontWeight: 'bold',
  },
  starsSection: {
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  starsLabel: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.sm,
  },
  timeSection: {
    alignItems: 'center',
  },
  timeLabel: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xs,
  },
  timeValue: {
    ...theme.typography.h3,
    color: theme.colors.accent.green,
  },
  explanationsCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  explanationsTitle: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  explanationItem: {
    marginBottom: theme.spacing.lg,
    paddingBottom: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.secondary,
  },
  pairHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  rightText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    fontWeight: '600',
    flex: 1,
  },
  arrow: {
    ...theme.typography.body,
    color: theme.colors.accent.gold,
    marginHorizontal: theme.spacing.sm,
  },
  dutyText: {
    ...theme.typography.body,
    color: theme.colors.accent.green,
    fontWeight: '600',
    flex: 1,
  },
  explanationText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  actions: {
    gap: theme.spacing.md,
  },
  actionButton: {
    width: '100%',
  },
});

