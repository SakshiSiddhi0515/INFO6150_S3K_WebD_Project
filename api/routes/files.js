'use strict'

var express = require('express');
// var multipart = require('connect-multiparty');
// var authenticated = require('../middlewares/authenticated');
// var md_upload = multipart({ uploadDir : './uploads/songs' });

// var songController = require('../controllers/song');
var api = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/src/assets/localSongs'); // Replace 'uploads/' with the directory where you want to store uploaded files
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  // Create multer instance
  const upload = multer({ storage: storage });

// api.post('/song',authenticated.ensureAuth,songController.save);
api.post('/upload', upload.single('file'), (req, res) => {
    res.status(200).send('File uploaded successfully!');
  });

module.exports = api;