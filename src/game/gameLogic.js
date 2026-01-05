const flippedCards = [];
let timerId = null;
let elapsedSeconds = 0;
const modalElement = document.getElementById('gameOverModal');
const finalMoveCountElement = document.getElementById('finalMoveCount');
const finalTimeElement = document.getElementById('finalTime');
const replayButton = document.getElementById('replayButton');

if (replayButton) {
    replayButton.addEventListener('click', () => {
        window.location.reload();
    });
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

function updateTimerDisplay() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = formatTime(elapsedSeconds);
    }
}

function startTimer() {
    if (timerId) return;
    timerId = setInterval(() => {
        elapsedSeconds += 1;
        updateTimerDisplay();
    }, 1000);
}

function stopTimer() {
    if (!timerId) return;
    clearInterval(timerId);
    timerId = null;
}

function isGameFinished(board) {
    const allMatched = board.every(cell => cell.isMatched);
    if (allMatched) {
        console.log("Game finished! All cards matched.");
        stopTimer();
        const moveCountElement = document.getElementById('moveCount');
        if (finalMoveCountElement && moveCountElement) {
            finalMoveCountElement.textContent = moveCountElement.textContent;
        }
        if (finalTimeElement) {
            finalTimeElement.textContent = formatTime(elapsedSeconds);
        }
        if (modalElement) {
            setTimeout(() => {
                modalElement.classList.remove('hidden');
            }, 400);
        }
    }
}

function userClick(board, id, index) {
    if (document.getElementById('board').children[index].classList.contains('is-flipped')) {
        console.log("Card already flipped:", id);
        return;
    }
    if (flippedCards.length === 0) {
        startTimer();
    }
    if (flippedCards.length < 2) {
        flippedCards.push({ id, index });
        document.getElementById('board').children[index].classList.add('is-flipped');
        document.getElementById('board').children[index].classList.remove('is-hidden');
        board[index].isFlipped = true;
        console.log("Card flipped:", id);
    }
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        document.getElementById('moveCount').textContent = parseInt(document.getElementById('moveCount').textContent) + 1;
        console.log(board[firstCard.index].value);
        console.log(board[secondCard.index].value);
        if (board[firstCard.index].value === board[secondCard.index].value) {
            console.log("Cards matched:", firstCard.id, secondCard.id);
            board[firstCard.index].isMatched = true;
            board[secondCard.index].isMatched = true;
            document.getElementById('board').children[firstCard.index].classList.remove('is-flipped');
            document.getElementById('board').children[firstCard.index].classList.add('is-matched');
            document.getElementById('board').children[secondCard.index].classList.remove('is-flipped');
            document.getElementById('board').children[secondCard.index].classList.add('is-matched');

        } else {
            console.log("Cards did not match:", firstCard.id, secondCard.id);
            document.getElementById('board').classList.add('no-click');
            setTimeout(() => {
                document.getElementById('board').children[firstCard.index].classList.remove('is-flipped');
                document.getElementById('board').children[firstCard.index].classList.add('is-hidden');
                document.getElementById('board').children[secondCard.index].classList.remove('is-flipped');
                document.getElementById('board').children[secondCard.index].classList.add('is-hidden');
                board[firstCard.index].isFlipped = false;
                board[secondCard.index].isFlipped = false;
                document.getElementById('board').classList.remove('no-click');
            }, 1000);
        }
        flippedCards.length = 0;
    }
    isGameFinished(board);
}

export { userClick };
