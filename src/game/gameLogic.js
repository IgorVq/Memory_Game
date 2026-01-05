function userClick(board, id, index) {
    document.getElementById('board').children[index].classList.remove('is-hidden');
    board[id].isFlipped = true;
}

export { userClick };