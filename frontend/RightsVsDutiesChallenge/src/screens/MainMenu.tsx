/**
 * MainMenu Screen
 * 
 * Main menu with navigation options: Play, Practice, Leaderboard, Settings, About
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { theme } from '../styles/theme';

interface MainMenuProps {
  onPlay: () => void;
  onPractice: () => void;
  onLeaderboard: () => void;
  onSettings: () => void;
  onAbout: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onPlay,
  onPractice,
  onLeaderboard,
  onSettings,
  onAbout,
}) => {
  return (
    <LinearGradient
      colors={[theme.colors.background.primary, theme.colors.background.secondary]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Rights vs. Duties</Text>
        <Text style={styles.subtitle}>Challenge</Text>

        <View style={styles.menuContainer}>
          <Button title="Play" onPress={onPlay} style={styles.menuButton} />
          <Button
            title="Practice"
            onPress={onPractice}
            variant="secondary"
            style={styles.menuButton}
          />
          <Button
            title="Leaderboard"
            onPress={onLeaderboard}
            variant="outline"
            style={styles.menuButton}
          />
          <Button
            title="Settings"
            onPress={onSettings}
            variant="outline"
            style={styles.menuButton}
          />
          <Button
            title="About"
            onPress={onAbout}
            variant="outline"
            style={styles.menuButton}
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
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...theme.typography.h2,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.xxl,
    textAlign: 'center',
  },
  menuContainer: {
    width: '100%',
    maxWidth: 400,
    gap: theme.spacing.md,
  },
  menuButton: {
    width: '100%',
  },
});

