/**
 * PracticeMode Screen
 * 
 * Practice mode showing one pair at a time with explanations
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { theme } from '../styles/theme';
import levelsData from '../data/levels.json';

interface PracticeModeProps {
  onBack: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({ onBack }) => {
  // Get all pairs from all levels
  const allPairs = levelsData.levels.flatMap((level) => level.pairs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedDutyId, setSelectedDutyId] = useState<string | null>(null);

  const currentPair = allPairs[currentIndex];
  const allDuties = levelsData.levels.flatMap((level) => [
    ...level.pairs.map((p) => p.duty),
    ...(level.distractors || []),
  ]);
  const shuffledDuties = [...allDuties]
    .filter((d) => d.id !== currentPair.duty.id)
    .slice(0, 2)
    .concat([currentPair.duty])
    .sort(() => Math.random() - 0.5);

  const handleDutySelect = (dutyId: string) => {
    if (showExplanation) return;
    setSelectedDutyId(dutyId);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex < allPairs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowExplanation(false);
      setSelectedDutyId(null);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowExplanation(false);
      setSelectedDutyId(null);
    }
  };

  if (!currentPair) {
    return (
      <View style={styles.container}>
        <Text>No pairs available</Text>
        <Button title="Back" onPress={onBack} />
      </View>
    );
  }

  const isCorrect = selectedDutyId === currentPair.duty.id;

  return (
    <LinearGradient
      colors={[theme.colors.background.primary, theme.colors.background.secondary]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Practice Mode</Text>
        <Text style={styles.counter}>
          {currentIndex + 1} / {allPairs.length}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.practiceCard}>
          <Text style={styles.instruction}>
            Match the right to its corresponding duty
          </Text>

          <View style={styles.rightCard}>
            <Text style={styles.rightTitle}>{currentPair.right.title}</Text>
            {currentPair.right.article && (
              <Text style={styles.rightArticle}>{currentPair.right.article}</Text>
            )}
          </View>

          <Text style={styles.selectLabel}>Select the matching duty:</Text>

          <View style={styles.dutiesContainer}>
            {shuffledDuties.map((duty) => {
              const isSelected = selectedDutyId === duty.id;
              const isCorrectChoice = duty.id === currentPair.duty.id;
              const showResult = showExplanation && isSelected;

              return (
                <TouchableOpacity
                  key={duty.id}
                  style={[
                    styles.dutyOption,
                    isSelected && isCorrectChoice && styles.correctOption,
                    isSelected && !isCorrectChoice && styles.incorrectOption,
                  ]}
                  onPress={() => handleDutySelect(duty.id)}
                  disabled={showExplanation}
                >
                  <Text
                    style={[
                      styles.dutyText,
                      showResult && isCorrectChoice && styles.correctText,
                      showResult && !isCorrectChoice && styles.incorrectText,
                    ]}
                  >
                    {duty.title}
                  </Text>
                  {showResult && (
                    <Text style={styles.resultIcon}>
                      {isCorrectChoice ? '✓' : '✗'}
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {showExplanation && (
            <View style={styles.explanationCard}>
              <Text style={styles.explanationTitle}>
                {isCorrect ? 'Correct!' : 'Not quite right'}
              </Text>
              <Text style={styles.explanationText}>
                {currentPair.explanation}
              </Text>
              <Button
                title="Learn More"
                onPress={() => {
                  // Placeholder - could navigate to a detailed explanation screen
                  alert('Learn more feature coming soon!');
                }}
                variant="outline"
                style={styles.learnMoreButton}
              />
            </View>
          )}
        </View>

        <View style={styles.navigation}>
          <Button
            title="Previous"
            onPress={handlePrevious}
            variant="outline"
            disabled={currentIndex === 0}
            style={styles.navButton}
          />
          <Button
            title={currentIndex < allPairs.length - 1 ? 'Next' : 'Finish'}
            onPress={handleNext}
            disabled={!showExplanation || currentIndex >= allPairs.length - 1}
            style={styles.navButton}
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
  header: {
    padding: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.background.secondary,
  },
  backButton: {
    marginBottom: theme.spacing.sm,
  },
  backButtonText: {
    ...theme.typography.body,
    color: theme.colors.accent.green,
    fontWeight: '600',
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  counter: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
  content: {
    padding: theme.spacing.lg,
  },
  practiceCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    ...theme.shadows.md,
  },
  instruction: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  rightCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  rightTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.xs,
  },
  rightArticle: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
    textAlign: 'center',
  },
  selectLabel: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
    fontWeight: '600',
  },
  dutiesContainer: {
    gap: theme.spacing.md,
    marginBottom: theme.spacing.lg,
  },
  dutyOption: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 2,
    borderColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...theme.shadows.sm,
  },
  correctOption: {
    borderColor: theme.colors.status.correct,
    backgroundColor: theme.colors.status.correct + '20',
  },
  incorrectOption: {
    borderColor: theme.colors.status.incorrect,
    backgroundColor: theme.colors.status.incorrect + '20',
  },
  dutyText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
    flex: 1,
  },
  correctText: {
    color: theme.colors.status.correct,
    fontWeight: '600',
  },
  incorrectText: {
    color: theme.colors.status.incorrect,
  },
  resultIcon: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  explanationCard: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginTop: theme.spacing.md,
  },
  explanationTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  explanationText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  learnMoreButton: {
    marginTop: theme.spacing.sm,
  },
  navigation: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  navButton: {
    flex: 1,
  },
});

