'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var Album = require('../models/album');
var schema = mongoose.Schema;

var ArtistSchema = schema({
    name: String,
    description: String,
    image: String
})


ArtistSchema.pre('remove', async function(){
    console.log('album removed');
    await Album.findOne({ artist : this._id }, function(error, album){
        album.remove();    
    })
    
})
ArtistSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Artist', ArtistSchema);