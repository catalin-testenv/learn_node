
const EventEmitter = require('events');
const fs = require('fs');

// // ES6
// class ReadFile extends EventEmitter {
//     constructor (name) {
//         super();
//         fs.open(name, 'r', (err, fd) => {
//             err ? this.emit('error', err) : this.consume(fd);
//         });
//     }
//
//     consume(fd, {position = 0, data = null, CHUNK = 128} = {}) {
//         setTimeout(() => {
//             data && this.emit('data', data);
//             fs.read(fd, Buffer.alloc(CHUNK), 0, CHUNK, position, (err, bytesRead, buff) => {
//                 if (err) {
//                     this.emit('error', err);
//                 } else if (bytesRead === 0) {
//                     fs.close(fd, (err) => {
//                         err ? this.emit('error', err) : this.emit('end');
//                     });
//                 } else {
//                     this.consume(fd, {position: position + CHUNK, data: buff.toString('utf8', 0, bytesRead), CHUNK});
//                 }
//             });
//         }, 100);
//     }
// }

// // ES5
// function ReadFile(name) {
//     EventEmitter.call(this);
//     fs.open(name, 'r', (err, fd) => {
//         err ? this.emit('error', err) : this.consume(fd);
//     });
// }
// ReadFile.prototype = Object.create(EventEmitter.prototype);
// ReadFile.prototype.constructor = ReadFile;
// ReadFile.prototype.consume = function(fd, {position = 0, data = null, CHUNK = 128} = {}) {
//     setTimeout(() => {
//         data && this.emit('data', data);
//         fs.read(fd, Buffer.alloc(CHUNK), 0, CHUNK, position, (err, bytesRead, buff) => {
//             if (err) {
//                 this.emit('error', err);
//             } else if (bytesRead === 0) {
//                 fs.close(fd, (err) => {
//                     err ? this.emit('error', err) : this.emit('end');
//                 });
//             } else {
//                 this.consume(fd, {position: position + CHUNK, data: buff.toString('utf8', 0, bytesRead), CHUNK});
//             }
//         });
//     }, 100);
// };

// ES6 using composition
class ReadFile {
    constructor (name) {
        this.ee = new EventEmitter();
        fs.open(name, 'r', (err, fd) => {
            err ? this.emit('error', err) : this.consume(fd);
        });
    }

    on(...args) {
        return this.ee.on(...args);
    }

    emit(...args) {
        return this.ee.emit(...args);
    }

    consume(fd, {position = 0, data = null, CHUNK = 128} = {}) {
        setTimeout(() => {
            data && this.emit('data', data);
            fs.read(fd, Buffer.alloc(CHUNK), 0, CHUNK, position, (err, bytesRead, buff) => {
                if (err) {
                    this.emit('error', err);
                } else if (bytesRead === 0) {
                    fs.close(fd, (err) => {
                        err ? this.emit('error', err) : this.emit('end');
                    });
                } else {
                    this.consume(fd, {position: position + CHUNK, data: buff.toString('utf8', 0, bytesRead), CHUNK});
                }
            });
        }, 100);
    }
}

let data = '';

(new ReadFile(__filename))
.on('error', (err) => {
    console.error('err: ', err);
}).on('data', (_data) => {
    console.log('receiving data');
    data += _data;
}).on('end', () => {
    console.log('DONE reading!');
    console.log(data);
});

console.log('End of program');
