
import {
  shuffle,
  hasCard,
  removeCard,
} from './helpers';

export default function deal(players) {
  let player;
  let hands = shuffle(players.length);
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
    history,
    hands,
    strategies,
    direction: 1,
    passCount: 0
  };
}
