
var proxyquire = require('proxyquire').noCallThru();
var stub = require('sinon').stub;

describe('deal', function () {
  var unit, helpers, players, hands, hasCard, removeCard;

  beforeEach(function () {
    hasCard = stub();
    removeCard = stub();
    players = [stub(), stub()];

    hands = [
      [5,10,15],
      [20,25],
    ];
    
    helpers = {
      shuffle: stub(),
      getPlayerId: stub(),
      hasCard: function (hand, card) {
        hasCard(card);
        return hand === hands[1];
      },
      removeCard: function (hand, card) {
        removeCard(card);
        hand.pop();
      }
    };

    unit = proxyquire('../lib/deal', {
      './helpers': helpers,
      './constants': {
        START_CARD: 5
      }
    });

    helpers.getPlayerId.returnsArg(1);
  });

  it('main', function () {
    helpers.shuffle.returns(hands);
    var state = unit(players);
    
    [1,-1].should.matchAny(state.direction);
    state.passCount.should.eql(0);
    state.gameLength.should.eql(0);
    state.history.should.eql([5]);
    state.rank.should.eql([]);
    state.events.should.eql([]);
    state.player.should.eql(1);
    state.hands[0].should.eql([5,10,15]);
    state.hands[1].should.eql([20]);

    state.players[0](1, 2);
    players[0].calledWith(1, 2).should.be.true();
  });
});
