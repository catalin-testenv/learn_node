'use strict';

let counter = 3;
const interval = setInterval(() => {
    console.log(`child_1 ${process.pid} running`, counter);
    console.error(`child_1 ${process.pid} running`, counter);
    !counter && clearInterval(interval);
    counter--;
}, 1000);

