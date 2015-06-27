
import {
  advancePlayer,
  gameOver,
  currentCard,
  removeFromHand,
  hasWon,
  isVallidPlay,
  recordEvent,
  currentPlayer
} from './helpers';

export default function play(state) {
  if (state.gameLength === 0) recordEvent(state, true);

  advancePlayer(state);

  if (gameOver(state)) {
    console.log('whhhhh')
    return {
      winner: state.rank[0],
      rank: state.rank,
      events: state.events
    };
  }

  state.players.forEach((strategy, idx) => {
    const isPlaying = (idx === state.player);
    const copiedPlayerHand = Array.from(state.hands[idx]); // make clone ?
    const playerState = {
      table: currentCard(state.history),
      hand: copiedPlayerHand,
      players: state.players.length,
      testPlay: function () {}
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
      recordEvent(state, playedCards, finished);

      if (finished) {
        state.rank.push(currentPlayer(state));
        state.players.splice(idx, 1);
        state.hands.splice(idx, 1);
      }
    } else {
      strategy(false, playerState);
    }
  });
  
  state.gameLength += 1;

  return play(state);
}

