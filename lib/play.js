
import {
  advancePlayer,
  createGameOver,
  results,
  getPlayerView,
  executePlay,
  removeIfWinner
} from './helpers';

const gameOver = createGameOver();

export default function play(state) {
  advancePlayer(state);

  if (gameOver(state)) return results(state);

  state.players.forEach((strategy, playerIdx) => {
    const playerView = getPlayerView(state, playerIdx);
    const isPlaying = (playerIdx === state.player);
    const play = strategy(isPlaying, playerView);

    if (isPlaying) {
      executePlay(state, play, playerIdx);
      removeIfWinner(state, playerIdx);
    }
  });

  return play(state);
}
