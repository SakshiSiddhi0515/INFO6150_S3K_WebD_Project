'use strict'

const express = require('express');
const bodyParser = require('body-parser');

var userRoutes = require('./routes/user');
var artistRouter = require('./routes/artist');
var albumRouter = require('./routes/album');
var songRouter = require('./routes/song');
var playBack = require('./routes/playback');
var fileRoutes = require('./routes/files');

// const multer = require('multer');

const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '../client/src/assets/localSongs'); // Replace 'uploads/' with the directory where you want to store uploaded files
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     }
//   });
  
  //Create multer instance
//   const upload = multer({ storage: storage });
  
  //Handle file upload
//   app.post('/upload', upload.single('file'), (req, res) => {
//     res.status(200).send('File uploaded successfully!');
//   });

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow','GET, POST, OPTIONS, PUT, DELETE');
    next();
})

app.use('/api', userRoutes);
app.use('/api', artistRouter);
app.use('/api', albumRouter);
app.use('/api', songRouter);
app.use('/api',playBack);
app.use('/api', fileRoutes)
module.exports = app;