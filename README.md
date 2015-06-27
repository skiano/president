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

A player function recieves only two arguments: ```isPlaying``` and ```state```. If ```yourTurn``` is ```true```, you must return your move. You can return one card, ```4h``` for example. Or an array of cards ```[5c,10d]```. If you cannot make a valid move return ```false```. See below for more information.

```javascript
function player(isPlaying, state) {
  if (isPlaying) {
    // it is your turn to play; return your move
  } else {
    // someone else is playing
  }
}
```

The ```state``` argument is only a snapshot of the game at a specific moment. No history is directly exposed. If you want to use history (ie: card counting) to inform your decisions, nothing is saying you cannot do something like:

```javascript
var player = (function playerGenerator() {
  // track data
  return function player(isPlaying) {
    // use data
  }
})();
```

