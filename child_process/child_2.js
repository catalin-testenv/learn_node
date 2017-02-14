'use strict';

const net = require('net');

let counter = 3;
const interval = setInterval(() => {
    console.log(`child_2 ${process.pid} running`, counter);
    !counter && clearInterval(interval);
    !counter && process.exit(0);
    counter--;
}, 1000);

// we know in advance that parent will make available for us fd 3
const sock = new net.Socket({fd: 3, readable: true, writable: true});
sock.on('data', (data) => {
    sock.end(`child_2 ${process.pid} received ${data}`);
});
sock.write(`child_2 said ${process.pid}!`);




