/**
 * Rights vs. Duties Challenge - Main App Entry Point
 * 
 * A cross-platform mobile mini-game (Expo React Native) where players
 * pair constitutional rights with their corresponding duties.
 */

import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { SplashScreen } from './src/screens/SplashScreen';
import { MainMenu } from './src/screens/MainMenu';
import { LevelSelect } from './src/screens/LevelSelect';
import { GameScreen } from './src/screens/GameScreen';
import { ResultScreen } from './src/screens/ResultScreen';
import { PracticeMode } from './src/screens/PracticeMode';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { AboutScreen } from './src/screens/AboutScreen';
import { theme } from './src/styles/theme';

type Screen = 
  | 'splash'
  | 'mainMenu'
  | 'levelSelect'
  | 'game'
  | 'result'
  | 'practice'
  | 'settings'
  | 'about';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedLevelId, setSelectedLevelId] = useState<number | null>(null);
  const [gameResult, setGameResult] = useState<any>(null);

  const handleSplashFinish = () => {
    setCurrentScreen('mainMenu');
  };

  const handlePlay = () => {
    setCurrentScreen('levelSelect');
  };

  const handlePractice = () => {
    setCurrentScreen('practice');
  };

  const handleLevelSelect = (levelId: number) => {
    setSelectedLevelId(levelId);
    setCurrentScreen('game');
  };

  const handleGameComplete = (result: any) => {
    setGameResult(result);
    setCurrentScreen('result');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('mainMenu');
    setSelectedLevelId(null);
    setGameResult(null);
  };

  const handleBackToLevelSelect = () => {
    setCurrentScreen('levelSelect');
    setSelectedLevelId(null);
    setGameResult(null);
  };

  const handleNextLevel = () => {
    if (selectedLevelId) {
      const nextLevelId = selectedLevelId + 1;
      setSelectedLevelId(nextLevelId);
      setCurrentScreen('game');
      setGameResult(null);
    }
  };

  const handleReplay = () => {
    if (selectedLevelId) {
      setCurrentScreen('game');
      setGameResult(null);
    }
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleAbout = () => {
    setCurrentScreen('about');
  };

  const handleLeaderboard = () => {
    // Placeholder - could navigate to a leaderboard screen
    alert('Leaderboard feature coming soon!');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {currentScreen === 'splash' && (
        <SplashScreen onFinish={handleSplashFinish} />
      )}
      
      {currentScreen === 'mainMenu' && (
        <MainMenu
          onPlay={handlePlay}
          onPractice={handlePractice}
          onLeaderboard={handleLeaderboard}
          onSettings={handleSettings}
          onAbout={handleAbout}
        />
      )}
      
      {currentScreen === 'levelSelect' && (
        <LevelSelect
          onSelectLevel={handleLevelSelect}
          onBack={handleBackToMenu}
        />
      )}
      
      {currentScreen === 'game' && selectedLevelId && (
        <GameScreen
          levelId={selectedLevelId}
          onComplete={handleGameComplete}
          onBack={handleBackToLevelSelect}
        />
      )}
      
      {currentScreen === 'result' && gameResult && (
        <ResultScreen
          result={gameResult}
          onReplay={handleReplay}
          onNextLevel={handleNextLevel}
          onBackToMenu={handleBackToMenu}
        />
      )}
      
      {currentScreen === 'practice' && (
        <PracticeMode onBack={handleBackToMenu} />
      )}
      
      {currentScreen === 'settings' && (
        <SettingsScreen onBack={handleBackToMenu} />
      )}
      
      {currentScreen === 'about' && (
        <AboutScreen onBack={handleBackToMenu} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
});

