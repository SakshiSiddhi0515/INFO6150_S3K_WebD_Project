'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var authenticated = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir : './uploads/artists' });


var artistController = require('../controllers/artist');
var api = express.Router();

api.get('/artists/:page?/:limit?', authenticated.ensureAuth ,artistController.getArtists);
api.get('/artist/:id', authenticated.ensureAuth, artistController.getArtist);
api.get('/getImageArtist/:imageFile',artistController.getImage);
api.post('/saveArtist', authenticated.ensureAuth, artistController.saveArtist );
api.post('/uploadArtistImg/:id', [authenticated.ensureAuth, md_upload], artistController.uploadImage);
api.put('/updateArtist/:id', authenticated.ensureAuth, artistController.updateArtist);
api.delete('/deleteArtist/:id', authenticated.ensureAuth, artistController.deleteArtist);

module.exports = api;