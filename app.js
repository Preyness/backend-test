const express = require('express'); //mao ni mag create sa web server
const fs = require('fs'); //kani sa interact sa file system 
const app = express();//ga create nig instance sa express app
const multer = require('multer');//para sa uploading files
const path = require('path');//path module ni siya


//mao ni siya path to uploads and gina check niya if naa nabay uploads folder or wala and if wala mag create siyag uploads folder
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


//kani siya ga configure sa multer nga disk storage and ang upload directory ani kay sa uploads folder and kung mag upload nag file naka orig name
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


//tester ni nako if ni work akoang backend kung mag get ko sa postman mag send siya hello world
app.get('/', (req, res) => {
    res.send('Hello World');
});


//mao ni dari if mag upload nakag file multer ang ga handle sa file na ge upload then mag send siyag json response sa info sa file na ge upload
app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json(req.file);
});

//mao ni siya ga delete sa file nga ge upload kung mag delete na sucess if dili meaning wala ang file sa uploads directory
app.delete('/api/delete/:filename', (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).send({ error: 'File not found' });
        }
        res.send({ message: 'File deleted successfully' });
    });
});

//port ni siya
const port = process.env.PORT || 8000;

//message rani nga running ang port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// wala nako na buhat ang uban specially ang sa crypto nga public key and private key lisod siya kay dili pa kaayo ko 
//familiar sa node.js makaya nako for now kay simple nga CRUD but willing to learn ko.
