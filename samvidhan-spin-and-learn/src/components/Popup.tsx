import React from 'react';

interface PopupProps {
    articleNumber: number;
    title: string;
    explanation: string;
    example: string;
    options: string[];
    onClose: () => void;
    onAnswer: (answer: string) => void;
}

const Popup: React.FC<PopupProps> = ({ articleNumber, title, explanation, example, options, onClose, onAnswer }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Article {articleNumber}: {title}</h2>
                <p>{explanation}</p>
                <p><strong>Real-life Example:</strong> {example}</p>
                <div className="options">
                    {options.map((option, index) => (
                        <button key={index} onClick={() => onAnswer(option)}>
                            {option}
                        </button>
                    ))}
                </div>
                <button className="close-button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Popup;