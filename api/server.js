const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

const app1 = express();
const upload = multer({ dest: '../client/src/assets/localSongs' }); // Specify the destination folder for file uploads

app1.use(bodyParser.urlencoded({extended:false}));
app1.use(bodyParser.json());

app1.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
})
// Define the API endpoint for file upload
app1.post('/upload', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if(!file) {
        res.status(400).send('No File Uploaded');
    } else {
        const fs = require('fs');
        fs.renameSync(file.path, `../client/src/assets/localSongs/${file.originalname}`);
        res.send('File uploaded and saved successfully');
    }
    // Access the uploaded file using req.file and save it to a local folder
    // Add your logic here to handle the file and send any relevant response or metadata
    // res.status(200).send({ message: 'File uploaded successfully' });
  });
  
  // Start the server
  app1.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
  });

  module.exports = app1;