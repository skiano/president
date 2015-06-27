
import {REVERSE_VALUE, CLEAR_VALUE} from '../constants';

import {
  previousCard,
  currentCards,
  getValue
} from './';

export function shouldSkip(history) {
  return getValue(currentCards(history)) === getValue(previousCard(history));
}

export function shouldClear(history) {
  return getValue(currentCards(history)) === CLEAR_VALUE;
}

export function shouldReverse(history) {
  return getValue(currentCards(history)) === REVERSE_VALUE;
}

export function advance(idx, size, distance) {
  idx = (idx + distance);
  return idx >= 0 ? idx % size : size - (Math.abs(idx + 1) % size) - 1;
}

export function next(state) {
  let distance = 1;
  let history = state.history;

  distance = shouldClear(history) ? 0 : distance;
  distance = shouldSkip(history) ? 2 : distance;
  state.direction = shouldReverse(history) ?
      state.direction * -1 : state.direction;

  state.player = advance(
      state.player,
      state.players.length,
      distance * state.direction);

  if (state.passCount >= state.players.length) {
    state.history.push(0);
  }
}
