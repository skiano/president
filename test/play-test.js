
var proxyquire = require('proxyquire').noCallThru();
var stub = require('sinon').stub;

describe('play', function () {
  var unit;

  beforeEach(function () {
    unit = proxyquire('../lib/play', {
      './helpers': {},
      './constants': {}
    })
  });

  it('todo', function () {

  });
});
