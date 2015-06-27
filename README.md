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

A player function recieves only two arguments: ```isPlaying``` and ```state```. If isPlaying is true, it is your turn and you must return your move. You can return one card, ```4h``` for example. Or an array of cards ```[5c,10d]```. If you cannot make a valid move return ```false```.

```javascript
function player(isPlaying, state) {
  if (isPlaying) {
    // it is your turn to play; return your move
  } else {
    // someone else is playing
  }
}
```

The state is only a snapshot of what is off the game at a gien moment. If you want to use history to inform your decisions, do something like:

```javascript
var player = (function playerGenerator() {
  // track data
  return function player(isPlaying) {
    // use data
  }
})();
```

