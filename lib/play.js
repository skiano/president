
import {
  advancePlayer,
  gameOver,
  currentCard,
  removeFromHand,
  hasWon,
  isVallidPlay,
  logState
} from './helpers';

// temp
var count = 0;

export default function play(state, winners = []) {
  logState(state);
  advancePlayer(state);
  const numberOfPlayers = state.strategies.length;
  
  if (gameOver(numberOfPlayers) || count++ > 10) {
    return winners;
  }

  state.strategies.forEach((strategy, idx) => {
    const isPlaying = idx === state.player;
    const copiedPlayerHand = Array.from(state.hands[idx]) // make clone ?
    const playerState = {
      onTheTable: currentCard(state.history),
      myHand: copiedPlayerHand,
      numberOfPlayers: numberOfPlayers,
      myPlayerIdx: idx
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

      if (hasWon(playerHand)) {
        winners.push(idx);
        state.strategies.splice(idx, 1);
        state.hands.splice(idx, 1);
      }
    } else {
      strategy(false, playerState);
    }
  });

  return play(state, winners);
}

