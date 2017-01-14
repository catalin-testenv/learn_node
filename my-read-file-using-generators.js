
const fs = require('fs');

function *readFile(name) {
    const fd = fs.openSync(name, 'r');
    const CHUNK = 32;
    const buffer = Buffer.alloc(CHUNK);
    let position = 0;
    let bytesRead = 0;
    do {
        bytesRead = fs.readSync(fd, buffer, 0, CHUNK, position);
        position += CHUNK;
        yield buffer.toString('utf8', 0, bytesRead);
    } while (bytesRead);

}

try {
    console.log([...readFile(__filename)].join(''));
} catch (err) {
    console.error('error caught: ', err.message);
}

