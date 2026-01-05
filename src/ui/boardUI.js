function renderBoard(boardElement, cards, columns, onCardClick) {
    boardElement.innerHTML = "";
    boardElement.style.gridTemplateColumns = `repeat(${columns}, 80px)`;
    cards.forEach((card, index) => {
        const cell = document.createElement("div");
        cell.innerHTML = card.value;
        cell.className = "card is-hidden";
        cell.dataset.index = card.id;
        cell.addEventListener("click", () => onCardClick(index));
        boardElement.appendChild(cell);
    });
}

function revealCard(boardElement, index) {
    const cardElement = boardElement.children[index];
    if (!cardElement) {
        return;
    }
    cardElement.classList.add("is-flipped");
    cardElement.classList.remove("is-hidden");
}

function concealCard(boardElement, index) {
    const cardElement = boardElement.children[index];
    if (!cardElement) {
        return;
    }
    cardElement.classList.remove("is-flipped");
    cardElement.classList.add("is-hidden");
}

function markMatched(boardElement, index) {
    const cardElement = boardElement.children[index];
    if (!cardElement) {
        return;
    }
    cardElement.classList.remove("is-flipped");
    cardElement.classList.add("is-matched");
}

function setBoardLocked(boardElement, isLocked) {
    boardElement.classList.toggle("no-click", isLocked);
}

export { renderBoard, revealCard, concealCard, markMatched, setBoardLocked };
