
require("babel/register");

var game = require('./lib');
var player = require('./samplePlayers/a');

const results = game([player, player, player, player, player]);
console.log(results);

