
import {
  advancePlayer,
  createGameOver,
  results,
  getPlayerView,
  executePlay
} from './helpers';

const gameOver = createGameOver();

export default function play(state) {
  advancePlayer(state);

  if (gameOver(state)) return results(state);

  state.players.forEach((strategy, playerIdx) => {
    const playerView = getPlayerView(state, playerIdx);
    const isPlaying = (playerIdx === state.player);
    const cards = strategy(isPlaying, playerView);
    
    if (isPlaying) executePlay(state, cards);
  });

  return play(state);
}
