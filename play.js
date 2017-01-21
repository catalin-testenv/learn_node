'use strict';

console.log(Array.from({length: 26}, (v, k) => k + 97).map((c) => String.fromCharCode(c)).join(''))

