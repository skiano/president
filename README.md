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

### The Results
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
