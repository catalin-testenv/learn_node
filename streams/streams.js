'use strict';

const Readable = require('stream').Readable,
    Writable = require('stream').Writable,
    Transform = require('stream').Transform;

class ReadStream extends Readable {
    constructor() {
        super({objectMode: true});
        this.data = [1,2,3,4,5,6,7,8,9];
        this.curIndex = 0;
    }

    _read() {
        if (this.curIndex === this.data.length) {
            return this.push(null);
        }
        const data = this.data[this.curIndex++];
        console.log('read: ' + JSON.stringify(data));
        this.push(data);
    }
}

class WriteStream extends Writable {
    constructor() {
        super({objectMode: true});
    }

    _write(chunk, encoding, callback) {
        console.log('write: ' + JSON.stringify(chunk));
        callback();

        // console.log('write: ' + JSON.stringify(chunk));
        // console.log('waiting 2 seconds');
        // setTimeout(() => {
        //     console.log('finished waiting');
        //     callback();
        // }, 2000);
    }
}

class TransformStream extends Transform {
    constructor() {
        super({objectMode: true});
        this.__chunk = 0;
    }

    _transform(chunk, encoding, callback) {
        console.log('transform before : ' + JSON.stringify(chunk));
        if (!(chunk % 2)) {
            this.__chunk = chunk;
        } else {
            let _chunk = '|' + this.__chunk + chunk  + '|';
            console.log('transform after : ' + JSON.stringify(_chunk));
            this.push(_chunk);
        }
        callback();
    }
}

const rs = new ReadStream();
const ws = new WriteStream();
const ts = new TransformStream();

// ======================================================================================

// rs.on('readable', function() {
//     let record = null;
//     while (null !== (record = rs.read())) {
//         console.log('received: ' + JSON.stringify(record));
//     }
// }).on('end', function() {
//     console.log('done');
// });

// ======================================================================================

// rs.on('data', function(record) {
//     console.log('received: ' + JSON.stringify(record));
// });
// rs.on('end', function() {
//     console.log('done');
// });

// ======================================================================================

// rs.on('data', function(record) {
//     console.log('received: ' + JSON.stringify(record));
//     console.log('pausing stream for 1 second');
//     rs.pause();
//     setTimeout(function() {
//         console.log('resuming stream');
//         rs.resume();
//     }, 1000);
// });
// rs.on('end', function() {
//     console.log('done');
// });

// ======================================================================================

// rs.pipe(ws);

// ======================================================================================

rs.pipe(ts).pipe(ws);

// ======================================================================================

