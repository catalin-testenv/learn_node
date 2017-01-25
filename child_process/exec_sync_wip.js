
const spawnSync = require('child_process').spawnSync;
const spawn = require('child_process').spawn;
const Writable = require('stream').Writable;
const net = require('net');


// process.stdout.on('data', (data) => {
//     console.log('stderr data: ', data);
// });
//
// process.stdout.on('exit', (code, signal) => {
//     console.log('exited with: ', code, signal);
// });

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
ws.writable = true;

// const myWritable = new Writable({
//     write(chunk, encoding, callback) {
//         console.log('write: ' + chunk.toString());
//         callback();
//     }
// });
//
// var stdout = new require('stream').PassThrough();
//
//
//
// const cp = spawn('node', ['./exec_child_1.js'], {
//     timeout: 0,
//     stdio: [null, null, null]
// });
// cp.stdout.pipe(ws);




var server = net.createServer((socket) => {
    // console.log('socket', socket);
    socket.write('server said hello\n');
    // socket.end('server said goodbye\n');
    // socket.pipe(socket);

    const cp = spawn('node', ['./exec_child_1.js'], {
        timeout: 0,
        stdio: [null, socket, null]
    });

    spawn('node', ['./exec_child_1.js'], {
        timeout: 0,
        stdio: [null, socket, null]
    });

    // cp.stdout.pipe(socket);

    setTimeout(() => {
        server.close();
    }, 0);

    setTimeout(() => {
        socket.end();
    }, 7000);

}).on('error', (err) => {
    // handle errors here
    throw err;
});



// grab a random port.
server.listen({
    host: 'localhost',
    port: 55678,
    exclusive: true
}, () => {
    console.log('opened server on', server.address());

});

//
// const client = net.connect({port: 55678}, () => {
//     // 'connect' listener
//     console.log('connected to server!');
//     client.write('world!\r\n');
// });
// client.on('data', (data) => {
//     console.log('received: ', data.toString());
//     // client.end();
// });
// client.on('end', () => {
//     console.log('disconnected from server.');
// });

// cp.stdout.pipe(ws);




console.log('DONE');

