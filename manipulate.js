const { spawn } = require('node:child_process');

const data = {
    date: '31-05-2023',
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
        { room_no: '401', capacity: 30 },
        { room_no: '404', capacity: 30 },
        { room_no: '502', capacity: 30 },
        { room_no: '503', capacity: 30 },
        { room_no: '505', capacity: 30 },
        { room_no: '506', capacity: 30 },
        { room_no: '212', capacity: 30 }
    ],
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

const manipulate = () => {
    // Convert the data object to JSON string
    const jsonData = JSON.stringify(data);

    // Invoke the Python script with JSON data as an argument
    const pythonProcess = spawn('python', ['excel_script.py', jsonData]);

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