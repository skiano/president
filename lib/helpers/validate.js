
import {REVERSE_VALUE, CLEAR_VALUE} from '../constants';

import {
  getPlayerHand,
  currentCards,
  getValue,
  hasCard,
  hasCards,
  reduceMulti
} from './';

export function checkSinglePlay(onTable, play) {
  if (Array.isArray(onTable)) return false;
  return getValue(play) >= getValue(onTable);
}

export function checkMultiPlay(onTable, play) {
  if (onTable.length === 0) {
    return true;
  } else if (play.length > onTable.length) {
    return true;
  } else if (play.length < onTable.length) {
    return false;
  } else {
    return getValue(play) >= getValue(onTable);
  }
}

export function isSpecialCard(play) {
  const value = getValue(play);
  return value === REVERSE_VALUE || value === CLEAR_VALUE;
}

export function isValidPlay(onTable, play, hand) {
  switch (true) {
    case play.length === 0:
      return true;

    case isSpecialCard(play):
      return true;

    case !!(hasCards(hand, play) && reduceMulti(play)):
      return checkMultiPlay(onTable, play);

    default:
      throw new Error('Invalid play');
  }
}

export function validatePlay(state, newPlay) {
  if (!isValidPlay(
      currentCards(state.history), newPlay, getPlayerHand(state))) {
    throw new Error('Invalid Play');
  }
}
