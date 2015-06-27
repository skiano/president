
import {REVERSE_VALUE, CLEAR_VALUE} from '../constants';

import {
  getPlayerHand,
  currentCards,
  getValue,
  hasCards,
  reduceMultiples,
  getValue
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

export function getValidPlays(table, hand, sortAndFilter = true) {
  let sorted = Array.from(hand).sort((a, b) => getValue(a) > getValue(b));
  let plays = [];

  sorted.forEach((card, idx) => {
    let value = getValue(card);
    let single = [card];

    /*
     * Check for multiples
     */
    let matchIdx = idx - 1, multiple;
    while (getValue(plays[matchIdx]) === value) {
      multiple = sorted.slice(matchIdx, idx + 1);
      if (isValidPlay(table, multiple, hand)) plays.push(multiple);
      matchIdx -= 1;
    }

    /*
     * Check if single is good enough
     */
    if (isSpecialCard(single)) {
      plays.push(single);
    } else if (isValidPlay(table, single, hand)) {
      plays.push(single);
    }
  });

  if (sortAndFilter) {
    return plays.sort(function (a, b) {
      return a.length > b.length || getValue(a) > getValue(b);
    }).filter(((lastValue, lastLength) =>
      cards => {
        let v = getValue(cards);
        let l = cards.length;
        let duplicate = (v === lastValue && l === lastLength);
        lastLength = l;
        lastValue = v;
        return !duplicate;
      }
    )());
  } else {
    return plays;
  }
}




