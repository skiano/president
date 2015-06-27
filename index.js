
require("babel/register");

const game = require('./lib');
const player = require('./samplePlayers/lowestSingle');
const results = game(player, player, player, player, player, player);

// http://unix.stackexchange.com/questions/43408/printing-colored-text-using-echo
const colors = [
  '033[31m',
  '033[32m',
  '033[33m',
  '033[34m',
  '033[35m',
  '033[36m',
  '033[37m',
  '033[38m'
]

const colorEnd = '\033[0m';

results.events.forEach(function (r) {
  const player = getPlayerString(r.player);
  const sortedHand = sortHand(r.hand);
  const play = getPlay(r.play, r.finished);
  console.log(player, '|', play, '|', sortedHand);
});

function getPlay(play, finished) {
  play = play || '-';
  play = paddLeft(play)
  return finished ? (colors[0] + play + colorEnd) : play;
}

function getPlayerString(player) {
  const color = colors[results.rank.indexOf(player)];
  return color + player + colorEnd;
}

// http://stackoverflow.com/questions/2686855/is-there-a-javascript-function-that-can-pad-a-string-to-get-to-a-determined-leng
function paddLeft(str, l, char) {
  l = l || 10;
  char = char || ' ';
  const padd = char.repeat(l);
  // left
  // return (padd + str).slice(-padd.length); 
  return (str + padd).substring(0, padd.length)
}

function sortHand(hand) {
  return hand.split(',').sort(function (a, b) {
    return parseInt(a) < parseInt(b);
  }).join(' ');
}

