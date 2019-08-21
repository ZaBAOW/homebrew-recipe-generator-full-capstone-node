'use strict';
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { Logged } = require('./models');

const config = require('../config');
const router = express.Router();

const createAuthToken = function(user) {
  console.log('secret', JSON.stringify(config.JWT_SECRET));
  console.log('processing token for: ', user);
  return jwt.sign({subject: user.username}, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY}, 'HS256');
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
  console.log(req.body);
  Logged.create({
    usersLoggedIn: req.body.user
  })
  .then(user => {
    console.log(user);
    Logged.find({})
      .then(users => {
        console.log(users);
        return res.status(201).json({loggedIn: users});
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