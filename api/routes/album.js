'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var authenticated = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir : './uploads/albums' });

var albumController = require('../controllers/album');
var api = express.Router();

api.post('/album', authenticated.ensureAuth, albumController.saveAlbum);
api.get('/albums/:id/:page?/:limit?', authenticated.ensureAuth, albumController.getAlbums);
api.get('/last_albums/:limit?', authenticated.ensureAuth, albumController.getLastAlbums);
api.get('/album/:id',authenticated.ensureAuth, albumController.getAlbum);
api.post('/album_upload_image/:id', [authenticated.ensureAuth, md_upload], albumController.uploadImage);
api.get('/album_get_image/:imageFile', albumController.getImage);
api.put('/update_album/:id',authenticated.ensureAuth,albumController.updateAlbum);
api.delete('/delete_album/:id', authenticated.ensureAuth, albumController.deleteAlbum);

module.exports = api;