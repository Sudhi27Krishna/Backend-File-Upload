const { spawn } = require('node:child_process');

const data = {
    date: '17-06-2023',
    time: 'FN',
    rooms: [
        { room_no: 'M111', capacity: 30 },
        { room_no: 'M105', capacity: 30 },
        { room_no: 'M113', capacity: 30 },
        { room_no: 'M204', capacity: 30 },
        { room_no: 'M205', capacity: 30 },
        { room_no: 'M207', capacity: 30 },
        { room_no: 'M209', capacity: 30 },
        { room_no: 'M213', capacity: 30 },
        { room_no: '209', capacity: 30 },
        { room_no: '211', capacity: 30 },
        { room_no: '401', capacity: 30 }
    ],
    details: [
        { sem: 3, branch: 'EE', slot: 'B', subcode: 'EET201' },
        { sem: 3, branch: 'EC', slot: 'B', subcode: 'ECT201' },
        { sem: 3, branch: 'ME', slot: 'B', subcode: 'MET201' },
        { sem: 3, branch: 'CE', slot: 'B', subcode: 'CET201' }
    ]
};

const manipulate = () => {
    // Convert the data object to JSON string
    const jsonData = JSON.stringify(data);

    // Invoke the Python script with JSON data as an argument
    const pythonProcess = spawn('python', ['arrange.py', jsonData]);

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