'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var authenticated = require('../middlewares/authenticated');
var md_upload = multipart({ uploadDir : './uploads/users' });
var tmp_upload = multipart({ uploadDir : './uploads/users/tmp' });

var userController = require('../controllers/user');

var api = express.Router();

api.post('/login', userController.login);
api.post('/user/create_admin', [authenticated.ensureAuth],userController.create);
api.post('/user/create_user', userController.create);
api.post('/user/list/:page?',[authenticated.ensureAuth],userController.getUsers );
api.get('/user/:id',authenticated.ensureAuth,userController.getUser);
api.put('/user/update/:id', authenticated.ensureAuth,userController.updateUser);
api.delete('/user/delete/:id', authenticated.ensureAuth, userController.deleteUser);
api.post('/user/upload_image/:id', [authenticated.ensureAuth, md_upload],userController.uploadImage);
api.get('/user/get_image_profile/:imageFile/:tmpFile?', userController.getImageProfile);
api.post('/user/upload_tmp/:id', [authenticated.ensureAuth, tmp_upload],userController.tmpUpload);


module.exports = api;