'use strict'

const mongoose =  require('mongoose');
const Artist = require('../models/artist');
const Album = require('../models/album');
const Song = require('../models/song');
const fs = require('fs');
const path = require('path');

function save(req, res) {
    var param = req.body;
    if(param.number && param.name && param.duration && param.gender && param.album){
        var song = new Song();
        song.number = param.number;
        song.name = param.name;
        song.duration = param.duration;
        song.gender = param.gender;
        song.file = null;
        song.album = param.album;

        song.save((error, songStored) => {
            if(error){
                res.status(500).send({
                    message : 'Error in the request'
                })
            }else{
                if(!songStored){
                    res.status(404).send({
                        message : 'Error creating the song'
                    })
                }else{
                    res.status(200).send({
                        song: songStored
                    })
                }
            }
        })
    }else{
        res.status(200).send({
            message : "All fields are required"
        })
    }
}

function getSongs(req, res) {
    let albumId = req.params.id;

    Song.find({album: albumId}).populate({path: 'album', populate: {path:'artist'}}).exec((error, songs)=> {
        if(error){
            res.status(500).send({
                message : 'Error in the request'
            })
        }else{
            if(!songs){
                res.status(404).send({
                    message : 'No records found'
                })
            }else{
                res.status(200).send({
                    song: songs
                })
            }
        }
    })
}

function uploadFile(req, res) {
    var songId = req.params.id;
    var filename = 'file no uploaded';

    if(req.files){
        let filePath = req.files.file.path;
        let fileSplit = filePath.split('\\');
        filename = fileSplit[2];

        let extSplit = filename.split('\.');
        let fileExt = extSplit[1];

        if(fileExt == 'mp3'){
            Song.findByIdAndUpdate(songId, {file : filename}, (error, songUpdated) => {
                if (error) {
                    res.status(500).send({
                        message : 'Error in the request'
                    })
                } else {
                    res.status(200).send({
                        song : songUpdated
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

function getFile(req, res){
    var file = req.params.file;
    var pathFiles = './uploads/songs/'+file;

    fs.exists(pathFiles,function (exist) {
        if(exist){
            res.sendFile(path.resolve(pathFiles));
        }else{
            res.status(200).send({
                message :'The file does not exist'
            });
        }
    } )
}

function getSong(req, res) {
    let songId = req.params.id;
    
    Song.findById(songId).populate({path: 'album', populate: {path:'artist'}}).exec((error, song)=> {
        if(error){
            res.status(500).send({
                message : 'Error in the request'
            })
        }else{
            if(!song){
                res.status(404).send({
                    message : 'Song not found'
                })
            }else{
                res.status(200).send({
                    song
                })
            }
        }
    })
}

function update(req, res) {
    let songId = req.params.id;
    let song = req.body;
    Song.findByIdAndUpdate(songId,song,(error, songUpdated) => {
        if(error){
            res.status(500).send({
                message : 'Error in the request'
            })
        }else{
            if(!songUpdated){
                res.status(404).send({
                    message : 'The song could not be updated'
                })
            }else{
                res.status(200).send({
                    song: songUpdated
                })
            }
        }
    })
}

function deleteSong(req, res) {
    let songId = req.params.id;
    Song.findByIdAndRemove(songId, (error, songRemoved) => {
        if(error){
            res.status(500).send({
                message : 'Error in the request'
            })
        }else{
            
            if(!songRemoved){
                res.status(404).send({
                    message : 'The song could not be eliminated'
                })
            }else{
                res.status(200).send({
                    song : songRemoved
                })
            }
        }
    })
}

function getByGender(req, res){
    var page = (req.params.page)?req.params.page:1;
    var items = 8;
    let gender = req.params.gender;
    Song.paginate(Song.find({ gender: gender }).populate({path: 'album', populate: {path:'artist'}}),{ 
        page : page, limit: items }, 
            function(error, songs){

                if(error){
                    res.status(500).send({
                        message : 'Error in the request'
                    })
                }else{
                    if(!songs){
                        res.status(404).send({
                            message : 'No records found'
                        })
                    }else{
                        res.status(200).send({
                            songs
                        })
                    }
                }
    })
}


module.exports = {
    save,
    getSongs,
    uploadFile,
    getFile,
    getSong,
    update,
    deleteSong,
    getByGender
}