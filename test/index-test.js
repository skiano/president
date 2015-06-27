
var proxyquire = require('proxyquire').noCallThru();
var stub = require('sinon').stub;

describe('index', function () {
  var unit, play, deal, players;

  beforeEach(function () {
    players = [1,2,3,4];
    play = stub();
    deal = stub();
    unit = proxyquire('../lib', {
      './play': play,
      './deal': deal
    });
  });

  it('Array signiture', function () {
    deal.returns('a');
    unit(players);
    deal.calledWith(players).should.be.true;
    play.calledWith('a').should.be.true();
  });

  it('Arguments signiture', function () {
    deal.returns('a');
    unit(1,2,3);
    deal.firstCall.args[0].should.eql([1,2,3]);
  });
});