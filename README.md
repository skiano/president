# president

An implementation of the cardgame President (AKA asshole)

## Installation

```
npm install skiano.president
```

### The President Function

```president``` is a function that takes players as inputs (functions that describe strategy), and returns the results of a single game with those players.

```javascript
var president = require('skiano.president');

var playerA = function () {};
var playerB = function () {};
var playerC = function () {};

var gameResults = president(playerA, playerB, playerC);

```

### The Player Function

To play the game, you create a player function that expresses your strategy. This function will be called for each game event. When it is your turn you may return cards from your hand. (more on this below)

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

_TODO: more info..._
