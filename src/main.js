import { generateBoard, generateBoardUI } from  "./ui/boardUI.js";

console.log("Board UI generated.");
let boardData = generateBoard("small");
generateBoardUI(boardData);
console.log(boardData);