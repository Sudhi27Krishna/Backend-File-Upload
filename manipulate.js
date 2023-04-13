const { spawn } = require('node:child_process');

const manipulate = () => {
    const pythonProcess = spawn('python', ['demo.py']);
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pythonProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
}

module.exports = manipulate;