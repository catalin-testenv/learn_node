
const spawn = require('child_process').spawn;
const fork = require('child_process').fork;
const net = require('net');



// ================== communication via ipc ====================================

const server = net.createServer((socket) => {
    socket.write('server says hello');

    for (let i = 2; i--;) {
        const child = spawn('node', ['./child_3.js'], {
            timeout: 0,
            stdio: [null, null, null, 'ipc']
        });
        // const child = fork('./child_3.js');
        child.on('message', (message) => {
           console.log('child said: ', message);
        });
        child.send('socket', socket, { keepOpen: !!i });
    }

    setTimeout(() => {
        server.close();
    }, 0);

}).on('error', (err) => {
    throw err;
});
server.listen({
    host: 'localhost',
    port: 55678,
}, () => {
    console.log('opened server on', server.address());
});




// this socket after connecting to server will be passed over to the child via ipc as a send handler param
// it could live of course in a different process
const client = new net.Socket({
    allowHalfOpen: false
});
client.connect({
    port: 55678
});
client.on('connect', () => {
    console.log('client connected', client.address());
});
let counter = 5;
client.on('data', (data) => {
    console.log('client received: ', data.toString(), '|END|');
    counter >= 0 && setTimeout(() => {
        try {
            counter >= 0 && client.write(`ping(${counter})`);
        } catch (err) {}

        counter--;
        !counter && client.removeAllListeners();
        !counter && client.unref();
        !counter && client.end();
        !counter && console.log('removed all listeners');
    }, 1000);
});
client.on('end', () => {
    console.log('disconnected from server.');
    // client.end();
});

console.log('DONE');

