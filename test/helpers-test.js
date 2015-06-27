
var assert = require('should');
var constants = require('../lib/constants');
var MODULE_PATH = '../lib/helpers';

describe('helpers: advancePlayer', function () {
  var unit, state;

  beforeEach(function () {
    unit = require(MODULE_PATH)
    state = {
      player: 0,
      players: [0,1,2,3],
      history: [],
      direction: 1
    };
  });

  it('handle normal play', function () {
    state.player = 0;
    state.history = ['4h','5h'];
    unit.advancePlayer(state);
    state.player.should.equal(1);
  });

  it('maintain direction', function () {
    state.direction = -1;
    state.history = ['4h','5h'];
    unit.advancePlayer(state);
    state.player.should.equal(3);
  });

  it('handle clearing table', function () {
    state.history = ['4h','2h'];
    unit.advancePlayer(state);
    state.player.should.equal(0);
  });

  it('handle reversing', function () {
    state.history = ['4h','3h'];
    unit.advancePlayer(state);
    state.player.should.equal(3);
    state.direction.should.equal(-1);
  });

  it('handle skipping', function () {
    state.history = ['4h','4h'];
    unit.advancePlayer(state);
    state.player.should.equal(2);
  });

  it('handle stale state', function () {
    state.passCount = state.players.length + 1;
    state.history = ['4h'];
    unit.advancePlayer(state);
    state.history = ['4h', 0];
  });
});

describe('helpers: utilities', function () {
  var unit, deck;

  beforeEach(function () {
    unit = require(MODULE_PATH);
    deck = [
      '10c','10d','10h','10s','11c','11d','11h','11s','12c','12d',
      '12h','12s','13c','13d','13h','13s','14c','14d','14h','14s',
      '2c','2d','2h','2s','3c','3d','3h','3s','4c','4d','4h','4s',
      '5c','5d','5h','5s','6c','6d','6h','6s','7c','7d','7h','7s',
      '8c','8d','8h','8s','9c','9d','9h','9s'
    ];
  });

  it('makeDeck', function () {
    unit.makeDeck().sort().should.eql(deck);
  });

  it('shuffle', function () {
    var hands = unit.shuffle(5);
    var total = hands.reduce(function (v, h) {
      return v.concat(h);
    }, []);
    total.sort().should.eql(deck);
  });

  it('getValue', function () {
    unit.getValue('13h').should.equal(13);
    unit.getValue(['7c', '7h', '7d']).should.equal(7);
  });

  it('hasCard', function () {
    unit.hasCard(['2h','3c'], '13h').should.be.false();
    unit.hasCard(['2h','3c'], '3h').should.be.false();
    unit.hasCard(['2h','3c'], '2h').should.be.true();
  });

  it('hasCards', function () {
    unit.hasCards(['2h','3c','4d'], ['2h','13h']).should.be.false();
    unit.hasCards(['2h','3c','4d'], ['2h','4d','3c']).should.be.true();
  });

  it('removeCard', function () {
    var hand = ['2h','3c','4d'];
    unit.removeCard(hand, '2h')
    hand.should.eql(['3c','4d']);

    assert.throws(function () {
      unit.removeCard(hand, '2d');
    });
  });

  it('removeFromHand', function () {
    var hand = ['2h','3c','4d'];
    unit.removeFromHand(hand, ['3c','4d']);
    hand.should.eql(['2h']);
    unit.removeFromHand(hand, '2h')
    hand.should.eql([]);
  });

  it('currentCard', function () {
    unit.currentCard([1,2,3]).should.equal(3);
  });

  it('previousCard', function () {
    unit.previousCard([1,2,3]).should.equal(2);
  });

  it('shouldSkip', function () {
    unit.shouldSkip(['7d','7h']).should.be.true();
  });

  it('shouldClear', function () {
    unit.shouldClear(['13d','2h']).should.be.true();
  });

  it('shouldReverse', function () {
    unit.shouldReverse(['13d','3d']).should.be.true();
  });

  it('shouldReverse', function () {
    unit.shouldReverse(['13d','3d']).should.be.true();
  });

  it('advance', function () {
    unit.advance(0, 10, 1).should.equal(1);
    unit.advance(0, 10, -2).should.equal(8);
    unit.advance(0, 10, 12).should.equal(2);
    unit.advance(0, 10, -12).should.equal(8);
  });

  it('hasWon', function () {
    unit.hasWon([1,2]).should.be.false();
    unit.hasWon([]).should.be.true();
  });

  it('gameOver', function () {
    unit.gameOver({
      players: []
    }).should.be.true();

    unit.gameOver({
      players: [1,2,3],
      gameLength: constants.MAX_LENGTH + 1
    }).should.be.true();

    unit.gameOver({
      players: [1,2,3],
      gameLength: constants.MAX_LENGTH - 1
    }).should.be.false();
  });

  it('reduceMulti', function () {
    unit.reduceMulti(['7c','7d','7h']).should.equal(7);
    unit.reduceMulti(['7c','10d']).should.equal(0);
  });

  it('isSpecialCard', function () {
    unit.isSpecialCard(constants.REVERSE_VALUE+'h').should.be.true();
    unit.isSpecialCard(constants.CLEAR_VALUE+'h').should.be.true();
    unit.isSpecialCard('10h').should.be.false();
  });

  it('checkSinglePlay', function () {
    unit.checkSinglePlay([3,3], 13).should.be.false();
    unit.checkSinglePlay(13, 3).should.be.false();
    unit.checkSinglePlay(3, 13).should.be.true();
    unit.checkSinglePlay(6, 6).should.be.true();
  });

  it('checkMultiPlay', function () {
    unit.checkMultiPlay(13, [4,4]).should.be.true();
    unit.checkMultiPlay([13,13], [4,4,4]).should.be.true();
    unit.checkMultiPlay([4,4,4], [13,13]).should.be.false();
    unit.checkMultiPlay([4,4], [13,13]).should.be.true();
    unit.checkMultiPlay([10,10], [9,9]).should.be.false();
    unit.checkMultiPlay([9,9], [9,9]).should.be.true();
  });

  it('getPlayerId', function () {
    var explicit = function () {};
    explicit.playerId = 'id';
    unit.getPlayerId(explicit, 3).should.equal('id:3');
    unit.getPlayerId(function named() {}, 2).should.equal('named:2');
    unit.getPlayerId(function() {}, 1).should.equal(constants.PLAYER_PREFIX + ':1');
  });

  it('recordEvent', function () {
    var state = {
      player: 0,
      players: [
        {playerId: 'a'},
        {playerId: 'b'},
        {playerId: 'c'}
      ],
      history: [],
      direction: 1,
      events: []
    };

    unit.recordEvent(state, false);
    state.player = 1;
    state.history.push('3h');
    unit.recordEvent(state, true);
    state.player = 2;
    state.history.push(['4h','5d']);
    unit.recordEvent(state, true, true);

    state.events.should.eql([
      {player: 'a', card: null, finished: false},
      {player: 'b', card: '3h', finished: false},
      {player: 'c', card: ['4h','5d'], finished: true}
    ]);
  });
});