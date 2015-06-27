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

To play the game, you create a player function that expresses your strategy. This function will be called each time an event is going to happen in the game. When the event is your turn, you return a 'move'. See more about this below.

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

