
import play from './play';
import deal from './deal';

export default function president(players) {
  if (arguments.length > 1) players = Array.from(arguments);
  return play(deal(players));
}
