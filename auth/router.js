'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Logged } = require('./models');
const { User } = require('../users/models');

const config = require('../config');
const router = express.Router();

const createAuthToken = function(user) {
  console.log('processing token for: ', user);
  return jwt.sign({user}, config.JWT_SECRET, {
    subject: user.username,
    expiresIn: config.JWT_EXPIRY,
    algorithm: 'HS256'
  });
};

const localAuth = passport.authenticate('local', {session: false});
router.use(bodyParser.json());
// The user provides a username and password to login
router.post('/login', localAuth, (req, res) => {
  console.log('generating your authToken...');
  const authToken = createAuthToken(req.user.serialize());
  res.json({authToken});
});

const jwtAuth = passport.authenticate('jwt', {session: false});

// The user exchanges a valid JWT for a new one with a later expiration
router.post('/refresh', jwtAuth, (req, res) => {
  const authToken = createAuthToken(req.user);
  res.json({authToken});
});

router.get("/userLoggedIn", function(req, res) {
  Logged.find({})
    .then(users => {
      res.json({loggedIn: users});
    })
    .catch(err => {
      return res.status(400).json(res.statusMessage);
    });
});

router.post("/userLoggedIn", function(req, res) {
  console.log("creating persistant logged session...");
  console.log('session for: ', req.body.username);
  Logged.create({
    userLoggedIn: req.body.username
  })
  .then(user => {
    console.log('response', user);
    Logged.findOne({userLoggedIn: user.userLoggedIn})
      .then(users => {
        console.log('users', users)
        User.find({username: users.userLoggedIn})
         .then(response => {
           console.log('user search result: ', response[0]._id);
           const id = response[0]._id;
           return res.status(201).json({loggedIn: id});
        });
      });
  })
  .catch(err => {
    return res.status(400).json(res.statusMessage);
  });
});

router.delete("/userLoggedIn", function(req, res) {
    console.log("user to be deleted for log list: ", req.body.user);
    Logged.deleteMany({
        usersLoggedIn: req.body.user
    })
    .then(user => {
        console.log(`Deleted user`);
        return res.status(204).json({message: 'Deleted user from login list'});
    })
    .catch(err => {
        return res.status(400).json(res.statusMessage);
    });
});

module.exports = {router};