'use strict';
const express = require('express');
const mongoose = require('mongoose');
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

// Post to submit new brew to the database *for each variable of the recipe*
router.post('/', jsonParser, (req, res) => {
    console.log('submitting homebrew');
    let brewName = req.query.brewName;
    let abv = req.query.abv;
    let hopsName = req.query.hopsName;
    let hopsMeasurement = req.query.hopsMeasurement;
    let yeastName = req.query.yeastName;
    let yeastMeasurement = req.query.yeastMeasurement;
    let yeastSchedule = req.query.yeastSchedule;
    let maltName = req.query.maltName;
    let maltMeasurement = req.query.maltMeasurement;
    let mashSchedule = req.query.mashSchedule;
    let userId = req.query.userId;
    let brewId = '';
//    console.log(req.query);
    const recipe = {
        brewName,
        abv,
        hopsName,
        hopsMeasurement,
        yeastName,
        yeastMeasurement,
        yeastSchedule,
        maltName,
        maltMeasurement,
        mashSchedule
    }
//    console.log(recipe);
    
    let ObjectId = mongoose.Types.ObjectId;
    let userRecipe = new ObjectId(userId);
    Brew.findOne({
        userId: userId,
        brewName: brewName
    }).exec()
    .then(function (brew) {
        console.log('seeing if you have a recipe with the same name...');
        if (brew == "null" || brew == null || brew == "") {
            return Brew.create({
                brewName: recipe.brewName,
                abv: recipe.abv,
                userId: req.query.userId,
                unique: false
            })
            .then(brew => {
                console.log('submitted brewname and abv');
                brewId = JSON.stringify(brew._id);
                console.log(brewId);
                return Hops.create({
                    hopsName: recipe.hopsName,
                    hopsMeasurement: recipe.hopsMeasurement,
                    brewId: brewId,
                    unique: false
                })
                .then(hops => {
                    console.log('submitted hops name and measurement');
                })
            })
            .then(brews => {
                const id = brewId;
                return Malt.create({
                    maltName: recipe.maltName,
                    maltMeasurement: recipe.maltMeasurement,
                    brewId: id,
                    unique: false
                })
                .then(malt => {
                    console.log('submitted malt name and measurement');
                })
            })
            .then(brew => {
                const id = brewId;
                return Yeast.create({
                    yeastName: recipe.yeastName,
                    yeastMeasurement: recipe.yeastMeasurement,
                    yeastSchedule: recipe.yeastSchedule,
                    brewId: id,
                    unique: false
                })
                .then(yeast => {
                    console.log('submitted yeast name and measurement');
                })
            })
            .then(brew => {
                const id = brewId;
                    Mash.create({
                    mashSchedule: recipe.mashSchedule,
                    brewId: id,
                    unique: false
                })
                .then(mash => {
                    console.log('submitted mash schedule');
                })
                brewId = '';
                return res.status(201);
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
    const abv = updateData.abv;
    const hopsName = updateData.hopsName;
    const hopsMeasurement = updateData.hopsMeasurement;
    const yeastName = updateData.yeastName;
    const yeastMeasurement = updateData.yeastMeasurement;
    const yeastSchedule = updateData.yeastSchedule;
    const maltName = updateData.maltName;
    const maltMeasurement = updateData.maltMeasurement;
    const mashSchedule = updateData.mashSchedule;
    
    const updateHomebrew = {
        brewName,
        abv
    };
    
    const updateMalt = {
        maltName,
        maltMeasurement
    };
    
    const updateYeast = {
        yeastName,
        yeastMeasurement,
        yeastSchedule
    };
    
    const updateHops = {
        hopsName,
        hopsMeasurement
    };
    
    const updateMash = {
        mashSchedule
    }
    
    const options = {
        new: true
    };
    
    return Brew.findOneAndUpdate(conditions, updateHomebrew, options)
        .exec()
        .then(homebrew => {
                console.log(homebrew);
                return res.status(204).end();
        })
        .catch(err => {
            console.log(err);
        })
    
    return Malt.findOneAndUpdate(conditions, updateMalt, options)
        .exec()
        .then(malt => {
            console.log(malt);
            return res.status(204).end();
        })
        .catch(err => {
            console.log(err);
        })
    
    return Hops.findOneAndUpdate(conditions, updateHops, options)
        .exec()
        .then(hops => {
            console.log(hops);
            return res.status(204).end();
        })
        .catch(err => {
            console.log(err);
        })
    
    return Yeast.findOneAndUpdate(conditions, updateYeast, options)
        .exec()
        .then(yeast => {
            console.log(yeast);
            return res.status(204).end();
        })
        .catch(err => {
            console.log(err);
        })
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