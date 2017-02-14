'use strict';


let counter = 3;
let data = '';
const interval = setInterval(() => {
    console.log(`child_1 ${process.pid} running`, counter, data);
    !counter && clearInterval(interval);
    !counter && process.exit(0);
    counter--;
}, 1000);




