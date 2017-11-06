var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 5000;
var user = require('./routers/user-router.js');

app.use(bodyParser.json());
app.use(express.static('server/public'));

app.use('/user', user);

var databaseUrl = 'mongodb://localhost:27017/user';

mongoose.connection.on('connected', function () {
    console.log('mongoose is connected');
});

mongoose.connection.on('error', function () {
    console.log('mongoose failed');
});

mongoose.connect(databaseUrl);

app.listen(port, function () {
    console.log('Listening on port:', port)
});

