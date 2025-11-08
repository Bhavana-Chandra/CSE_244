# Rights vs. Duties Challenge

A cross-platform mobile mini-game built with Expo React Native that helps players learn about constitutional rights and their corresponding duties through an engaging drag-and-drop matching game.

## 🎮 Overview

Rights vs. Duties Challenge is an educational game where players match constitutional rights with their corresponding duties. The game features multiple difficulty levels, scoring, hints, and a practice mode to help learners understand the balance between rights and responsibilities in a democratic society.

## ✨ Features

- **Drag-and-Drop Matching**: Intuitive gameplay where players drag rights cards onto duty targets
- **Multiple Difficulty Levels**: Easy, Medium, and Hard levels with varying complexity
- **Scoring System**: Earn points for correct matches, lose points for incorrect attempts
- **Hints System**: Get help when stuck (costs points)
- **Practice Mode**: Learn at your own pace with explanations for each pair
- **Progress Tracking**: Save your progress and unlock new levels
- **Star Ratings**: Earn 1-3 stars based on your performance
- **Timer**: Optional timer for Medium and Hard levels
- **Accessibility**: Support for large text sizes and screen readers
- **Beautiful UI**: Warm beige/off-white theme with golden highlights

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Emulator, or Expo Go app on your phone

### Installation

1. Navigate to the project directory:
   ```bash
   cd RightsVsDutiesChallenge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npm start
   # or
   expo start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Scan the QR code with Expo Go app on your phone

### Running Tests

```bash
npm test
```

### Linting and Formatting

```bash
# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## 📁 Project Structure

```
RightsVsDutiesChallenge/
├── App.tsx                 # Main app entry point
├── app.json                # Expo configuration
├── package.json            # Dependencies and scripts
├── assets/                 # Images, sounds, and other assets
│   ├── correct.wav        # Sound effect for correct matches
│   ├── incorrect.wav      # Sound effect for incorrect matches
│   └── background-beige.png # Background image
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── DraggableCard.tsx
│   │   ├── DropTarget.tsx
│   │   ├── StarRating.tsx
│   │   └── ConfettiEffect.tsx
│   ├── screens/            # Screen components
│   │   ├── SplashScreen.tsx
│   │   ├── MainMenu.tsx
│   │   ├── LevelSelect.tsx
│   │   ├── GameScreen.tsx
│   │   ├── ResultScreen.tsx
│   │   ├── PracticeMode.tsx
│   │   ├── SettingsScreen.tsx
│   │   └── AboutScreen.tsx
│   ├── data/               # Game data
│   │   └── levels.json     # Level definitions
│   ├── styles/              # Styling
│   │   └── theme.ts         # Design tokens and theme
│   ├── utils/              # Utility functions
│   │   ├── matchingLogic.ts # Core matching logic
│   │   ├── storage.ts       # AsyncStorage utilities
│   │   └── __tests__/       # Unit tests
│   └── i18n/                # Internationalization
│       └── en.json          # English translations
└── README.md
```

## 🎨 Customization

### Changing the Background

To customize the background to match other games:

1. **Replace the background image**:
   - Place your custom background image in `assets/background-beige.png`
   - The image should be a subtle beige gradient matching the theme

2. **Update theme colors**:
   - Edit `src/styles/theme.ts`
   - Modify the `colors.background` values to match your desired palette:
     ```typescript
     background: {
       primary: '#FDFBF5',    // Main background
       secondary: '#FFFDF7',  // Card container background
       card: '#FFFFFF',       // Individual card background
     }
     ```

### Adding New Levels

Levels are defined in `src/data/levels.json`. To add a new level:

1. Open `src/data/levels.json`
2. Add a new level object following this structure:

```json
{
  "id": 4,
  "name": "Level 4: Advanced Concepts",
  "difficulty": "hard",
  "pairs": [
    {
      "right": {
        "id": "r15",
        "title": "Right Title",
        "article": "Article Number",
        "icon": "icon-name"
      },
      "duty": {
        "id": "d15",
        "title": "Duty Title",
        "icon": "icon-name"
      },
      "explanation": "Educational explanation linking the right to the duty"
    }
  ],
  "distractors": [
    {
      "id": "dist4",
      "title": "Distractor Duty",
      "icon": "icon-name"
    }
  ],
  "timeLimit": 60,
  "hints": 1
}
```

3. The level will automatically appear in the level select screen

### Design Tokens

All design tokens are centralized in `src/styles/theme.ts`. This ensures consistent styling across the app:

- **Colors**: Background, text, accent colors
- **Spacing**: 8px base unit scale (xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px)
- **Border Radius**: Consistent rounded corners (sm: 8px, md: 12px, lg: 16px, xl: 24px)
- **Shadows**: Subtle elevation effects
- **Typography**: Font sizes and weights

## 🎯 Game Mechanics

### Scoring

- **Correct Match**: +100 points
- **Incorrect Attempt**: -10 points
- **Hint Used**: -50 points
- **Time Bonus**: +2 points per second remaining (Medium/Hard levels)

### Stars

Stars are awarded based on final score:
- **3 Stars**: Score ≥ 90% of base score
- **2 Stars**: Score ≥ 70% of base score
- **1 Star**: Score < 70% of base score

### Difficulty Levels

- **Easy**: 3 pairs, no timer, 3 hints, explanatory popups
- **Medium**: 5 pairs, 90s timer, 2 hints
- **Hard**: 6 pairs, 60s timer, 1 hint, distractors included

## 🔧 Configuration

### Settings

The app supports the following settings (stored locally with AsyncStorage):

- **Sound**: Enable/disable sound effects
- **Difficulty**: Default difficulty preference
- **Text Size**: Small, Medium, Large (accessibility)
- **Language**: Placeholder for future i18n support

### Persistence

Game progress is stored locally using AsyncStorage:
- Level completion status
- Stars earned per level
- Best scores
- Settings preferences
- Leaderboard entries

## 🧪 Testing

The project includes unit tests for the core matching logic:

```bash
npm test
```

Tests are located in `src/utils/__tests__/matchingLogic.test.ts`.

## 📱 Building for Production

### iOS

```bash
expo build:ios
```

### Android

```bash
expo build:android
```

Or use EAS Build (recommended):

```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## 🌍 Internationalization

The app is structured to support multiple languages:

1. Translation files are in `src/i18n/`
2. Currently supports English (`en.json`)
3. To add a new language:
   - Create `src/i18n/[language-code].json`
   - Add translations following the structure in `en.json`
   - Update the language selector in Settings (when implemented)

## 🐛 Troubleshooting

### Common Issues

1. **Sound files not playing**: The placeholder sound files need to be replaced with actual WAV files
2. **Metro bundler cache issues**: Run `expo start -c` to clear cache
3. **TypeScript errors**: Run `npm install` to ensure all dependencies are installed

## 📄 License

This project is created for educational purposes.

## 🙏 Credits

- Built with Expo and React Native
- Design inspired by casual educational mobile games
- Content based on constitutional rights and duties

## 📞 Support

For issues, questions, or contributions, please refer to the project repository.

---

**Enjoy learning about rights and duties! 🎓**

