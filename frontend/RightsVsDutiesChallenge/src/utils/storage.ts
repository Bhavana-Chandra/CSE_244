/**
 * Storage utilities for persisting game progress and scores
 * Uses AsyncStorage for local persistence
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  PROGRESS: '@rights_duties:progress',
  HIGH_SCORES: '@rights_duties:high_scores',
  SETTINGS: '@rights_duties:settings',
  LEADERBOARD: '@rights_duties:leaderboard',
} as const;

export interface LevelProgress {
  levelId: number;
  completed: boolean;
  stars: number;
  bestScore: number;
  unlocked: boolean;
}

export interface GameSettings {
  soundEnabled: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  textSize: 'small' | 'medium' | 'large';
  language: string;
}

export interface LeaderboardEntry {
  levelId: number;
  score: number;
  stars: number;
  timestamp: number;
}

/**
 * Get all level progress
 */
export async function getProgress(): Promise<Record<number, LevelProgress>> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (data) {
      return JSON.parse(data);
    }
    // Initialize with level 1 unlocked
    const initialProgress: Record<number, LevelProgress> = {
      1: {
        levelId: 1,
        completed: false,
        stars: 0,
        bestScore: 0,
        unlocked: true,
      },
    };
    await saveProgress(initialProgress);
    return initialProgress;
  } catch (error) {
    console.error('Error loading progress:', error);
    return {};
  }
}

/**
 * Save level progress
 */
export async function saveProgress(
  progress: Record<number, LevelProgress>
): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  } catch (error) {
    console.error('Error saving progress:', error);
  }
}

/**
 * Update progress for a specific level
 */
export async function updateLevelProgress(
  levelId: number,
  updates: Partial<LevelProgress>
): Promise<void> {
  const progress = await getProgress();
  const current = progress[levelId] || {
    levelId,
    completed: false,
    stars: 0,
    bestScore: 0,
    unlocked: levelId === 1,
  };
  
  progress[levelId] = { ...current, ...updates };
  
  // Unlock next level if this one is completed
  if (updates.completed && updates.completed === true) {
    const nextLevelId = levelId + 1;
    if (!progress[nextLevelId]) {
      progress[nextLevelId] = {
        levelId: nextLevelId,
        completed: false,
        stars: 0,
        bestScore: 0,
        unlocked: true,
      };
    } else {
      progress[nextLevelId].unlocked = true;
    }
  }
  
  await saveProgress(progress);
}

/**
 * Get game settings
 */
export async function getSettings(): Promise<GameSettings> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (data) {
      return JSON.parse(data);
    }
    // Default settings
    const defaultSettings: GameSettings = {
      soundEnabled: true,
      difficulty: 'medium',
      textSize: 'medium',
      language: 'en',
    };
    await saveSettings(defaultSettings);
    return defaultSettings;
  } catch (error) {
    console.error('Error loading settings:', error);
    return {
      soundEnabled: true,
      difficulty: 'medium',
      textSize: 'medium',
      language: 'en',
    };
  }
}

/**
 * Save game settings
 */
export async function saveSettings(settings: GameSettings): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (error) {
    console.error('Error saving settings:', error);
  }
}

/**
 * Get leaderboard entries
 */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (data) {
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error loading leaderboard:', error);
    return [];
  }
}

/**
 * Add entry to leaderboard
 */
export async function addLeaderboardEntry(
  entry: LeaderboardEntry
): Promise<void> {
  try {
    const leaderboard = await getLeaderboard();
    leaderboard.push(entry);
    // Sort by score descending and keep top 50
    leaderboard.sort((a, b) => b.score - a.score);
    const topEntries = leaderboard.slice(0, 50);
    await AsyncStorage.setItem(
      STORAGE_KEYS.LEADERBOARD,
      JSON.stringify(topEntries)
    );
  } catch (error) {
    console.error('Error saving leaderboard entry:', error);
  }
}

/**
 * Export progress as JSON (for backup/sharing)
 */
export async function exportProgress(): Promise<string> {
  const progress = await getProgress();
  const settings = await getSettings();
  const leaderboard = await getLeaderboard();
  
  return JSON.stringify(
    {
      progress,
      settings,
      leaderboard,
      exportDate: new Date().toISOString(),
    },
    null,
    2
  );
}

/**
 * Reset all progress
 */
export async function resetProgress(): Promise<void> {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.PROGRESS);
    await AsyncStorage.removeItem(STORAGE_KEYS.LEADERBOARD);
    // Keep settings
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
}

