import { EMOJIS } from "./gameConfig.js";
import { createGameState } from "./gameState.js";
import { shuffle } from "../utils/shuffle.js";

function createCards(pairCount) {
    const available = EMOJIS.slice(0, pairCount);
    const cards = available.flatMap((value, index) => ([
        { id: index * 2, value, isFlipped: false, isMatched: false },
        { id: index * 2 + 1, value, isFlipped: false, isMatched: false },
    ]));
    return shuffle(cards);
}

function startGame(pairCount) {
    return createGameState(createCards(pairCount));
}

function canFlipCard(state, index) {
    const card = state.cards[index];
    if (!card || card.isMatched || card.isFlipped) {
        return false;
    }
    if (state.flippedCards.length >= 2) {
        return false;
    }
    return true;
}

function flipCard(state, index) {
    if (!canFlipCard(state, index)) {
        return false;
    }
    state.cards[index].isFlipped = true;
    state.flippedCards.push(index);
    return true;
}

function evaluateFlipped(state) {
    if (state.flippedCards.length < 2) {
        return null;
    }
    const [firstIndex, secondIndex] = state.flippedCards;
    state.moves += 1;
    const firstCard = state.cards[firstIndex];
    const secondCard = state.cards[secondIndex];
    if (firstCard.value === secondCard.value) {
        firstCard.isMatched = true;
        secondCard.isMatched = true;
        state.flippedCards = [];
        return {
            type: "match",
            indices: [firstIndex, secondIndex],
            moves: state.moves,
            isFinished: isGameFinished(state),
        };
    }
    return {
        type: "mismatch",
        indices: [firstIndex, secondIndex],
        moves: state.moves,
    };
}

function concealMismatched(state, indices) {
    indices.forEach((index) => {
        state.cards[index].isFlipped = false;
    });
    state.flippedCards = [];
}

function isGameFinished(state) {
    return state.cards.every((card) => card.isMatched);
}

export { startGame, flipCard, evaluateFlipped, concealMismatched, isGameFinished };
