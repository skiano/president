
import shuffleArray from './shuffle';
import {MAX_LENGTH, REVERSE_VALUE, CLEAR_VALUE, PLAYER_PREFIX, START_CARD} from './constants';

export function makeDeck() {
  let deck = [];
  ['s','c','h','d'].forEach(function (suit) {
    for (let i = 2; i <= 14; i += 1) {
      deck.push(i + suit);
    }
  });
  return deck;
}

export function deal(players) {
  let idx = 0;
  let hands = new Array(players);
  const deck = shuffleArray(makeDeck());
  while (deck.length) {
    idx = (idx += 1) % players;
    hands[idx] = hands[idx] || [];
    hands[idx].push(deck.pop());
  }
  return hands;
}

export function wrapPlayers(players) {
  return players.map((playerFn, idx) => {
    const wrapped = function (isPlaying, state) {
      return playerFn(isPlaying, state);
    }
    wrapped.playerId = getPlayerId(playerFn, idx);
    return wrapped;
  });
}

export function getInitialPlayer(hands) {
  let player = 0;
  hands.forEach((hand, idx) => {
    if (hasCard(hand, START_CARD)) {
      player = idx;
    }
  });
  console.log(player);
  return player;
}

export function getValue(card) {
  card = Array.isArray(card) ? reduceMulti(card) : card;
  return parseInt(card);
}

export function hasCard(hand, card) {
  return hand.indexOf(card) !== -1;
}

export function hasCards(hand, cards) {
  let valid = true;
  cards.forEach(card => {
    valid = hasCard(hand, card);
  })
  return valid;
}

export function removeCard(hand, card) {
  if (hasCard(hand, card)) {
    hand.splice(hand.indexOf(card), 1);
  } else {
    throw new Error('Cannot remove ' + card + ' from ' + hand)
  }
}

export function removeFromHand(hand, cards) {
  if (!cards) return;
  cards = Array.isArray(cards) ? cards : [cards];
  cards.map(c => (
    removeCard(hand, c)
  ));
}

export function currentCard(history) {
  return history[history.length - 1];
}

export function previousCard(history) {
  return history[history.length - 2];
}

export function shouldSkip(history) {
  return getValue(currentCard(history)) === getValue(previousCard(history));
}

export function shouldClear(history) {
  return getValue(currentCard(history)) === CLEAR_VALUE;
}

export function shouldReverse(history) {
  return getValue(currentCard(history)) === REVERSE_VALUE;
}

export function advance(idx, size, distance) {
  idx = (idx + distance);
  return idx >= 0 ? idx % size : size - (Math.abs(idx+1) % size) - 1;
}

export function hasWon(hand) {
  return hand.length === 0;
}

export function createGameOver(max = MAX_LENGTH) {
  var calls = 0;
  return function gameOver(state) {
    if (calls > max) {
      throw new Error('[invalid] Game exceeded max length');
    } else {
      calls += 1;
      return state.players.length === 0;
    }
  }
};

export function reduceMulti(cards) {
  return cards.reduce((a, b) => (
    parseInt(a) === parseInt(b) ? parseInt(a) : 0
  ));
}

export function isSpecialCard(play) {
  const value = getValue(play);
  return value === REVERSE_VALUE || value === CLEAR_VALUE;
}

export function checkSinglePlay(onTable, play) {
  if (Array.isArray(onTable)) return false;
  return getValue(play) >= getValue(onTable);
}

export function checkMultiPlay(onTable, play) {
  if (!Array.isArray(onTable)) {
    return true;
  } else if (play.length > onTable.length) {
    return true;
  } else if (play.length < onTable.length) {
    return false;
  } else {
    return getValue(play) >= getValue(onTable);  
  }
}

export function vallidatePlay(state, playedCards, playerHand) {
  const onTable = currentCard(state.history);
  if (!isVallidPlay(onTable, playedCards, playerHand)) {
    throw new Error('Invalid Play');
  }
}

export function executePlay(state, newPlay) {
  const playerIdx = state.player;
  const playerHand = getPlayerHand(state, playerIdx);
  vallidatePlay(state, newPlay, playerHand);
  removeFromHand(playerHand, newPlay);
  addToHistory(state, newPlay, playerHand);
  recordEvent(state, newPlay, playerHand);
  removeIfWinner(state, playerIdx);
}

export function currentPlayer(state) {
  return state.players[state.player].playerId;
}

export function getPlayerId(playerFn, idx) {
  let name = playerFn.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  name = playerFn.playerId || name || PLAYER_PREFIX;
  return name + ':' + idx;
}

export function addToHistory(state, play, playerHand) {
  if (play) {
    state.history.push(play);
    state.passCount = 0;
  } else {
    state.passCount += 1;
  }
}

export function removeWinner(state, playerIdx) {
  state.rank.push(currentPlayer(state));
  state.players.splice(playerIdx, 1);
  state.hands.splice(playerIdx, 1);
}

export function removeIfWinner(state, idx) {
  const playerHand = getPlayerHand(state, idx);
  if (hasWon(playerHand)) {
    removeWinner(state, idx);
  }
}

export function recordEvent(state, playedCards, playerHand) {
  state.events.push({
    player: currentPlayer(state),
    card: playedCards ? currentCard(state.history) : null,
    finished: hasWon(playerHand)
  });
}

export function getPlayerView(state, playerIdx) {
  const copiedPlayerHand = Array.from(state.hands[playerIdx]);
  return {
    table: currentCard(state.history),
    hand: copiedPlayerHand,
    players: state.players.length,
    testPlay: function () {}
  }
}

export function getPlayerHand(state, playerIdx) {
  return state.hands[playerIdx];
}

export function results(state) {
  return {
    winner: state.rank[0],
    rank: state.rank,
    events: state.events
  };
}

export function isVallidPlay(onTable, play, hand) {
  onTable = onTable || 0;

  switch (true) {
    case !play:
      return true;

    case isSpecialCard(play):
      return true;

    case hasCard(hand, play):
      return checkSinglePlay(onTable, play);
      break;

    case Array.isArray(play) && hasCards(hand, play) && reduceMulti(play):
      return checkMultiPlay(onTable, play);
      break;

    default:
      throw new Error('Invalid play');
  }
}

export function vallidatePlay(state, playedCards, playerHand) {
  const onTable = currentCard(state.history);
  if (!isVallidPlay(onTable, playedCards, playerHand)) {
    throw new Error('Invalid Play');
  }
}

export function advancePlayer(state) {
  let history = state.history;
  let distance = 1;

  /*
   * handle special changes to game flow
   */
  distance = shouldClear(history) ? 0 : distance;
  distance = shouldSkip(history) ? 2 : distance;
  state.direction = shouldReverse(history) ? 
      state.direction * -1 : state.direction;

  /*
   * Decide who plays next
   */
  state.player = advance(
      state.player, 
      state.players.length, 
      distance * state.direction);

  /*
   * check if this round is stale
   */
  if (state.passCount >= state.players.length) {
    state.history.push(0);
  } 
}


