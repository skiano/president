# president

An implementation of the cardgame President (AKA asshole)

## Installation

```
npm install skiano.president
```

## Usage

```javascript
var president = require('skiano.president');

var playerA = function () {};
var playerB = function () {};
var playerC = function () {};

var gameResults = president(playerA, playerB, playerC);

```

#### The Player Function

A player function recieves only two arguments

```
function player(isPlaying, state) {
  if (isPlaying) {
    // it is your turn to play
    // you must look at state.hand
    // and decide which cards to play
  } else {
    // someone else is playing
  }
}
```

The state is only a snapshot of what is off the game at a gien moment. If you want to use history to inform your decisions, do something like:

```
(function playerGenerator() {
  // track whatever info you want
  return function player() {
    // use your info to play
  }
})();
```

#### The Results

```
{
  winner: 'playerB',
  rank: ['playerB','playerC,'playerA'],
  events: [
   {player: 'playerA', card: '4c', finished: false},
   {player: 'playerB', card: '9h', finished: false}
   {player: 'playerC', card: ['11d', '11s'], finished: false}
   ... more events
   {player: 'playerA', card: '7h', finished: true},
  ]
}
```
