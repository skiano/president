
import {currentCards, getValidPlays} from './';

export function view(state, playerIdx) {
  const copiedPlayerHand = Array.from(state.hands[playerIdx]);
  const cards = currentCards(state);
  return {
    table: cards,
    hand: copiedPlayerHand,
    players: state.players.length,
    getValidPlays: () => (getValidPlays(cards, copiedPlayerHand))
  };
}
