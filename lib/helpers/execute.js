
import {
  getPlayerHand,
  currentPlayer,
  validatePlay,
  currentCard,
  hasCard
} from './';

export function execute(state, newPlay) {
  validatePlay(state, newPlay);
  removeFromHand(state, newPlay);
  addToHistory(state, newPlay);
  recordEvent(state, newPlay);
  removeIfWinner(state);
}

export function removeCard(hand, card) {
  if (hasCard(hand, card)) {
    hand.splice(hand.indexOf(card), 1);
  } else {
    throw new Error('Cannot remove ' + card + ' from ' + hand)
  }
}

export function removeFromHand(state, cards) {
  const hand = getPlayerHand(state);
  if (!cards) return;
  cards = Array.isArray(cards) ? cards : [cards];
  cards.map(c => (
    removeCard(hand, c)
  ));
}

export function hasWon(hand) {
  return hand.length === 0;
}

export function addToHistory(state, play) {
  if (play) {
    state.history.push(play);
    state.passCount = 0;
  } else {
    state.passCount += 1;
  }
}

export function removeWinner(state) {
  state.rank.push(currentPlayer(state));
  state.players.splice(state.player, 1);
  state.hands.splice(state.player, 1);
}

export function removeIfWinner(state) {
  const playerHand = getPlayerHand(state);
  if (hasWon(playerHand)) {
    removeWinner(state);
  }
}

export function recordEvent(state, playedCards) {
  const hand = getPlayerHand(state);
  state.events.push({
    player: currentPlayer(state),
    play: playedCards ? currentCard(state.history) : null,
    hand: hand.join(),
    finished: hasWon(hand)
  });
}
