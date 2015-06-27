
import {
  advancePlayer,
  gameOver,
  results,
  getPlayerView,
  executePlay,
  removeIfWinner
} from './helpers';

export default function play(state) {
  advancePlayer(state);

  if (gameOver(state)) return results(state);

  state.players.forEach((strategy, playerIdx) => {
    const playerView = getPlayerView(state, playerIdx);
    const isPlaying = (playerIdx === state.player);

    if (isPlaying) {
      const newPlay = strategy(isPlaying, playerView);
      executePlay(state, newPlay, playerIdx);
      removeIfWinner(state, playerIdx);
    } else {
      strategy(false, playerView);
    }
  });
  
  state.gameLength += 1;

  return play(state);
}

