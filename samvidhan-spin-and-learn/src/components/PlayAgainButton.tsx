import React from 'react';

interface PlayAgainButtonProps {
    onPlayAgain: () => void;
}

const PlayAgainButton: React.FC<PlayAgainButtonProps> = ({ onPlayAgain }) => {
    return (
        <button 
            className="play-again-button" 
            onClick={onPlayAgain}
        >
            Play Again
        </button>
    );
};

export default PlayAgainButton;