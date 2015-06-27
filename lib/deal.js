
import {START_CARD} from './constants';

import {
  shuffle,
  hasCard,
  removeCard,
  getPlayerId,
  executePlay
} from './helpers';

export default function deal(playerFunctions) {
  let player;
  let hands = shuffle(playerFunctions.length);

  const players = playerFunctions.map((playerFn, idx) => {
    let hand = hands[idx];
    const wrapped = function (isPlaying, state) {
      return playerFn(isPlaying, state);
    }
    wrapped.playerId = getPlayerId(playerFn, idx);
    if (hasCard(hand, START_CARD)) {
      player = idx;
    }
    return wrapped;
  });

  let initialState = {
    direction: 1,
    passCount: 0,
    gameLength: 0,
    history: [],
    rank: [],
    events: [],
    player,
    hands,
    players
  }

  executePlay(initialState, START_CARD, player);

  // play the first card

  return initialState;
}
