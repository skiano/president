# president

An implementation of the cardgame President (AKA asshole)

## Installation

```
npm install skiano.president
```

## Usage

```javascript
var president = require('skiano.president');

function playerGenerator() {
  // infer information as state changes
  return function player(isPlaying, state) {
    // state.table = what card or cards are on the table
    // state.hand = what cards are you currently holding
    // state.players = how many players are still in the game
    
    if (isPlaying) {
      // return null, a single card, or an array of cards
      // you must follow the rules of the game
    }
  }
}

var players = [
  playerGenerator(),
  playerGenerator(),
  playerGenerator(),
  playerGenerator()
];

var gameResults = president(players); // for example [0, 1, 3, 4]


```
