
import {
  advancePlayer,
  gameOver,
  currentCard,
  removeFromHand,
  hasWon,
  isVallidPlay,
  logState,
  currentPlayer
} from './helpers';

export default function play(state) {
  if (state.gameLength === 0) logState(state, true);
  advancePlayer(state);
  if (gameOver(state)) return state.winners;

  state.strategies.forEach((strategy, idx) => {
    const isPlaying = (idx === state.player);
    const copiedPlayerHand = Array.from(state.hands[idx]); // make clone ?
    const playerState = {
      table: currentCard(state.history),
      hand: copiedPlayerHand,
      players: state.strategies.length
    }

    if (isPlaying) {
      const playedCards = strategy(isPlaying, playerState);
      let playerHand = state.hands[idx];

      if (!isVallidPlay(state.history, playedCards, playerHand)) {
        throw new Error('Invalid Play');
      }
      
      if (playedCards) {
        removeFromHand(playerHand, playedCards);
        state.history.push(playedCards);
        state.passCount = 0;
      } else {
        state.passCount += 1;
      }

      let finished = hasWon(playerHand);
      logState(state, playedCards, finished);

      if (finished) {
        state.winners.push(currentPlayer(state));
        state.strategies.splice(idx, 1);
        state.hands.splice(idx, 1);
      }
    } else {
      strategy(false, playerState);
    }
  });
  
  state.gameLength += 1;

  return play(state);
}

