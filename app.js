const express = require('express');
const fs = require('fs');
const app = express();
const multer = require('multer');
const path = require('path');

// Ensure the upload directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json(req.file);
});

// Delete endpoint
app.delete('/api/delete/:filename', (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(404).send({ error: 'File not found' });
        }
        res.send({ message: 'File deleted successfully' });
    });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
