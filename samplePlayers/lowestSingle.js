
// import {getValue} from '../lib/helpers';

export default function createPlayer(setName) {
  setName('lowestSingle');

  return function highestValid(isPlaying, state) {
    if (isPlaying) {
      var plays = state.getUniqueValidPlays();
      return plays[plays.length - 1];
    }
  };
}
