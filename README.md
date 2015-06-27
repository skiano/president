# president

An implementation of the cardgame President (AKA asshole)

## Installation

```
npm install skiano.president
```

## Usage

```javascript
var president = require('skiano.president');

// 'stateless' players
var playerA = function (isPlaying, state) {};
var playerB = function (isPlaying, state) {};

// 'stateful' players
var playerC = (function () {
  var history = [];
  return function (isPlaying, state) {
    history.push(state.table);
  }
})();

var gameResults = president(playerA, playerB, playerC); // for example [0, 1, 3, 4]
```
