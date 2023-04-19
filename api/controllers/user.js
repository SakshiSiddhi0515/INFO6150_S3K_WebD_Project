'use strict'

const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../service/jwt');
const moongoosePaginate = require('mongoose-paginate');
const fs = require('fs');
const path = require('path');

function checkUserExist(user) {
    var res = false;
    if(user.email){
        
        res = User.findOne({ email : user.email.toLowerCase() }, (error , userFinded) => {
            
            if (!error && userFinded) {
                return true;   
            }else{
                return false;
            }
        })
    }
    return res;
}

function create(req, res){
    var user = new User();
    var params = req.body;

    //console.log(req.rawHeaders);

    if(params){
        if(params.name && params.lastname && params.password && params.role && params.email){
            user.name = params.name;
            user.lastname = params.lastname;
            user.email = params.email;
            user.role = params.role;
            user.image = null;

            User.findOne({ email : user.email.toLowerCase() }, (error , userFinded) => {
                if (userFinded) {
                    res.status(200).send({
                        message : "User already exists"
                    }); 
                    
                } else {
                    bcrypt.hash(params.password, null, null, function(error, hash) {
                        if (error) {
                            res.status(500).send({
                                message : "Error in the request"
                            });
                        } else {
                            user.password = hash;
                            user.save((err, userStored) => {
                                if (err) {
                                    res.status(500).send({
                                        message : "Error in the request"
                                    });
                                } else {
                                    if (!userStored) {
                                        res.status(200).send({
                                            message : "Error in the request"
                                        }); 
                                    } else {
                                        res.status(200).send({
                                            user : userStored
                                        });
                                    }
                                }
                            })
                        }
                    })   
                }
            })
        }else{
            res.status(200).send({
                message : 'All fields are required'
            });
        }
    }
}

function login(req, res){
    let params = req.body;

    if (params) {
        if (params.password && params.email) {
            User.findOne({ email : params.email.toLowerCase() }, (error , userFinded) => {
                if (error) {
                    res.status(500).send({
                        message : "Error in the request"
                    }); 
                } else {
                    if (userFinded) {
                        bcrypt.compare(params.password, userFinded.password, (err, result) => {
                            if (err) {
                                res.status(500).send({
                                    message : "Error in the request"
                                });         
                            } else {
                                if (result) {
                                    if (params.getToken) {
                                        res.status(200).send({
                                            token : jwt.createToken(userFinded)
                                        });     
                                    } else {
                                        res.status(200).send({
                                            user : userFinded
                                        });
                                    }
                                } else {
                                    res.status(200).send({
                                        message : 'Incorrect user or password'
                                    });
                                }
                            }
                        })       
                    }else{
                        res.status(200).send({
                            message : 'The email is not registered'
                        });
                    }
                }
            })
        }
    }
}

function getUsers(req, res){
    let itemPerPage = 10;
    let idUser = null;
    let currentPage = (req.params.page) ? req.params.page : 1;

    if(req.body._id){
        idUser = req.body._id;
    }

    console.log(currentPage);
    
    User.paginate(User.find({ _id: { $ne: idUser } }), { page: parseInt(currentPage), limit: 10 }, function(err, users, total) {

        if (!users) {
            res.status(500).send({ 
                message : "Error in the request",
                error: err
            });
        } else {
            res.status(200).send({
                items : 0,
                users : users
            });
        }
    })
}

function getUser(req, res){
    let userId = req.params.id;

    User.findById(userId,(error, user) => {
        if(error){
            res.status(500).send({
                message : "Error in the request"
            })
        }else{
            if(!user){
                res.status(200).send({
                    message : "No record found"
                })  
            }else{
                res.status(200).send({
                    user
                })
            }
        }
    })
}

function updateUser(req, res) {
    let idUser = req.params.id;
    let user = req.body;

    User.findByIdAndUpdate(idUser, user, (error, userUpdated) => {
        if (error) {
            res.status(500).send({
                message : 'Error in the request'
            })
        } else {
            if (!userUpdated) {
                res.status(404).send({
                    message : 'The user could not be updated '
                }) 
            } else {
                res.status(200).send({
                    user : userUpdated
                }) 
            }
        }
    })
}

function deleteUser(req, res) {
    let idUser = req.body.id;

    User.findOneAndDelete(idUser,(error, userRemove) => {
        if(error){
            res.status(500).send({
                message : "Error in the request"
            })
        }else{
            if(!userRemove){
                res.status(200).send({
                    message : "The user could not be deleted"
                })
            }else{
                res.status(200).send({
                    user : userRemove
                })
            }
        }
    })
}

function tmpUpload(req, res){
    var filename = 'file not uploaded';
    var userId = req.params.id;
    if(req.files){
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        filename = fileSplit[3];

        let extSplit = filename.split('\.');
        let fileExt = extSplit[1];
        if(fileExt == 'png' || fileExt == 'jpg'){
            var pathFiles = './uploads/users/tmp/'+filename;
            var fileRename = userId+'.'+fileExt;
            var rename = './uploads/users/tmp/'+fileRename;

            if (fs.existsSync(rename)) {
                fs.unlink(rename, function (err) {
                    if (err) throw err;
                    console.log('successfully deleted');
                });
            }
            
            fs.rename(pathFiles,rename,function (err) {
                if (err){
                    console.log(err);
                } else{
                    res.status(200).send({
                        file : fileRename
                    })
                }
            });
            
            
        }else{
            res.status(200).send({
                message : 'The file extension you want to upload is not valid'
            })
        }
    }
}

function uploadImage(req, res){
    var userId = req.params.id;
    var filename = 'file not uploaded';

    if(req.files){
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        filename = fileSplit[2];

        let extSplit = filename.split('\.');
        let fileExt = extSplit[1];

        if(fileExt == 'png' || fileExt == 'jpg'){
            User.findByIdAndUpdate(userId, {image : filename}, (error, userUpdated) => {
                if (error) {
                    res.status(500).send({
                        message : 'Error in the request'
                    })
                } else {
                    res.status(200).send({
                        user : userUpdated
                    }) 
                }
            })
        }else{
            res.status(200).send({
                message : 'The file extension you want to upload is not valid'
            })
        }
    }
}

function getImageProfile(req, res) {
    var image = req.params.imageFile;
    var tmp = req.params.tmpFile; 
    var pathFiles = './uploads/users/'+image;

    if(tmp){
        pathFiles = './uploads/users/tmp/'+image;
    }

    fs.exists(pathFiles,function (exist) {
        if(exist){
            res.sendFile(path.resolve(pathFiles));
        }else{
            res.status(200).send({
                message :'The image does not exist'
            });
        }
    } )
}

module.exports = {
    login,
    create,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    uploadImage,
    getImageProfile,
    tmpUpload
}