function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
}

function createStatsUI() {
    const moveCountElement = document.getElementById("moveCount");
    const timerElement = document.getElementById("timer");
    const modalElement = document.getElementById("gameOverModal");
    const finalMoveCountElement = document.getElementById("finalMoveCount");
    const finalTimeElement = document.getElementById("finalTime");
    const replayButton = document.getElementById("replayButton");

    let moves = 0;
    let elapsedSeconds = 0;
    let timerId = null;

    const updateMoveDisplay = () => {
        if (moveCountElement) {
            moveCountElement.textContent = moves.toString();
        }
    };

    const updateTimerDisplay = () => {
        if (timerElement) {
            timerElement.textContent = formatTime(elapsedSeconds);
        }
    };

    const startTimer = () => {
        if (timerId) {
            return;
        }
        timerId = setInterval(() => {
            elapsedSeconds += 1;
            updateTimerDisplay();
        }, 1000);
    };

    const stopTimer = () => {
        if (!timerId) {
            return;
        }
        clearInterval(timerId);
        timerId = null;
    };

    const reset = () => {
        stopTimer();
        moves = 0;
        elapsedSeconds = 0;
        updateMoveDisplay();
        updateTimerDisplay();
        if (modalElement) {
            modalElement.classList.add("hidden");
        }
    };

    const setMoves = (value) => {
        moves = value;
        updateMoveDisplay();
    };

    const showGameOver = () => {
        if (finalMoveCountElement) {
            finalMoveCountElement.textContent = moves.toString();
        }
        if (finalTimeElement) {
            finalTimeElement.textContent = formatTime(elapsedSeconds);
        }
        if (modalElement) {
            setTimeout(() => {
                modalElement.classList.remove("hidden");
            }, 400);
        }
    };

    const bindReplay = (handler) => {
        if (replayButton) {
            replayButton.addEventListener("click", handler);
        }
    };

    const getElapsedSeconds = () => elapsedSeconds;

    return {
        reset,
        startTimer,
        stopTimer,
        setMoves,
        showGameOver,
        bindReplay,
        getElapsedSeconds,
    };
}

export { createStatsUI };
