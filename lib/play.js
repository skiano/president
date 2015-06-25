
import {
  shuffle,
  hasCard,
  removeCard,
  advancePlayer,
  gameOver,
  lastCard,
  removeFromHand,
  hasWon,
  isVallidPlay
} from './helpers';

function deal(players) {
  let player;
  let hands = shuffle(players.length);
  let direction = -1;
  let card = '4c';
  let history = [card];

  const strategies = players.map((p, idx) => {
    let hand = hands[idx];
    if (hasCard(hand, card)) {
      player = idx;
      removeCard(hand, card);
    }
    return p(Array.from(hands[idx]))
  });

  return {
    player,
    direction,
    history,
    hands,
    strategies
  };
}

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
      onTheTable: lastCard(state.history),
      myHand: copiedPlayerHand,
      numberOfPlayers: numberOfPlayers
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
      console.log('Table:', state.onTheTable, 'Hand:', state.myHand.join(','));
    }
    // return card, array of cards, or false
    return;
  }
}

const results = game([player, player, player, player, player]);
console.log(results);

