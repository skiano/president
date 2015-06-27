
import {REVERSE_VALUE, CLEAR_VALUE} from '../constants';

import {
  getPlayerHand,
  currentCards,
  getValue,
  hasCards,
  reduceMultiples
} from './';

function checkMultiPlay(onTable, play) {
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

function isSpecialCard(play) {
  const value = getValue(play);
  return value === REVERSE_VALUE || value === CLEAR_VALUE;
}

function isValidPlay(onTable, play, hand) {
  switch (true) {
    case play.length === 0:
      return true;

    case isSpecialCard(play):
      return true;

    case !!(hasCards(hand, play) && reduceMultiples(play)):
      return checkMultiPlay(onTable, play);

    default:
      throw new Error('Invalid play');
  }
}

export function validatePlay(state, newPlay) {
  if (!isValidPlay(
      currentCards(state), newPlay, getPlayerHand(state))) {
    throw new Error('Invalid Play');
  }
}

export function getValidPlays(cards, hand) {
  console.log(cards, 'vs', hand.join());
  return [];
}
