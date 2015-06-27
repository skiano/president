# president

An implementation of the cardgame [President](https://en.wikipedia.org/wiki/President_(card_game)#General_rules) (AKA asshole)

#### The Rules

_This describes the rules as implemented by this function. There are variations_

* Setup
  * All cards are dealt to players (as evenly as possible)
  * Players can only see their own hand
  * Whoever has the 4 of clubs begins by placing it on the table (automatic)
  * Gameplay rotates through the players (beginning clockwise)

* Goals
  * Players are trying to get rid of all their cards
  * Players exit the game when the run out of cards
  * The last player with cards looses

* Rules
  * You can play a single card or multiples __if they are all the same numeric value__
  * You must always play an equal or higher value than the preivious move
  * Value follows this heirarchy
    * Higher numbers are more valuable:  __4 > 3 and [4,4] > [3,3]__
    * Doubles are higher than singles, tripples higher than doubles: __[4,4,4] > [6,6] > 13__
  * If you play the same value, the next player is skipped
  * No matter what, you can always play a __2__ or __3__
  * Playing a __2__ resets the table to the lowest value
  * Playing a __3__ reverses the direction of gameplay
  * If you cannot play a higher card you must pass

  



#### Installation

```
npm install skiano.president
```

#### The President Function

```president``` is a function that takes players as inputs (functions that describe strategy), and returns the results of a single game with those players.

```javascript
var president = require('skiano.president');

var playerA = function () {};
var playerB = function () {};
var playerC = function () {};

var gameResults = president(playerA, playerB, playerC);

```

#### The Player Function

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
