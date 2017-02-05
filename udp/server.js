const dgram = require("dgram");
const server = dgram.createSocket("udp4");

server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} (${rinfo.size}  bytes) from ${rinfo.address}:${rinfo.port}, ${rinfo.family}`);
    // server.close();
});

server.on('listening', () => {
    var address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.on('close', () => {
    console.log(`server closed`);
});

server.bind(8000, function() {
    console.log(`bound to ${JSON.stringify(server.address())}`);
});

