'use strict'

const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const Schema  = mongoose.Schema;

var SongSchema = Schema({
    number : Number,
    name: String,
    duration: String,
    file: String,
    gender: String,
    album : { type: Schema.ObjectId, ref:'Album' }
})

SongSchema.plugin(paginate);

module.exports = mongoose.model('Song',SongSchema);
