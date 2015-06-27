
import play from './play';
import deal from './deal';

export default function president(players) {
  return play(deal(players));
}
