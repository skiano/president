
import play from './play';
import deal from './deal';

export default function game(players) {
  return play(deal(players));
}
