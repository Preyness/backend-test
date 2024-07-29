const express = require('express');
const app = express();

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

app.get('/', (req, res) => {
    res.send('Hello Worldsadasd');
});

app.post('/api/upload', upload.single('file'), (req, res) => {
    res.json(req.file);
});


const port = process.env.PORT || 8000;


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
