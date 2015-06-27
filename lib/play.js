
import {MAX_LENGTH} from './constants';

import {
  createGameOver,
  execute,
  results,
  view,
  next
} from './helpers';

const gameOver = createGameOver(MAX_LENGTH);

export default function play(state) {
  next(state);

  if (gameOver(state)) return results(state);

  state.players.forEach((strategy, playerIdx) => {
    const playerView = view(state, playerIdx);
    const isPlaying = (playerIdx === state.player);
    const cards = strategy(isPlaying, playerView);
    
    if (isPlaying) execute(state, cards);
  });

  return play(state);
}
