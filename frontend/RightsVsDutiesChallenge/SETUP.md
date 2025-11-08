# Quick Setup Guide

## First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Run on your device:**
   - Install Expo Go app on your phone
   - Scan the QR code shown in the terminal
   - Or press `i` for iOS simulator / `a` for Android emulator

## Adding Sound Files

The project includes placeholder sound files. To add actual sound effects:

1. Replace `assets/correct.wav` with your correct match sound
2. Replace `assets/incorrect.wav` with your incorrect match sound
3. Uncomment the Audio import and playSound function in `src/screens/GameScreen.tsx`

## Adding Background Image

1. Create or download a beige gradient background image
2. Save it as `assets/background-beige.png`
3. The app will automatically use it (if implemented in components)

## Running Tests

```bash
npm test
```

## Building for Production

See the main README.md for detailed build instructions.

