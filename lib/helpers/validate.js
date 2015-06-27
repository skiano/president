
import {REVERSE_VALUE, CLEAR_VALUE} from '../constants';

import {
  getPlayerHand,
  currentCard,
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
  if (!Array.isArray(onTable)) {
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
  onTable = onTable || 0;

  switch (true) {
    case !play:
      return true;

    case isSpecialCard(play):
      return true;

    case hasCard(hand, play):
      return checkSinglePlay(onTable, play);

    case Array.isArray(play) && hasCards(hand, play) && reduceMulti(play):
      return checkMultiPlay(onTable, play);

    default:
      throw new Error('Invalid play');
  }
}

export function validatePlay(state, playedCards) {
  const onTable = currentCard(state.history);
  const playerHand = getPlayerHand(state);
  if (!isValidPlay(onTable, playedCards, playerHand)) {
    throw new Error('Invalid Play');
  }
}
