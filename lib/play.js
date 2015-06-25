
const MAX_LENGTH = 4000;
let count = 0;

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

export default function play(state, winners = [], length = 0) {
  if (length === 0) logState(state, true);

  advancePlayer(state);
  
  const totalPlayers = state.strategies.length;
  
  if (gameOver(totalPlayers) || count++ > MAX_LENGTH) {
    return winners;
  }

  state.strategies.forEach((strategy, idx) => {
    const isPlaying = (idx === state.player);
    const copiedPlayerHand = Array.from(state.hands[idx]); // make clone ?
    const playerId = currentPlayer(state);
    const playerState = {
      table: currentCard(state.history),
      hand: copiedPlayerHand,
      players: totalPlayers,
      currentPlayer: playerId
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
        winners.push(playerId);
        state.strategies.splice(idx, 1);
        state.hands.splice(idx, 1);
      }
    } else {
      strategy(false, playerState);
    }
  });
  
  return play(state, winners, length + 1);
}

