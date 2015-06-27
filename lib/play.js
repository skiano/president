
import {MAX_LENGTH} from './constants';

import {
  createGameOver,
  getPlayerView,
  executePlay,
  results
} from './helpers';

import next from './helpers/next';

const gameOver = createGameOver(MAX_LENGTH);

export default function play(state) {
  next(state);

  if (gameOver(state)) return results(state);

  state.players.forEach((strategy, playerIdx) => {
    const playerView = getPlayerView(state, playerIdx);
    const isPlaying = (playerIdx === state.player);
    const cards = strategy(isPlaying, playerView);
    
    if (isPlaying) executePlay(state, cards);
  });

  return play(state);
}
