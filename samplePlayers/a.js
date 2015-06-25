
export default (function makePlayer() {
  // what cards do you have
  // what is the card on the table
  return function(isPlaying, state) {
    if (isPlaying) {
      var play = state.hand.pop();
      return parseInt(play) >= parseInt(state.table) ? play : null;
    }
  }
})();