
import shuffleArray from './shuffle';
import {validatePlay} from './validate';
import {MAX_LENGTH, PLAYER_PREFIX, START_CARD} from '../constants';

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

export function removeFromHand(state, cards) {
  const hand = getPlayerHand(state);
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

export function executePlay(state, newPlay) {
  validatePlay(state, newPlay);
  removeFromHand(state, newPlay);
  addToHistory(state, newPlay);
  recordEvent(state, newPlay);
  removeIfWinner(state);
}

export function currentPlayer(state) {
  return state.players[state.player].playerId;
}

export function getPlayerId(playerFn, idx) {
  let name = playerFn.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  name = playerFn.playerId || name || PLAYER_PREFIX;
  return name + ' ' + idx;
}

export function addToHistory(state, play) {
  if (play) {
    state.history.push(play);
    state.passCount = 0;
  } else {
    state.passCount += 1;
  }
}

export function removeWinner(state) {
  state.rank.push(currentPlayer(state));
  state.players.splice(state.player, 1);
  state.hands.splice(state.player, 1);
}

export function removeIfWinner(state) {
  const playerHand = getPlayerHand(state);
  if (hasWon(playerHand)) {
    removeWinner(state);
  }
}

export function recordEvent(state, playedCards) {
  const hand = getPlayerHand(state);
  state.events.push({
    player: currentPlayer(state),
    play: playedCards ? currentCard(state.history) : null,
    hand: hand.join(),
    finished: hasWon(hand)
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

export function getPlayerHand(state) {
  return state.hands[state.player];
}

export function results(state) {
  return {
    winner: state.rank[0],
    rank: state.rank,
    events: state.events
  };
}
