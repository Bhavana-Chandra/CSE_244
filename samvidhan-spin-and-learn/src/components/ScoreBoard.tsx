import React from 'react';

interface ScoreBoardProps {
    totalCoins: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ totalCoins }) => {
    return (
        <div className="scoreboard">
            <h2 style={{ color: 'white' }}>Total Coins: {totalCoins}</h2>
        </div>
    );
};

export default ScoreBoard;