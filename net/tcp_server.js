const net = require("net");

var server = net.createServer({
    allowHalfOpen: true
}, (client) => {
    // same listener as for 'connection'
    console.log('createServer callback');
    // client.end('goodbye\n');
}).on('error', (err) => {
    console.log('server error', err);
    throw err;
}).on('listening', () => {
    console.log('server listening', server.address(), server.listening);
}).on('connection', (client) => {
    console.log('server has new client');
    client.on('data', (data) => {
        console.log('server received', data.toString());
        console.log('server sent', 'world');
        client.write('world\n');
        // client.end('goodbye\n'); // end initiated by server
    });
    client.on('end', () => {
        console.log('client ended, ...sending goodbye');
        client.end('goodbye\n'); // answer to client wish to end // when allowHalfOpen: true
    });
}).on('close', () => {
    console.log('server close', server.address(), server.listening);
});

// grab a random port.
server.listen({
    host: 'localhost',
    port: 55678,
    exclusive: true
}, () => {
    console.log('listen callback', server.address(), server.listening);
    setTimeout(() => {
        server.close(); // unref()
    }, 10000);
});