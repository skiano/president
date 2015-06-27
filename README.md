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

A player function recieves only two arguments: ```isMyTurn``` and ```myView```.

If ```isMyTurn``` is ```true```, you must return your move. See more information below.

```javascript
function player(isMyTurn, myView) {
  if (isMyTurn) {
    // it is your turn to play; return your move
  } else {
    // someone else is playing. just watch...
  }
}
```

```myView``` is only a snapshot of the game at a specific moment (limited to your perspective). No history is directly exposed. If you want to use history (ie: card counting), it is your responsibility:

```javascript
var player = (function playerGenerator() {
  // track data
  return function player(isMyTurn, myView) {
    // use data
  }
})();
```

