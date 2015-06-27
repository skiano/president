
export {deal, wrapPlayers, getInitialPlayer} from './start';
export {next} from './next';
export {view} from './view';
export {execute} from './execute';
export {validatePlay} from './validate';

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

export function currentCard(history) {
  return history[history.length - 1];
}

export function previousCard(history) {
  return history[history.length - 2];
}

export function createGameOver(max = 10) {
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

export function currentPlayer(state) {
  return state.players[state.player].playerId;
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
