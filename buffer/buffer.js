'use strict';
// Buffer.poolSize = 65535;

const tparr = new Uint8Array([1, 2, 3, 4]);
const nBuff = Buffer.from(tparr);
// or .from(tparr.buffer) which will share the ArrayBuffer. Currently we do a copy.
const ntparr = new Uint8Array(nBuff.buffer, nBuff.byteOffset, nBuff.length);
// or Uint8Array(nBuff) which will do a copy. Currently we share the ArrayBuffer.


tparr[0] = 99;
console.log(Object.getPrototypeOf(Object.getPrototypeOf(nBuff))); // Uint8Array {}
console.log(Object.getPrototypeOf(nBuff.buffer)); // ArrayBuffer {}
console.log(nBuff.buffer);
console.log(ntparr);
console.log(nBuff.byteOffset, nBuff.length);
console.log(Buffer.poolSize);
console.log(Buffer.from(Array.from({length: 2048}, (_, k)=> k)).buffer === Buffer.from(Array.from({length: 2048}, (_, k)=> k)).buffer);
// true because internally node reuse a the pool
console.log(new Uint32Array(nBuff.buffer, nBuff.byteOffset, nBuff.length/Uint32Array.BYTES_PER_ELEMENT)); // Uint32Array [ 67305985 ]
console.log(new Uint32Array(nBuff)); // Uint32Array [ 1, 2, 3, 4 ]
console.log(new Uint32Array((new Uint8Array([1,2,3,4])).buffer)); // Uint32Array [ 67305985 ]
console.log(new Uint32Array((new Uint8Array([1,2,3,4])))); // Uint32Array [ 1, 2, 3, 4 ]