import { shuffle } from "../utils/shuffle.js";
import { revealCard } from "../game/gameLogic.js";

const emojis = [ "👍", "🌈", "❤️", "⚠️", "🚚", "🏞️", "🥑", "🍎", "🎯", "👀", "☀️", "🧠"];

function generateBoard(size) {
    const boardData = [];
    if (size == "small") {
        for (let i = 0; i < 8; i++) {
            console.log("Generating small board cell:", i);
            boardData[i] = {};
            boardData[i].id = i;
            boardData[i].value = emojis[i];
            boardData[i].isFlipped = false;
            boardData[i].isMatched = false;
        }
    }
    const boardDataDuplicated = [...boardData, ...boardData];
    const shuffledBoardData = shuffle(boardDataDuplicated);
    console.log("Shuffled Board Data:", shuffledBoardData);
    return shuffledBoardData;
}

function generateBoardUI(BoardData) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    BoardData.forEach((cellData, index) => {
        const cell = document.createElement('div');
        cell.innerHTML = cellData.value;
        cell.className = `card is-hidden`;
        cell.dataset.index = cellData.id;
        cell.addEventListener('click', () => {revealCard(BoardData, cellData.id)});
        boardElement.appendChild(cell);
    });
}

export { generateBoard, generateBoardUI };
