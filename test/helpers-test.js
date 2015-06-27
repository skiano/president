
describe('helpers', function () {
  var unit, deck;
  beforeEach(function () {
    unit = require('../lib/helpers');
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
});