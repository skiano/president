
export default function lowestSingle(isPlaying, state) {
  if (isPlaying) {
    state.hand.sort(function (a,b) {
      return parseInt(a) < parseInt(b);
    });
    return lowestValidSingle(state.hand, state.table);
  }
}

function lowestValidSingle(hand, table) {
  var play = hand.pop();
  if (parseInt(play) >= parseInt(table)) {
    return play;
  } else if (hand.length > 0) {
    return lowestValidSingle(hand, table);
  } else {
    return false;
  }
}