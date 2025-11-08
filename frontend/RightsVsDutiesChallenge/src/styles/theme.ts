/**
 * Design tokens for Rights vs. Duties Challenge
 * 
 * This theme ensures consistent styling across the app and matches
 * the visual style of other casual educational mobile games.
 * 
 * Colors: Warm beige/off-white backgrounds, dark brown text, 
 * golden-yellow highlights, green action buttons
 */

export const theme = {
  colors: {
    // Background colors
    background: {
      primary: '#FDFBF5', // Very light warm beige
      secondary: '#FFFDF7', // Slightly darker beige for cards
      card: '#FFFFFF', // Off-white for individual cards
    },
    
    // Text colors
    text: {
      primary: '#5C4B3F', // Warm dark brown
      secondary: '#8B7355', // Lighter brown for secondary text
      light: '#A89B8F', // Light brown for hints/disabled
    },
    
    // Accent colors
    accent: {
      gold: '#E8C547', // Golden-yellow for connectors and highlights
      green: '#8DCB6F', // Light green for action buttons
      greenDark: '#4A7C3F', // Dark green for icons
      greenLight: '#A8D88D', // Light green for back buttons
      red: '#E57373', // Subtle red for incorrect attempts
      redDark: '#C62828', // Darker red for errors
    },
    
    // Status colors
    status: {
      correct: '#4CAF50',
      incorrect: '#F44336',
      warning: '#FF9800',
      info: '#2196F3',
    },
  },
  
  // Spacing scale (8px base unit)
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  
  // Typography
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold' as const,
      lineHeight: 40,
    },
    h2: {
      fontSize: 24,
      fontWeight: 'bold' as const,
      lineHeight: 32,
    },
    h3: {
      fontSize: 20,
      fontWeight: '600' as const,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 24,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 20,
    },
    button: {
      fontSize: 18,
      fontWeight: '600' as const,
      lineHeight: 24,
    },
  },
  
  // Animation durations (in milliseconds)
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
};

export type Theme = typeof theme;

