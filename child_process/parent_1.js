
const spawn = require('child_process').spawn;
const Writable = require('stream').Writable;
const net = require('net');

// ================== communication via pipe (using non fd stream) ====================================

class WriteStream extends Writable {
    constructor() {
        super({objectMode: false});
    }

    _write(chunk, encoding, callback) {
        console.log('write: ' + chunk.toString());
        callback();
    }
}
const ws = new WriteStream();


const cp = spawn('node', ['./child_1.js'], {
    timeout: 0,
    stdio: [null, null, null]
});
cp.stdout.pipe(ws);

console.log('DONE');

