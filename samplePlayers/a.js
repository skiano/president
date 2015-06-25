
export default function player(hand) {
  // what cards do you have
  // what is the card on the table
  return function(isPlaying, state) {
    if (isPlaying) {
      var play = state.myHand.pop();
      return parseInt(play) >= parseInt(state.onTheTable) ? play : null;
    }
  }
}