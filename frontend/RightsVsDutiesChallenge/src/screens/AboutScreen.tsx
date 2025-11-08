/**
 * AboutScreen
 * 
 * About page with app description, version, and credits
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

interface AboutScreenProps {
  onBack: () => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onBack }) => {
  return (
    <LinearGradient
      colors={[theme.colors.background.primary, theme.colors.background.secondary]}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>About</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.aboutCard}>
          <Text style={styles.sectionTitle}>Rights vs. Duties Challenge</Text>
          
          <Text style={styles.description}>
            Rights vs. Duties Challenge is an educational game that helps you learn
            about constitutional rights and their corresponding duties. Match each
            right with its duty to understand how rights and responsibilities go
            hand in hand.
          </Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learning Goal</Text>
            <Text style={styles.sectionText}>
              This game aims to help players understand that every constitutional
              right comes with a corresponding duty. By matching rights to duties,
              players learn the balance between freedoms and responsibilities in a
              democratic society.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How to Play</Text>
            <Text style={styles.sectionText}>
              • Drag rights cards onto their matching duty targets{'\n'}
              • Complete all pairs to finish a level{'\n'}
              • Earn stars based on your score and time{'\n'}
              • Use hints wisely - they cost points{'\n'}
              • Practice mode lets you learn at your own pace
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Version</Text>
            <Text style={styles.sectionText}>1.0.0</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Credits</Text>
            <Text style={styles.sectionText}>
              Developed as an educational tool for learning about constitutional
              rights and duties. Content is based on the Indian Constitution.
            </Text>
            <Text style={styles.sectionText}>
              This game is designed to be accessible, educational, and engaging
              for learners of all ages.
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              © 2024 Rights vs. Duties Challenge
            </Text>
          </View>
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
  },
  content: {
    padding: theme.spacing.lg,
  },
  aboutCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.xl,
    ...theme.shadows.md,
  },
  sectionTitle: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 24,
    marginBottom: theme.spacing.md,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionText: {
    ...theme.typography.body,
    color: theme.colors.text.secondary,
    lineHeight: 24,
  },
  footer: {
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: theme.colors.background.secondary,
    alignItems: 'center',
  },
  footerText: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.light,
  },
});

