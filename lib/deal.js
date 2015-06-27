
import {START_CARD} from './constants';

import {
  shuffle,
  executePlay,
  wrapPlayers,
  getInitialPlayer
} from './helpers';

export default function deal(playerFunctions) {
  let hands = shuffle(playerFunctions.length);

  let initialState = {
    direction: 1,
    passCount: 0,
    gameLength: 0,
    history: [],
    rank: [],
    events: [],
    players: wrapPlayers(playerFunctions),
    player: getInitialPlayer(hands),
    hands: hands
  }

  executePlay(initialState, START_CARD, initialState.player);
  return initialState;
}
