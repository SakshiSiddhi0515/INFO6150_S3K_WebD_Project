'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var key = 'secret';

exports.ensureAuth = function(req, res, next){
    if (!req.headers.authorization) {
        return res.status(403).send({ message : "The request does not have the authentication header" });
    } else {
        var token = req.headers.authorization.replace(/['"]+/g, '');

        try {

            var payload = jwt.decode(token, key);
            if (payload.sub && (payload.exp <= moment().unix())) {
                return res.status(401).send({
                    message : 'The token has expired'
                })
            }
            
        } catch(ex) {
            res.status(404).send({
                message : 'Invalid token'
            })
        }

        req.user = payload;
        next();
    }
}