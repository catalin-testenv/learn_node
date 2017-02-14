'use strict';

const http = require('http');

const requests = {};

const requestsToDo = 1000;
let requestsDone = 0;

Array.from({length: requestsToDo}).fill(0).forEach(() => {
    http.get({
        hostname: 'localhost',
        port: 8000,
        path: '/',
        agent: false  // create a new agent just for this one request
    }, (res) => {
        // Do stuff with response

        res.on('data', (chunk) => {
            const workerPid = Number(chunk.toString());
            const workerPidRequests = requests[workerPid];
            requests[workerPid] = workerPidRequests === undefined ? 1 : workerPidRequests + 1;
            requestsDone++;
            if (requestsDone === requestsToDo) {
                console.log(requests);
            }


        });
    });
});