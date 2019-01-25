'use strict';
const express = require('express');
const express = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const passport = require('passport');
const jwtAuth = passport.authenticate('jwt', {
    brew: false
});

const {Brew} = require('./homebrew');
const {Hops} = require('./hops');
const {Malt} = require('./malts');
const {Yeast} = require('./yeast');
const {Mash} = require('./mash');

const router = express.Router();

const jsonParser = bodyParser.json();

// Post to submit new brew to the database *for each variable of the recipe*
router.post('/', jwtAuth, jsonParser, (req, res) => {
    console.log('submitting homebrew');
    let brewName = req.body.recipe.brewName;
    let hopsName = req.body.recipe.hopsName;
    let hopsMeasurement = req.body.recipe.hopsMeasurement;
    let yeastName = req.body.recipe.yeastName;
    let yeastMeasurement = req.body.recipe.yeastMeasurement;
    let maltName = req.body.recipe.maltName;
    let maltMeasurement = req.body.recipe.maltMeasurement;
    let mashSchedule = req.body.recipe.mashSchedule;
    let userId = req.user.id;
    let ObjectId = mongoose.Types.ObjectId;
    let userRecipe = new ObjectId(userId);
    Brew.findOne({
        userId: userId,
        brewName: brewName
    }).exec()
    .then(function (brew) {
        console.log('seeing if you have a recipe with the same name...');
        if (brewName == "null" || brewName == null || brewName == "") {
            return Brew.create({
                brewName,
                abv,
                userId,
                brewId,
                unique: false
            })
            .then(brew => {
                console.log('submitted brewname and abv');
                return Hops.create({
                    hopsName,
                    hopsMeasurement,
                    brewId,
                    unique: false
                })
                .then(hops => {
                    console.log('submitted hops name and measurement');
                })
            })
            .then(brew => {
                return Malt.create({
                    maltName,
                    maltMeasurement,
                    brewId,
                    unique: false
                })
                .then(malt => {
                    console.log('submitted malt name and measurement');
                })
            })
            .then(brew => {
                return Yeast.ceate({
                    yeastName,
                    yeastMeasurement,
                    brewId,
                    unique: false
                })
                .then(yeast => {
                    console.log('submitted yeast name and measurement');
                })
            })
            .then(brew => {
                return Mash.create({
                    mashSchedule,
                    brewId,
                    unique: false
                })
                .then(mash => {
                    console.log('submitted mash schedule');
                })
                return res.status(201).json(brew.serialize());
            })
            .catch(err => {
                console.log(err);
                if(err.reason === 'ValidationError') {
                    return res.status(err.code).json(err);
                }
                res.status(500).json({
                    code: 500,
                    message: err
                });
            })
        } else {
            return res.status(409).json({
                message: 'You have a recipe with the same name',
                code: 409
            });
            // trigger a recipe overwrite option for the user
        }
    })
})


// Put to edit existing brew
router.put('/:id', jsonParser, (req, res) => {
    const updateData = req.body.recipe;
    let ObjectId = mongoose.Types.ObjectId;
    let brewId = new ObjectId(req.params.id);
    const conditions = {
        _id: brewId
    };
    const brewName = updateData.brewName;
    const hopsName = updateData.hopsName;
    const hopsMeasurement = updateData.hopsMeasurement;
    const yeast
})

// Get by id to retrieve user's brews
router.get('/:id', jsonParser, (req, res) => {
    const id = req.params.id;
    return Brew.findById(id).exec()
        .then((brew) => {
            console.log(brew);
            return res.status(200).json({
                data: brew,
                message: 'brew found'
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({
                message: "no brews found"
            });
        })
});

// Get to retrieve all brews, then parse for names that match keyword
router.get('/', (req, res) => {
    return Brew.find()
        .then((brew) => {
            console.log('brews retrieved');
            return res.status(200).send(brew).end();
        })
        .catch((err) => {
            console.log(err);
    });
});


// Delete to remove a brew from the database
router.delete('/:id', (req, res) => {
    const idForRemoval = req.params.id;
    Brew.findByIdAndRemove(idForRemoval)
    .then(() => {
        console.log(`Deleted homebrew recipe`);
        return res.status(204).end();
    });
});



module.exports = {router};