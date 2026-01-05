function createGameState(cards) {
    return {
        cards,
        flippedCards: [],
        moves: 0,
        startTime: null,
        status: "ready",
    };
}

export { createGameState };
