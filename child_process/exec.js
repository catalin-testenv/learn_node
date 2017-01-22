
const exec = require('child_process').exec;
const execFile = require('child_process').execFile;

// const cp = exec('node ./exec_child_1.js', {
//     timeout: 0
// }, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`exec error: ${error}`);
//         return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
// });

const cp = execFile('node', ['./exec_child_1.js'], {
    timeout: 0
}, (error, stdout, stderr) => {
    if (error) {
        console.error(`exec error: ${error}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
});


cp.stdout.on('data', (data) => {
    console.log('stdout data: ', data);
});
cp.stderr.on('data', (data) => {
    console.log('stderr data: ', data);
});
cp.on('exit', (code, signal) => {
    console.log('exited with: ', code, signal);
});

console.log('DONE');

