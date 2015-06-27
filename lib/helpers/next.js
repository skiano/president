
import {REVERSE_VALUE, CLEAR_VALUE} from '../constants';

import {
  previousCards,
  currentCards,
  getValue
} from './';

export function shouldSkip(state) {
  return getValue(currentCards(state)) === getValue(previousCards(state));
}

export function shouldClear(state) {
  return getValue(currentCards(state)) === CLEAR_VALUE;
}

export function shouldReverse(state) {
  return getValue(currentCards(state)) === REVERSE_VALUE;
}

export function advance(idx, size, distance) {
  idx = (idx + distance);
  return idx >= 0 ? idx % size : size - (Math.abs(idx + 1) % size) - 1;
}

export function next(state) {
  let distance = 1;

  distance = shouldClear(state) ? 0 : distance;
  distance = shouldSkip(state) ? 2 : distance;
  state.direction = shouldReverse(state) ?
      state.direction * -1 : state.direction;

  state.player = advance(
      state.player,
      state.players.length,
      distance * state.direction);
}
