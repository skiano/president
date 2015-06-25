
import {
  advancePlayer,
  gameOver,
  currentCard,
  removeFromHand,
  hasWon,
  isVallidPlay
} from './helpers';

import deal from './deal';

// temp
var count = 0;

function play(state, winners = []) {
  advancePlayer(state);
  
  const numberOfPlayers = state.strategies.length;
  
  if (gameOver(numberOfPlayers) || count++ > 10) {
    console.log('end', count, winners);
    return winners;
  }

  state.strategies.forEach((strategy, idx) => {
    const isPlaying = idx === state.player;
    const copiedPlayerHand = Array.from(state.hands[idx]) // make clone ?
    const playerState = {
      onTheTable: currentCard(state.history),
      myHand: copiedPlayerHand,
      numberOfPlayers: numberOfPlayers,
      myPlayerIdx: idx
    }

    if (isPlaying) {
      const playedCards = strategy(isPlaying, playerState);
      let playerHand = state.hands[idx];

      if (!isVallidPlay(state.history, playedCards)) {
        throw new Error();
      }
      
      if (playedCards) {
        removeFromHand(playerHand, playedCards);
        state.history.push(action);
      }

      if (hasWon(playerHand)) {
        winners.push(idx);
        state.strategies.splice(idx, 1);
        state.hands.splice(idx, 1);
      }
    } else {
      strategy(false, playerState);
    }
  });

  return play(state, winners);
}

function game(players) {
  return play(deal(players));
}

// -----------------------------------------
// TEST IT
// -----------------------------------------

function player(hand) {
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

const results = game([player, player, player, player, player]);
console.log(results);

