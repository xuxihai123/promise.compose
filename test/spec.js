const assert = require('assert');
const compose = require('../');

describe('compose example', function() {

  let addOne = makeAdder(1);
  let addTwo = makeAdder(2);

  function makeAdder(a) {
    return function(b) {
      b = b || 0;
      return Promise.resolve(a + b);
    };
  }

  function increment(b) {
    return ++b;
  }

  function rejection() {
    return Promise.reject(new Error('andrew joslin'));
  }

  it('compose array of promises sequentially without context', function(done) {
    let composePromise = compose([addOne, addTwo]);
    composePromise().then(function(result) {
      assert(result, 3);
      done();
    });
  });
  it('compose array of promises sequentially with context', function(done) {
    let composePromise = compose([addOne, addTwo]);
    composePromise(10).then(function(result) {
      assert(result, 13);
      done();
    });
  });
  it('compose array consisting of zero promises', function(done) {
    let composePromise = compose([]);
    composePromise().then(function(result) {
      assert.strictEqual(result, undefined);
      done();
    });
  });

  it('compose array consisting of only one promise', function(done) {
    let composePromise = compose([addOne]);
    composePromise().then(function(result) {
      assert(result, 1);
      done();
    });
  });

  it('compose reject array', function(done) {
    let composePromise = compose([rejection]);
    composePromise().then(function(result) {
      throw Error('fail..');
    }).catch(function(err) {
      assert('andrew joslin', err);
      done();
    });
  });
  it('non-promise return', function(done) {
    let composePromise = compose([addOne, addTwo, increment]);
    composePromise().then(function(result) {
      assert(result, 4);
      done();
    });
  });

});
