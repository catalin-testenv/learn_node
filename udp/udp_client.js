const dgram = require("dgram");
const client = dgram.createSocket("udp4");
const message = new Buffer("Hello UDP");

client.send(message, 0, message.length, 8000, "127.0.0.1", function(error, bytes) {
    if (error) {
        console.error("An error occurred while sending");
    } else {
        console.log("Successfully sent " + bytes + " bytes");
    }
});

client.send('DONE!', 8000, "127.0.0.1", function(error, bytes) {
    if (error) {
        console.error("An error occurred while sending");
    } else {
        console.log("Successfully sent " + bytes + " bytes");
    }
    client.close();
});

client.on('close', () => {
    console.log(`client closed`);
});
