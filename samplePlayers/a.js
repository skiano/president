
export default function player(hand) {
  // what cards do you have
  // what is the card on the table
  return function(isPlaying, state) {
    if (isPlaying) {
      console.log(state.myPlayerIdx, 'Table:', state.onTheTable, 'Hand:', state.myHand.join(','));
    }
    // return card, array of cards, or false
    return;
  }
}