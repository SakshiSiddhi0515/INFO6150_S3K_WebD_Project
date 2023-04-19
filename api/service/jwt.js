'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const key = 'secret';

exports.createToken = function(user) {
    var payload = {
        id : user._id,
        name : user.name,
        lastname : user.lastname,
        email : user.email,
        role : user.role,
        image : user.image,
        iat : moment().unix(),
        exp : moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, key);
}