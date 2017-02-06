'use strict';

const Pipe = process.binding('pipe_wrap').Pipe;
const p = new Pipe(true);
p.open(10)
console.log(p);