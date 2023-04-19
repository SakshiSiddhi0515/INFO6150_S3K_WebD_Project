'use strict'

const Artist = require('../models/artist');
const fs = require('fs');
const path = require('path');

function saveArtist(req, res) {
    var param = req.body;
    var artist = new Artist();

    if(param.name && param.description){
        artist.name = param.name;
        artist.description = param.description;
        artist.image = null;

        artist.save((error, artistStored) => {
            if(error){
                res.status(500).send({
                    message : 'Error in the request'
                })    
            }else{
                if(!artist){
                    res.status(404).send({
                        message : 'Error creating the artist'
                    })
                }else{
                    res.status(200).send({
                        artist : artistStored
                    })
                }
            }
        })
    }else{
        res.status(200).send({
            message : 'All fields are required'
        })
    }
}

function getArtist(req, res) {
    var artistId = req.params.id;

    Artist.findById(artistId,(error, artist) => {
        if(error){
            res.status(500).send({
                message : 'Error in the request'
            })
        }else{
            if(!artist){
                res.status(404).send({
                    message : 'Artist no founded'
                })
            }else{
                res.status(200).send({
                    artist
                })
            }
        }
    })
}

function getArtists(req, res) {
    var page = (req.params.page) ? req.params.page :1;
    var items = (req.params.limit) ? parseInt(req.params.limit) :10;
    
    Artist.paginate(Artist.find().sort('name'),{ page: page, limit: items }, function(error, artists, total) {
        if(error){
            res.status(500).send({
                message : 'Error in the request',
                error: error
            })
        }else{
            if(!artists){
                res.status(200).send({
                    message : 'There are no artists'
                })  
            }else{
                res.status(200).send({
                    artists: artists,
                    totalItems: total
                })
            }
        }
    })
}

function uploadImage(req, res){
    var artistId = req.params.id;
    var filename = 'file not uploaded';

    if(req.files){
        let filePath = req.files.image.path;
        let fileSplit = filePath.split('\\');
        filename = fileSplit[2];

        let extSplit = filename.split('\.');
        let fileExt = extSplit[1];

        if(fileExt == 'png' || fileExt == 'jpg'){
            Artist.findByIdAndUpdate(artistId, {image : filename}, (error, artistUpdated) => {
                if (error) {
                    res.status(500).send({
                        message : 'Error in the request'
                    })
                } else {
                    res.status(200).send({
                        artist : artistUpdated
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

function getImage(req, res) {
    var image = req.params.imageFile;
    var pathFiles = './uploads/artists/'+image;

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

function updateArtist(req, res){
    let idArtist = req.params.id;
    let artist = req.body;

    Artist.findByIdAndUpdate(idArtist,artist,(error, artistUpdated) => {
        if(error){
            res.status(500).send({
                message : 'Error in the request'
            })
        }else{
            if(!artistUpdated){
                res.status(404).send({
                    message : 'The artist could not be updated '
                })
            }else{
                res.status(200).send({
                    artist:artistUpdated
                })
            }
        }
    })
}

function deleteArtist(req, res) {
    let idArtist = req.params.id;
    //Artist.findByIdAndRemove(idArtist,(error, artistRemoved)=> {
    Artist.findOne({ _id : idArtist },function(error, artist){ 
        artist.remove().then(function (removed) {
            if(!removed){
                res.status(404).send({
                    message : 'The artist could not be removed '
                })
            }else{
                res.status(200).send({
                    artist:removed
                })
            }
        }).catch(function (err) {
            res.status(500).send({
                message : 'Error in the request'
            })
        })
    })
}

module.exports = {
    getArtists,
    saveArtist,
    getImage,
    uploadImage,
    getArtist,
    updateArtist,
    deleteArtist
}