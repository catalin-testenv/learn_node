
const spawn = require('child_process').spawn;
const net = require('net');



// ================== communication via socket ====================================

const server = net.createServer((socket) => {
    spawn('node', ['./child_2.js'], {
        timeout: 0,
        // passing the socket client to the child
        stdio: ['inherit', 'inherit', 'inherit', socket]
    });

    setTimeout(() => {
        server.close();
    }, 0);

    setTimeout(() => {
        socket.end();
    }, 7000);

}).on('error', (err) => {
    throw err;
});
server.listen({
    host: 'localhost',
    port: 55678,
}, () => {
    console.log('opened server on', server.address());
});

// this socket after connecting to server will be passed over to the child
// it could live of course in a different process
const client = net.connect({port: 55678}, () => {
    console.log('client connected to server!');
});
client.on('data', (data) => {
    console.log(`client received:\n`, data.toString(), '|END|');
    client.write('---12345---');
});
client.on('end', () => {
    console.log('client disconnected from server.');
    client.end();
});

console.log('DONE');

