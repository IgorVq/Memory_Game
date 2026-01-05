import { shuffle } from "../utils/shuffle.js";
import { userClick } from "../game/gameLogic.js";

const emojis = [ "👍", "🌈", "❤️", "⚠️", "🚚", "🏞️", "🥑", "🍎", "🎯", "👀", "☀️", "🧠"];

function generateBoard(size) {
    const boardData = [];
    if (size == "small") {
        for (let i = 0; i < 8; i++) {
            console.log("Generating small board cell:", i);
            boardData[i] = {};
            boardData[i].value = emojis[i];
            boardData[i].isFlipped = false;
            boardData[i].isMatched = false;
        }
    }
    const boardDataDuplicated = boardData.flatMap((cell, i) => ([
        { ...cell, id: i * 2 },
        { ...cell, id: i * 2 + 1 },
    ]));
    console.log("Duplicated Board Data:", boardDataDuplicated);
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
        cell.addEventListener('click', () => {userClick(BoardData, cellData.id, index);});
        boardElement.appendChild(cell);
    });
}

export { generateBoard, generateBoardUI };
