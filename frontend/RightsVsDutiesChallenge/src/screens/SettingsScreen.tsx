/**
 * SettingsScreen
 * 
 * Game settings: sound, difficulty, text size, language, reset progress
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { theme } from '../styles/theme';
import { getSettings, saveSettings, resetProgress, GameSettings } from '../utils/storage';

interface SettingsScreenProps {
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({ onBack }) => {
  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true,
    difficulty: 'medium',
    textSize: 'medium',
    language: 'en',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const loadedSettings = await getSettings();
    setSettings(loadedSettings);
    setLoading(false);
  };

  const updateSetting = async <K extends keyof GameSettings>(
    key: K,
    value: GameSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const handleResetProgress = () => {
    Alert.alert(
      'Reset Progress',
      'Are you sure you want to reset all progress? This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await resetProgress();
            Alert.alert('Success', 'Progress has been reset.');
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading settings...</Text>
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
        <Text style={styles.title}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Sound Setting */}
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Sound</Text>
              <Text style={styles.settingDescription}>
                Enable or disable sound effects
              </Text>
            </View>
            <Switch
              value={settings.soundEnabled}
              onValueChange={(value) => updateSetting('soundEnabled', value)}
              trackColor={{
                false: theme.colors.background.secondary,
                true: theme.colors.accent.green,
              }}
              thumbColor={theme.colors.background.card}
            />
          </View>
        </View>

        {/* Difficulty Setting */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Difficulty</Text>
          <Text style={styles.settingDescription}>
            Default difficulty for new levels
          </Text>
          <View style={styles.optionsContainer}>
            {(['easy', 'medium', 'hard'] as const).map((difficulty) => (
              <TouchableOpacity
                key={difficulty}
                style={[
                  styles.optionButton,
                  settings.difficulty === difficulty && styles.optionButtonActive,
                ]}
                onPress={() => updateSetting('difficulty', difficulty)}
              >
                <Text
                  style={[
                    styles.optionText,
                    settings.difficulty === difficulty && styles.optionTextActive,
                  ]}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Text Size Setting */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Text Size</Text>
          <Text style={styles.settingDescription}>
            Adjust text size for better readability
          </Text>
          <View style={styles.optionsContainer}>
            {(['small', 'medium', 'large'] as const).map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.optionButton,
                  settings.textSize === size && styles.optionButtonActive,
                ]}
                onPress={() => updateSetting('textSize', size)}
              >
                <Text
                  style={[
                    styles.optionText,
                    settings.textSize === size && styles.optionTextActive,
                  ]}
                >
                  {size.charAt(0).toUpperCase() + size.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Language Setting (Placeholder) */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Language</Text>
          <Text style={styles.settingDescription}>
            Change app language (coming soon)
          </Text>
          <TouchableOpacity
            style={[styles.optionButton, styles.optionButtonDisabled]}
            disabled
          >
            <Text style={[styles.optionText, styles.optionTextDisabled]}>
              English
            </Text>
          </TouchableOpacity>
        </View>

        {/* Reset Progress */}
        <View style={styles.settingCard}>
          <Text style={styles.settingLabel}>Reset Progress</Text>
          <Text style={styles.settingDescription}>
            Clear all saved progress and scores
          </Text>
          <Button
            title="Reset Progress"
            onPress={handleResetProgress}
            variant="outline"
            style={styles.resetButton}
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
  },
  content: {
    padding: theme.spacing.lg,
  },
  settingCard: {
    backgroundColor: theme.colors.background.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    ...theme.shadows.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  settingLabel: {
    ...theme.typography.h3,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xs,
  },
  settingDescription: {
    ...theme.typography.bodySmall,
    color: theme.colors.text.secondary,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.md,
  },
  optionButton: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  optionButtonActive: {
    backgroundColor: theme.colors.accent.green + '30',
    borderColor: theme.colors.accent.green,
  },
  optionButtonDisabled: {
    opacity: 0.5,
  },
  optionText: {
    ...theme.typography.body,
    color: theme.colors.text.primary,
  },
  optionTextActive: {
    color: theme.colors.accent.green,
    fontWeight: '600',
  },
  optionTextDisabled: {
    color: theme.colors.text.light,
  },
  resetButton: {
    marginTop: theme.spacing.md,
  },
});

