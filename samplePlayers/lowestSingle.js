
import {getValue} from '../lib/helpers';

export default function createPlayer(setName) {
  setName('lowestSingle');

  return function lowestSingle(isPlaying, state) {
    if (isPlaying) {
      state.hand.sort(function (a, b) {
        return parseInt(a) < parseInt(b);
      });
      return lowestValidSingle(state.hand, state.table);
    }
  };
}

function lowestValidSingle(hand, table) {
  var play = hand.pop();
  if (getValue(play) >= getValue(table)) {
    return play;
  } else if (hand.length > 0) {
    return lowestValidSingle(hand, table);
  } else {
    return false;
  }
}
