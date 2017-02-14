'use strict';

const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// cluster.SCHED_RR is indeed almost equally distributed unlike
// system one (cluster.SCHED_NONE) which is mostly unequal
cluster.schedulingPolicy = cluster.SCHED_RR; // cluster.SCHED_RR | cluster.SCHED_NONE

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(`${process.pid}`);
    }).listen(8000);

    console.log(`Worker ${process.pid} started`);
}