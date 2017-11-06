var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    user: String,
    message: String
});

var User = mongoose.model('User', UserSchema, 'users');

router.get('/', function(req, res){
    User.find({}, function(err, users){
        if(err) {
            res.sendStatus(500);
        } else {
            res.send(users);
        }
    });
})

router.post('/', function(req, res){
    console.log(req.body);
    var userToAdd = new User(req.body)
    userToAdd.save(function(err, data){
        if(err) {
            console.log(err);
            res.sendAStatus(500);
        } else {
            res.sendStatus(201);
        }
    })
});

router.delete('/:id', function (req, res) {
    console.log(req.params.id);
    var userId = req.params.id;
    User.findByIdAndRemove({ '_id': userId }, function (err, data) {
        if (err) {
            console.log('error' + err);
            res.sendStatus(500);
        } else {
            res.sendStatus(201);
        }
    });
});

router.put('/:id', function (req, res) {
    var rentalId = req.params.id;
    User.findByIdAndUpdate({ '_id': rentalId }, req.body)
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function (err) {
            res.sendStatus(500);
        });
});


module.exports = router;