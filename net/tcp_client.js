const net = require("net");

const client = new net.Socket({
    allowHalfOpen: true
});
client.connect({
    port: 55678
});
client.on('connect', (data) => {
    console.log('client connected', client.address());
    const message = 'hello';
    console.log('client sent', message);
    client.write(message);
});
client.on('data', (data) => {
    console.log('client received', data.toString());
    // client.end(); // end initiated by client
});
client.on('end', () => {
    console.log('client end', client.destroyed); // false when initiated by server, true when initiated by client
    // client.end(); // answer to server wish to end // when allowHalfOpen: true
});
client.on('close', () => {
    console.log('client close', client.destroyed);
});
client.on('timeout', () => {
    console.log('client timed out, ...ending');
    client.end(); // end initiated by client
});
client.setTimeout(1000, () => {

});

// this works too # if removed on 'data' handler
// client.on('readable', function() {
//     console.log('client ---- on readable');
//     let record = null;
//     while (null !== (record = client.read(7))) {
//         console.log('----received: ' + record.toString());
//     }
// });

// this works too # if removed on 'data' handler
// client.pipe(process.stdout);


