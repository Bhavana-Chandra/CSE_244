import React, { useState } from 'react';
import SpinWheel from './components/SpinWheel';
import Popup from './components/Popup';
import ScoreBoard from './components/ScoreBoard';
import PlayAgainButton from './components/PlayAgainButton';
import articlesData from './data/articles.json';

const App = () => {
    const [coins, setCoins] = useState(0);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [articles, setArticles] = useState(getRandomArticles());

    function getRandomArticles() {
        // Logic to randomize and select 15 articles from articlesData
        const shuffled = articlesData.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 15);
    }

    const handleSpinResult = (article) => {
        setSelectedArticle(article);
        setIsPopupVisible(true);
    };

    const handleCorrectAnswer = () => {
        setCoins(coins + 50);
        // Trigger confetti animation
        setIsPopupVisible(false);
        setArticles(getRandomArticles());
    };

    const handleIncorrectAnswer = () => {
        setCoins(coins + 10);
        setIsPopupVisible(false);
    };

    const handlePlayAgain = () => {
        setArticles(getRandomArticles());
        setCoins(0);
        setSelectedArticle(null);
        setIsPopupVisible(false);
    };

    return (
        <div className="app">
            <ScoreBoard coins={coins} />
            <SpinWheel onSpinResult={handleSpinResult} articles={articles} />
            {isPopupVisible && (
                <Popup 
                    article={selectedArticle} 
                    onCorrect={handleCorrectAnswer} 
                    onIncorrect={handleIncorrectAnswer} 
                />
            )}
            <PlayAgainButton onPlayAgain={handlePlayAgain} />
        </div>
    );
};

export default App;