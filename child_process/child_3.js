'use strict';

let counter = 10;

process.on('message', (m, socket) => {
    if (m === 'socket' && socket) {
        socket.on('data', (data) => {
            // process.send(`Child ${process.pid} got data ${data}`);
            counter--;
            // !counter && socket.end();
            socket.write(`pong(${data}) from ${process.pid}; counter is ${counter}`);
        });
        socket.on('end', () => {
            socket.end();
            process.exit(0);
        });
        // socket.on('end', () => {
        //     socket.end();
        // });
        process.send(`Child ${process.pid} got socket`);
        socket.write(`Hi from ${process.pid}`);
    }
});
