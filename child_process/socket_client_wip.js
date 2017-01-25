const net = require('net');

const client = net.connect({port: 55678}, () => {
    // 'connect' listener
    console.log('connected to server!');
    client.write('world!\r\n');
});
client.on('data', (data) => {
    console.log('received: ', data.toString(), '|END|');
    // client.end();
});
client.on('end', () => {
    console.log('disconnected from server.');
    client.end();
});