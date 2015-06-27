
import play from './play';
import setup from './setup';

export default function president(players) {
  if (arguments.length > 1) players = Array.from(arguments);
  return play(setup(players));
}
