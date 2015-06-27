# President

An implementation of the cardgame [President](https://en.wikipedia.org/wiki/President_(card_game)#General_rules).

#### Installation

```
$ npm install skiano.president
```

## The Rules

_This describes the rules as implemented, ignoring other variations_

* __Setup__
  * Between 3 and 8 players
  * All cards are dealt to players (as evenly as possible)
  * Players can only see their own hand
  * Whoever has the 4 of clubs begins by placing it on the table (automatic)
  * Gameplay rotates through the players (beginning clockwise)

* __Goals__
  * Players are trying to get rid of all their cards
  * Players exit the game when the run out of cards
  * The last player holding cards looses

* __Rules__
  * You can play a single card or multiples __if they are all the same numeric value__
  * You must always play an equal or higher value than the preivious play
  * Value follows this heirarchy
    * Ace is high 
    * Higher numbers are more valuable:  __4 > 3 and [4,4] > [3,3]__
    * Doubles are higher than singles, tripples higher than doubles: __[4,4,4,4] > [9,9] > 13__
  * If you play the same value as the previos player, the next player is skipped
  * No matter what, you can always play a __2__ or __3__
  * Playing a __2__ resets the table to the lowest value
  * Playing a __3__ reverses the direction of gameplay
  * If you cannot play a higher card you must pass
  * If all the players pass (full circle) the table is cleared.
  * When the table is cleared the following player may play anything they have

## The interface

#### The President Function

```president``` is a function that takes players creators as inputs and returns the results of a single game with those players.

```javascript
var president = require('skiano.president');
var createPlayer = require() // your player creator
var results = president(createPlayer, createPlayer, createPlayer);
```

```results``` is an object with the folowing properties:
* __winner__ {string} The id of the winning player
* __rank__ {list} A list of player ids sorted from winner to loser
* __events__ {list} The complete history of the game

#### Creating a Player

To play the game, you create a function that returns a player function. The player function will be called for each game event. When it is your turn you may return cards from your hand. (more on this below)

```javascript

function createPlayer(setName) {
  return function player(isMyPlay, myView) {
    if (isMyPlay) // it is your turn to play; return your play
    else  // someone else is playing. just watch...
  }
}
```

__```myView```__ is a snapshot of the game with the following properties:
* __hand__ {list} The cards you currently hold
* __players__ {number} The number of players still in the game (including you)
* __table__ {array} The card(s) on the table. There are times when the array is empty
* __getValidPlays__ {function} returns all valid plays for your current hand
* _Note:_ ```myView``` does not expose the history of the game to you. So if you are interested in using previous plays in your strategy you must collect the data you want withing your createPlayer function.

#### The Deck

Cards are represented as strings. Face cards are represented by their numerical value. Your hand is a list of card strings.

For Example:

```javascript
[
 '4h',   // Four of hearts
 '11d',  // Jack of Diamonds
 '2s',   // Two of Spades
 '14c'   // Ace of clubs
]
```
