//  // manipulate(Object.keys(files));   // create createbranch.js
//  arrangeMan(); // room arrangement
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const filePayloadExists = require('./middlewares/filePayloadExists');
const fileExtLimiter = require('./middlewares/fileExtLimiter');
const fileSizeLimiter = require('./middlewares/fileSizeLimiter');
const createBranches = require('./createBranches');
const arrangeMan = require('./arrangeMan');
const totalCount = require('./totalCount');
const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload',
  fileUpload({ createParentPath: true }),
  filePayloadExists,
  fileExtLimiter([".xlsx"]),
  fileSizeLimiter,
  async (req, res) => {
    const files = req.files
    console.log(files)

    Object.keys(files).forEach(key => {
      const filepath = path.join(__dirname, 'uploadedExcels', files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      })
    })

    try {
      await createBranches(Object.keys(files));
      await arrangeMan();
      await totalCount();
    } catch (error) {
      console.log(error);
    }

    return res.json({ status: 'success', message: Object.keys(files).toString() });
  }
);

app.listen(3000, () => console.log("Server running on port 3000..."));

/*
{
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
}
{
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
}
{
  date: '12-06-2023',
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
    { room_no: 'M229', capacity: 30 },
    { room_no: 'M211', capacity: 30 },
    { room_no: '403', capacity: 30 }
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
}


{
  "date": "31-05-2023",
  "time": "FN",
  "rooms": [
    { "room_no": 'M111', "capacity": 30 },
    { "room_no": 'M105', "capacity": 30 },
    { "room_no": 'M113', "capacity": 30 },
    { "room_no": 'M204', "capacity": 30 },
    { "room_no": 'M205', "capacity": 30 },
    { "room_no": 'M207', "capacity": 30 },
    { "room_no": 'M209', "capacity": 30 },
    { "room_no": 'M213', "capacity": 30 },
    { "room_no": '209', "capacity": 30 },
    { "room_no": '211', "capacity": 30 },
    { "room_no": '401', "capacity": 30 },
    { "room_no": '404', "capacity": 30 },
    { "room_no": '502', "capacity": 30 },
    { "room_no": '503', "capacity": 30 },
    { "room_no": '505', "capacity": 30 },
    { "room_no": '506', ""capacity"": 30 },
    { "room_no": '212', "capacity": 30 }
  ],
  "details": [
    { "sem": 3, "branch": 'CS', "slot": 'A', "subcode": 'MAT203' },
    { "sem": 3, "branch": 'CA', "slot": 'A', "subcode": 'MAT203' },
    { "sem": 3, "branch": 'AD', "slot": 'A', "subcode": 'MAT203' },
    { "sem": 3, "branch": 'EE', "slot": 'A', "subcode": 'MAT201' },
    { "sem": 3, "branch": 'EC', "slot": 'A', "subcode": 'MAT201' },
    { "sem": 3, "branch": 'ME', "slot": 'A', "subcode": 'MAT201' },
    { "sem": 3, "branch": 'CE', "slot": 'A', "subcode": 'MAT201' }
  ]
}
*/
