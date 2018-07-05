'use strict';

module.exports = function compose(callbacks) {
  return function(context) {
    return callbacks.reduce(function(accumulator, callback) {
      return accumulator.then(callback);
    }, Promise.resolve(context));
  };
};

