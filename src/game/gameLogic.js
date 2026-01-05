function revealCard(board, id) {
    document.getElementById('board').children[id].classList.remove('is-hidden');
    board[id].isFlipped = true;
}

export { revealCard };