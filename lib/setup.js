
import {START_CARD} from './constants';

import {
  deal,
  executePlay,
  wrapPlayers,
  getInitialPlayer
} from './helpers';

export default function setup(playerFunctions) {
  let hands = deal(playerFunctions.length);

  let initialState = {
    direction: 1,
    passCount: 0,
    history: [],
    events: [],
    rank: [],
    players: wrapPlayers(playerFunctions),
    player: getInitialPlayer(hands),
    hands: hands
  }

  executePlay(initialState, START_CARD, initialState.player);
  return initialState;
}
