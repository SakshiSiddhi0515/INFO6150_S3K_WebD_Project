'use strict'

const Song = require('../models/song');
const mongoose = require('mongoose');
const paginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const AlbumSchema = Schema({
    title: String,
    description: String,
    year: Number,
    image: String,
    artist: { type: Schema.ObjectId, ref: 'Artist' }
});


AlbumSchema.pre('remove', async function(){
    console.log('song removed');
    await Song.remove({ album : this._id }).exec();
})

AlbumSchema.plugin(paginate);
module.exports = mongoose.model('Album',AlbumSchema);