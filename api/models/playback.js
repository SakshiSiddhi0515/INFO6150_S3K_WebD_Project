'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var playbackSchema = new Schema({
    user : [{ type : Schema.Types.ObjectId, ref :'User' }],
    song : [{ type : Schema.Types.ObjectId, ref :'Song' }]
})

const Playback = mongoose.model('Playback', playbackSchema);
module.exports = Playback;