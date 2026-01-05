const flippedCards = [];

function isGameFinished(board) {
    const allMatched = board.every(cell => cell.isMatched);
    if (allMatched) {
        console.log("Game finished! All cards matched.");
        setTimeout(() => {
            alert("Congratulations! You've matched all the cards!");
        }, 500);
    }
}

function userClick(board, id, index) {
    if (document.getElementById('board').children[index].classList.contains('is-flipped')) {
        console.log("Card already flipped:", id);
        return;
    }
    if (flippedCards.length < 2) {
        flippedCards.push({ id, index });
        document.getElementById('board').children[index].classList.add('is-flipped');
        document.getElementById('board').children[index].classList.remove('is-hidden');
        board[id].isFlipped = true;
        console.log("Card flipped:", id);
    }
    if (flippedCards.length === 2) {
        const [firstCard, secondCard] = flippedCards;
        document.getElementById('moveCount').textContent = parseInt(document.getElementById('moveCount').textContent) + 1;
        console.log(board[firstCard.index].value);
        console.log(board[secondCard.index].value);
        if (board[firstCard.index].value === board[secondCard.index].value) {
            console.log("Cards matched:", firstCard.id, secondCard.id);
            board[firstCard.id].isMatched = true;
            board[secondCard.id].isMatched = true;
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
                board[firstCard.id].isFlipped = false;
                board[secondCard.id].isFlipped = false;
                document.getElementById('board').classList.remove('no-click');
            }, 1000);
        }
        flippedCards.length = 0;
    }
    isGameFinished(board);
}

export { userClick };
