
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

export function getValue(card) {
  return parseInt(card);
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

export function currentCard(history) {
  return history[history.length - 1];
}

export function previousCard(history) {
  return history[history.length - 2];
}

export function shouldSkip(history) {
  return getValue(currentCard(history)) === getValue(previousCard(history));
}

export function shouldClear(history) {
  return getValue(currentCard(history)) === 2;
}

export function shouldReverse(history) {
  return getValue(currentCard(history)) === 3;
}

export function advance(idx, size, distance) {
  idx = (idx + distance);
  return idx >= 0 ? idx % size : size - (Math.abs(idx+1) % size) - 1;
}

export function advancePlayer(state) {
  let history = state.history;
  let distance = 1;

  distance = shouldClear(history) ? 0 : distance;
  distance = shouldSkip(history) ? 2 : distance;

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
