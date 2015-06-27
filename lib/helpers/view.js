
import {currentCard} from './';

export function view(state, playerIdx) {
  const copiedPlayerHand = Array.from(state.hands[playerIdx]);
  return {
    table: currentCard(state.history),
    hand: copiedPlayerHand,
    players: state.players.length,
    testPlay: function () {}
  };
}
