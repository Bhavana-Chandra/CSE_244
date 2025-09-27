# Samvidhan Spin & Learn

## Overview
"Samvidhan Spin & Learn" is an interactive educational game designed to help players learn about various articles of the Indian Constitution in a fun and engaging way. Players spin a colorful wheel, answer questions related to the articles, and earn coins based on their performance.

## Features
- Colorful spin wheel with 15 unique slices, each representing an article.
- Dynamic loading of articles from a JSON file.
- Popup display with article details, explanations, and multiple-choice questions.
- Scoreboard to track total coins earned.
- Confetti animation and rewards for correct answers.
- Option to play again with a new set of articles.

## Project Structure
```
samvidhan-spin-and-learn
├── src
│   ├── components
│   │   ├── SpinWheel.tsx
│   │   ├── Popup.tsx
│   │   ├── ScoreBoard.tsx
│   │   └── PlayAgainButton.tsx
│   ├── data
│   │   └── articles.json
│   ├── assets
│   │   ├── styles.css
│   │   └── rewards
│   │       ├── reward1.svg
│   │       ├── reward2.svg
│   │       └── reward3.svg
│   ├── animations
│   │   └── confetti.json
│   ├── utils
│   │   └── helpers.ts
│   ├── App.tsx
│   └── index.tsx
├── public
│   └── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd samvidhan-spin-and-learn
   ```
3. Install the dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and go to `http://localhost:3000` to play the game.

## Gameplay Instructions
- Spin the wheel to select an article.
- Read the article details in the popup and choose the correct answer from the multiple-choice options.
- Earn coins for correct answers and see your total score on the scoreboard.
- Click the "Play Again" button to reset the game and load a new set of articles.

## Contributing
Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.