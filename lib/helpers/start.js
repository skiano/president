
import shuffleArray from './shuffle';
import {START_CARD, PLAYER_PREFIX} from '../constants';
import {hasCard} from './';

export function makeDeck() {
  let deck = [];
  ['s', 'c', 'h', 'd'].forEach(function (suit) {
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

export function getPlayerId(playerFn, idx) {
  let name = playerFn.toString();
  name = name.substr('function '.length);
  name = name.substr(0, name.indexOf('('));
  name = playerFn.playerId || name || PLAYER_PREFIX;
  return name + ' ' + idx;
}

export function wrapPlayers(players) {
  return players.map((playerCreator, idx) => {
    let name = getPlayerId(playerCreator, idx);

    const playerFn = playerCreator(function setName(n) {
      name = n + ' ' + idx;
    });

    const wrapped = function (isPlaying, state) {
      return playerFn(isPlaying, state);
    };
    wrapped.playerId = name;
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
