# Scenario Section Enhancements

## Overview
The scenario section has been enhanced with animated characters, text-to-speech audio, and interactive dialogue boxes using React + Framer Motion.

## Features

### 1. Animated Characters
- **Framer Motion Animations**: Characters animate based on their emotions (angry, sad, happy, worried, neutral)
- **Speaking Indicators**: Active speaking characters are highlighted with animations and visual indicators
- **Character Positioning**: Characters are automatically positioned (left, right, center) based on the number of characters in the scene
- **Size Variations**: Character sizes vary based on age (young, adult, elderly)

### 2. Text-to-Speech Audio
- **Browser Web Speech API**: Uses the built-in browser TTS (free, no API keys needed)
- **Character-Specific Voices**: Automatically selects appropriate voices based on:
  - Gender (male, female, child)
  - Age (young, adult, elderly)
- **Audio Controls**: Users can play, pause, and mute audio
- **Auto-play**: Audio automatically plays when dialogue appears (can be toggled)

### 3. Enhanced Dialogue Box
- **Typing Animation**: Text appears with a typing effect
- **Animated Transitions**: Smooth transitions between dialogues
- **Visual Feedback**: Speaking character name and role displayed
- **Audio Controls**: Built-in audio controls in the dialogue box

## Current Implementation

### Web Speech API (Free)
- **Pros**: 
  - Free, no API keys needed
  - Works in all modern browsers
  - No additional setup required
- **Cons**: 
  - Limited voice quality
  - Voice selection varies by browser/OS
  - May not have perfect gender/age matching

## Optional: External TTS Services

For better voice quality and more character-specific voices, you can integrate external TTS services:

### Option 1: ElevenLabs (Recommended for Quality)
- **Website**: https://elevenlabs.io
- **Features**: 
  - High-quality, natural-sounding voices
  - Multiple voice options for different characters
  - Good multilingual support
- **Setup**:
  1. Sign up at https://elevenlabs.io
  2. Get API key
  3. Install: `npm install elevenlabs`
  4. Update `useTextToSpeech.ts` to use ElevenLabs API

### Option 2: Google Cloud Text-to-Speech
- **Website**: https://cloud.google.com/text-to-speech
- **Features**:
  - High-quality voices
  - Multiple languages and accents
  - Gender and age selection
- **Setup**:
  1. Create Google Cloud project
  2. Enable Text-to-Speech API
  3. Get API key
  4. Install: `npm install @google-cloud/text-to-speech`

### Option 3: Azure Cognitive Services (Speech)
- **Website**: https://azure.microsoft.com/en-us/services/cognitive-services/text-to-speech/
- **Features**:
  - Natural-sounding voices
  - SSML support for emotions
  - Good character voice selection
- **Setup**:
  1. Create Azure account
  2. Create Speech resource
  3. Get API key and region
  4. Install: `npm install microsoft-cognitiveservices-speech-sdk`

### Option 4: Amazon Polly
- **Website**: https://aws.amazon.com/polly/
- **Features**:
  - Natural voices
  - SSML support
  - Pay-per-use pricing
- **Setup**:
  1. Create AWS account
  2. Set up IAM user with Polly permissions
  3. Get access keys
  4. Install: `npm install @aws-sdk/client-polly`

## Character Assets

### Current Assets
- `man.svg` - Male character
- `police.svg` - Police/law enforcement
- `people.svg` - Generic people (used for females/children)

### Recommended: Additional Character Assets

For better character representation, consider adding:

1. **Female Character**: 
   - Source: https://www.flaticon.com (search "woman character")
   - Or use Lottie animations from https://lottiefiles.com

2. **Child Character**:
   - Source: https://www.flaticon.com (search "child character")
   - Or use Lottie animations

3. **Animated Sprites**:
   - Consider using Lottie animations for more dynamic characters
   - Install: `npm install lottie-react`
   - Source: https://lottiefiles.com

## Usage

The enhanced scenario system works automatically with the existing scenario data structure. Characters are automatically:
- Animated based on their emotion
- Positioned based on dialogue order
- Given appropriate voices based on gender and age

## Customization

### Adjusting Animation Speed
Edit `AnimatedCharacter.tsx` to modify animation durations and effects.

### Adjusting Typing Speed
Edit `AnimatedDialogueBox.tsx` and change the `typingSpeed` constant.

### Adjusting Voice Parameters
Edit `useTextToSpeech.ts` to modify speech rate, pitch, and volume defaults.

## Browser Compatibility

- **Chrome/Edge**: Full support, best voice selection
- **Firefox**: Full support
- **Safari**: Full support on macOS/iOS
- **Mobile**: Works on iOS Safari and Android Chrome

## Future Enhancements

1. **Lottie Character Animations**: Replace static images with animated Lottie characters
2. **Background Music**: Add ambient background music for scenes
3. **Sound Effects**: Add sound effects for different actions
4. **Voice Recording**: Allow users to record custom voices
5. **Multi-language Support**: Extend TTS to support multiple languages

