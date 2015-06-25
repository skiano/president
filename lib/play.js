
function shuffle(numberOfPlayers) {
  return Array.from(new Array(numberOfPlayers), (a, idx) => {
    return [idx];
  })
}

function hasCard(hand, card) {
  return hand.indexOf(card) !== -1;
}

function removeCard(hand, card) {
  if (hasCard(hand, card)) {
    hand.splice(hand.indexOf(card), 1);
    return hand;
  } else {
    throw new Error('Cannot remove ' + card + ' from ' + hand)
  }
}

function lastCard(history) {
  return history[history.length - 1];
}

function shouldSkip(history) {
  return false;
}

function shouldReverse(history) {
  return false;
}

function advance(idx, size, distance) {
  idx = (idx + distance) % 3;
  return idx >= 0 ? idx % size : size - (Math.abs(idx+1) % size) - 1;
}

function advancePlayer(state) {
  let history = state.history;
  let distance = shouldSkip(history) ? 2 : 1;

  state.direction = shouldReverse(history) ? 
      state.direction * -1 : state.direction;

  state.player = advance(
      state.player, 
      state.strategies.length, 
      distance * state.direction);
}

function deal(players) {
  let player;
  let hands = shuffle(players.length);
  let direction = -1;
  let card = 0;
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

function hasWon(hand) {
  return hand.length === 0;
}

function gameOver(numberOfPlayers) {
  return numberOfPlayers === 0;
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
    const copiedPlayerHand = state.hands[idx] // make clone ?
    const playerState = {
      onTheTable: lastCard(state.history),
      myHand: copiedPlayerHand,
      numberOfPlayers: numberOfPlayers
    }

    if (isPlaying) {
      const cards = strategy(isPlaying, playerState);
      let playerHand = state.hands[idx];
      
      if (cards) {
        removeFromHand(playerHand, cards);
        state.history.push(action);
      }

      if (hasWon(playerHand)) {
        winners.push(idx);
        state.strategies.splice(idx);
        state.hands.splice(idx);
      }
    } else {
      strategy(lastCard(state.history));
    }
  });

  return play(state, winners);
}

function game(players) {
  return play(deal(players));
}

// TEST IT

function player(hand) {
  // what cards do you have
  // what is the card on the table
  return function(cardOnTable, isPlaying, numberOfPlayers) {
    // return card, array of cards, or false
    return;
  }
}

var results = game([player, player, player]);

console.log(results);
