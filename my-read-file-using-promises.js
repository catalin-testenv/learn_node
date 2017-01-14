
const fs = require('fs');

const readFile = (name) => {
    const consume = (fd, {position = 0, data = '', CHUNK = 32} = {}) => {
        return new Promise((resolve, reject) => {
            fs.read(fd, Buffer.alloc(CHUNK), 0, CHUNK, position, (err, bytesRead, buff) => {
                err ? reject(err) :
                bytesRead === 0 ? resolve(data + buff.toString('utf8', 0, bytesRead)) :
                resolve(consume(fd, {position: position + CHUNK, data: data + buff.toString('utf8', 0, bytesRead), CHUNK}));
            });
        });
    };

    return new Promise((resolve, reject) => {
        fs.open(name, 'r', (err, fd) => err ? reject(err) : resolve(consume(fd)));
    });
};

readFile('.gitignore').then((data) => {
    console.log('OK: ', data);
}).catch((err) => {
    console.error('NOK: ', err);
});

