'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3789;

mongoose.connect('mongodb://127.0.0.1:27017/kunaldb',{useNewUrlParser: true},(error, response) => {
    if(error){
        throw error;
    }else{
        app.listen(port, ()=>{
            console.log("local server is running");
        })
    }
});