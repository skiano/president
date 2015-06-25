
export function shuffle(numberOfPlayers) {
  return Array.from(new Array(numberOfPlayers), (a, idx) => {
    return [idx];
  })
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
