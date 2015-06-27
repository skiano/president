
import {REVERSE_VALUE, CLEAR_VALUE} from '../constants';

import {
  previousCard,
  currentCard,
  getValue
} from './';

export function shouldSkip(history) {
  return getValue(currentCard(history)) === getValue(previousCard(history));
}

export function shouldClear(history) {
  return getValue(currentCard(history)) === CLEAR_VALUE;
}

export function shouldReverse(history) {
  return getValue(currentCard(history)) === REVERSE_VALUE;
}

export function advance(idx, size, distance) {
  idx = (idx + distance);
  return idx >= 0 ? idx % size : size - (Math.abs(idx+1) % size) - 1;
}

export default function next(state) {
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
