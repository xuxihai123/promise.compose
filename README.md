# promise-compose
---
[![NPM version](http://img.shields.io/npm/v/promise.compose.svg?style=flat)](https://npmjs.org/package/promise.compose)
[![Build Status](http://img.shields.io/travis/xuxihai123/promise.compose/master.svg?style=flat)](http://travis-ci.org/xuxihai123/promise.compose)

> compose an array of promises ,return a function that chain resolve promise with an initialization parameter

## Install

```sh
$ npm install promise.compose
```

## Usage

```js
var compose = require('promise.compose')

function makeAdder (a) {
  return function (b) {
    b = b || 0
    return Promise.resolve(a + b)
  }
}

var addOne = makeAdder(1)

let composeFn=compose([
                addOne,  // 1
                addOne, // 2
                addOne  // 3
              ]);
composeFn(10)
.then(console.log)
.catch(console.error)
```

## API

#### `compose(functions)` -> `function(ctx)` ->`promise

like koa-compose Runs the array of functions in series, waiting for each to resolve and passing each result to the next function in the array.

##### functions

*Required*
Type: `array[function]`
