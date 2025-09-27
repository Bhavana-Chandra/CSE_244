import React, { useState, useEffect } from 'react';
import './styles.css';
import articlesData from '../data/articles.json';

const SpinWheel = () => {
    const [spinAngle, setSpinAngle] = useState(0);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [coins, setCoins] = useState(0);
    const [isSpinning, setIsSpinning] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleSpin = () => {
        if (!isSpinning) {
            setIsSpinning(true);
            const randomAngle = Math.floor(Math.random() * 360 + 720); // Spin at least 2 full rotations
            setSpinAngle(randomAngle);

            setTimeout(() => {
                const articleIndex = Math.floor(((randomAngle % 360) / 360) * 15);
                setSelectedArticle(articlesData[articleIndex]);
                setPopupVisible(true);
                setIsSpinning(false);
            }, 3000); // Duration of spin
        }
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setCoins(coins + 50);
            // Trigger confetti animation here
        } else {
            setCoins(coins + 10);
        }
        setPopupVisible(false);
    };

    return (
        <div className="spin-wheel-container">
            <div className="wheel" style={{ transform: `rotate(${spinAngle}deg)` }}>
                {Array.from({ length: 15 }, (_, index) => (
                    <div key={index} className={`slice slice-${index + 1}`}>
                        Article {index + 1}
                    </div>
                ))}
                <div className="pointer" />
            </div>
            <button onClick={handleSpin} disabled={isSpinning}>Spin the Wheel</button>
            {popupVisible && selectedArticle && (
                <Popup article={selectedArticle} onAnswer={handleAnswer} />
            )}
            <ScoreBoard coins={coins} />
        </div>
    );
};

export default SpinWheel;