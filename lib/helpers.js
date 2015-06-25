
import shuffleArray from './shuffle';

export function makeDeck() {
  var deck = [];
  ['s','c','h','d'].forEach(function (suit) {
    for (let i = 2; i <= 14; i += 1) {
      deck.push(i + suit);
    }
  });
  return deck;
}

export function shuffle(players) {
  let idx = 0;
  let hands = new Array(players);
  const deck = shuffleArray(makeDeck());
  while (deck.length) {
    idx = (idx += 1) % players;
    hands[idx] = hands[idx] || [];
    hands[idx].push(deck.pop());
  }
  return hands;
}

export function hasCard(hand, card) {
  return hand.indexOf(card) !== -1;
}

export function removeCard(hand, card) {
  if (hasCard(hand, card)) {
    hand.splice(hand.indexOf(card), 1);
    return hand;
  } else {
    throw new Error('Cannot remove ' + card + ' from ' + hand)
  }
}

export function lastCard(history) {
  return history[history.length - 1];
}

export function shouldSkip(history) {
  return false;
}

export function shouldReverse(history) {
  return false;
}

export function advance(idx, size, distance) {
  idx = (idx + distance) % 3;
  return idx >= 0 ? idx % size : size - (Math.abs(idx+1) % size) - 1;
}

export function advancePlayer(state) {
  let history = state.history;
  let distance = shouldSkip(history) ? 2 : 1;

  state.direction = shouldReverse(history) ? 
      state.direction * -1 : state.direction;

  state.player = advance(
      state.player, 
      state.strategies.length, 
      distance * state.direction);
}

export function hasWon(hand) {
  return hand.length === 0;
}

export function gameOver(numberOfPlayers) {
  return numberOfPlayers === 0;
}

export function isVallidPlay(history, play) {
  return true;
}
