
import {
  getPlayerHand,
  currentPlayer,
  validatePlay,
  hasCard
} from './';

function removeCard(hand, card) {
  if (hasCard(hand, card)) {
    hand.splice(hand.indexOf(card), 1);
  } else {
    throw new Error('Cannot remove ' + card + ' from ' + hand);
  }
}

function removeFromHand(state, cards) {
  if (!cards.length) return;
  cards.map(card => removeCard(getPlayerHand(state), card));
}

function hasWon(state) {
  const playerHand = getPlayerHand(state);
  return playerHand.length === 0;
}

function removeWinner(state) {
  state.rank.push(currentPlayer(state));
  state.players.splice(state.player, 1);
  state.hands.splice(state.player, 1);
}

function removeIfWinner(state) {
  if (hasWon(state)) removeWinner(state);
}

function recordEvent(state, playedCards) {
  state.events.push({
    finished: hasWon(state),
    player: currentPlayer(state),
    play: playedCards,
    hand: getPlayerHand(state).join()
  });
}

export function execute(state, newPlay) {
  if (newPlay) {
    newPlay = Array.isArray(newPlay) ? newPlay : [newPlay];
  } else {
    newPlay = [];
  }
  validatePlay(state, newPlay);
  removeFromHand(state, newPlay);
  recordEvent(state, newPlay);
  removeIfWinner(state);
}
