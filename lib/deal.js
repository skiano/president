
import {START_CARD} from './constants';

import {
  shuffle,
  hasCard,
  removeCard,
  getPlayerId
} from './helpers';

export default function deal(players) {
  let player;
  let hands = shuffle(players.length);
  let card = START_CARD;
  let history = [card];

  const strategies = players.map((playerFn, idx) => {
    let hand = hands[idx];
    const wrapped = function (isPlaying, state) {
      return playerFn(isPlaying, state);
    }
    wrapped.playerId = getPlayerId(playerFn, idx);
    if (hasCard(hand, card)) {
      player = idx;
      removeCard(hand, card);
    }
    return wrapped;
  });

  return {
    direction: 1,
    passCount: 0,
    gameLength: 0,
    winners: [],
    player,
    history,
    hands,
    strategies
  };
}
