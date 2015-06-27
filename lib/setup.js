
import {START_CARD} from './constants';

import {
  getInitialPlayer,
  wrapPlayers,
  execute,
  deal
} from './helpers';

export default function setup(playerFunctions) {
  let hands = deal(playerFunctions.length);

  let initialState = {
    players: wrapPlayers(playerFunctions),
    player: getInitialPlayer(hands),
    hands: hands,
    direction: 1,
    passCount: 0,
    history: [],
    events: [],
    rank: []
  }

  execute(initialState, START_CARD);
  return initialState;
}
