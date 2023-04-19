'use strict'

var express = require('express');
var multipart = require('connect-multiparty');
var authenticated = require('../middlewares/authenticated');


var playbackController = require('../controllers/playback');
var api = express.Router();

api.post('/playback',authenticated.ensureAuth,playbackController.save);
api.get('/playcounter',authenticated.ensureAuth,playbackController.getPlayCounter);

module.exports = api;