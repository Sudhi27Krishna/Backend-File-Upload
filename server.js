const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const filePayloadExists = require('./middlewares/filePayloadExists');
const fileExtLimiter = require('./middlewares/fileExtLimiter');
const fileSizeLimiter = require('./middlewares/fileSizeLimiter');
const manipulate = require('./manipulate');
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/upload',
    fileUpload({ createParentPath: true }),
    filePayloadExists,
    fileExtLimiter([".xlsx"]),
    fileSizeLimiter,
    (req, res) => {
        const files = req.files
        console.log(files)

        Object.keys(files).forEach(key => {
            const filepath = path.join(__dirname, 'uploadedExcels', files[key].name);
            files[key].mv(filepath, (err) => {
                if(err) return res.status(500).json({status: "error", message: err});
            })
        })

        manipulate();

        return res.json({ status: 'success', message: Object.keys(files).toString() });
    }
);

app.listen(3000, () => console.log("Server running on port 3000..."));
