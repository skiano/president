
import {currentCards} from './';

export function view(state, playerIdx) {
  const copiedPlayerHand = Array.from(state.hands[playerIdx]);
  return {
    table: currentCards(state),
    hand: copiedPlayerHand,
    players: state.players.length,
    testPlay: function () {}
  };
}
