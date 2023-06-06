const { spawn } = require('node:child_process');

const data = {
    details: [
        { sem: 3, branch: 'CS', slot: 'A', subcode: 'MAT203' },
        { sem: 3, branch: 'CA', slot: 'A', subcode: 'MAT203' },
        { sem: 3, branch: 'AD', slot: 'A', subcode: 'MAT203' },
        { sem: 3, branch: 'EE', slot: 'A', subcode: 'MAT201' },
        { sem: 3, branch: 'EC', slot: 'A', subcode: 'MAT201' },
        { sem: 3, branch: 'ME', slot: 'A', subcode: 'MAT201' },
        { sem: 3, branch: 'CE', slot: 'A', subcode: 'MAT201' }
    ]
};

async function totalCount() {
    return new Promise((resolve, reject) => {
        const jsonData = JSON.stringify(data);
        const pythonProcess = spawn('python', ['totalStudent.py', jsonData]);

        pythonProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
            resolve(code);
        });

        pythonProcess.on('error', (error) => {
            console.error(`child process encountered an error: ${error}`);
            reject(error);
        });
    });
}

module.exports = totalCount;