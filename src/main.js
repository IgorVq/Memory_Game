import { getDifficultyConfig } from "./game/gameConfig.js";
import { startGame, flipCard, evaluateFlipped, concealMismatched } from "./game/gameLogic.js";
import { renderBoard, revealCard, concealCard, markMatched, setBoardLocked } from "./ui/boardUI.js";
import { createStatsUI } from "./ui/statsUI.js";

const boardElement = document.getElementById("board");
const difficultyButtons = document.querySelectorAll(".controls .button");
const statsUI = createStatsUI();

let currentState = null;
let currentDifficulty = "easy";
let hideTimeoutId = null;

const difficultyOrder = ["easy", "medium", "hard"];

const startNewGame = (difficultyKey) => {
    const config = getDifficultyConfig(difficultyKey);
    const pairCount = (config.rows * config.cols) / 2;
    currentDifficulty = difficultyKey;
    if (hideTimeoutId) {
        clearTimeout(hideTimeoutId);
    }
    statsUI.reset();
    currentState = startGame(pairCount);
    renderBoard(boardElement, currentState.cards, config.cols, handleCardClick);
};

const handleCardClick = (index) => {
    if (!currentState) {
        return;
    }
    const didFlip = flipCard(currentState, index);
    if (!didFlip) {
        return;
    }
    if (currentState.flippedCards.length === 1) {
        statsUI.startTimer();
    }
    revealCard(boardElement, index);
    const evaluation = evaluateFlipped(currentState);
    if (!evaluation) {
        return;
    }
    statsUI.setMoves(evaluation.moves);
    if (evaluation.type === "match") {
        evaluation.indices.forEach((matchedIndex) => markMatched(boardElement, matchedIndex));
        if (evaluation.isFinished) {
            statsUI.stopTimer();
            statsUI.showGameOver();
        }
        return;
    }
    if (evaluation.type === "mismatch") {
        setBoardLocked(boardElement, true);
        hideTimeoutId = setTimeout(() => {
            concealMismatched(currentState, evaluation.indices);
            evaluation.indices.forEach((mismatchIndex) => concealCard(boardElement, mismatchIndex));
            setBoardLocked(boardElement, false);
        }, 1000);
    }
};

difficultyButtons.forEach((button, index) => {
    const difficultyKey = difficultyOrder[index] || "easy";
    button.addEventListener("click", () => startNewGame(difficultyKey));
});

statsUI.bindReplay(() => startNewGame(currentDifficulty));
startNewGame(currentDifficulty);
