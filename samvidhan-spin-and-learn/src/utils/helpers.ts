// This file contains utility functions for the Samvidhan Spin & Learn game.

export const getRandomArticles = (articles, count) => {
    const shuffled = articles.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const updateScore = (currentScore, isCorrect) => {
    return isCorrect ? currentScore + 50 : currentScore + 10;
};