'use strict'

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var schema = mongoose.Schema;

var UserSchema = schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
    image: String,
})

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('User',UserSchema);