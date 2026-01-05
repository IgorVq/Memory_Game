const flippedCards = [];

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
        console.log(board[firstCard.index].value);
        console.log(board[secondCard.index].value);
        if (board[firstCard.index].value === board[secondCard.index].value) {
            console.log("Cards matched:", firstCard.id, secondCard.id);
            board[firstCard.id].isMatched = true;
            board[secondCard.id].isMatched = true;
        } else {
            console.log("Cards did not match:", firstCard.id, secondCard.id);
            setTimeout(() => {
                document.getElementById('board').children[firstCard.index].classList.remove('is-flipped');
                document.getElementById('board').children[firstCard.index].classList.add('is-hidden');
                document.getElementById('board').children[secondCard.index].classList.remove('is-flipped');
                document.getElementById('board').children[secondCard.index].classList.add('is-hidden');
                board[firstCard.id].isFlipped = false;
                board[secondCard.id].isFlipped = false;
            }, 1000);
        }
        flippedCards.length = 0;
    }
}

export { userClick };