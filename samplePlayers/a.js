
export default function lowestSingle(isPlaying, state) {
  if (isPlaying) {
    state.hand.sort(function (a,b) {
      return parseInt(a) < parseInt(b);
    });

    return tryLowest(state.hand, state.table);
    var play = state.hand.pop();
    return parseInt(play) >= parseInt(state.table) ? play : null;
  }
}

function tryLowest(hand, table) {
  var play = hand.pop();
  if (parseInt(play) >= parseInt(table)) {
    return play;
  } else if (hand.length > 0) {
    return tryLowest(hand, table);
  } else {
    return false;
  }
}