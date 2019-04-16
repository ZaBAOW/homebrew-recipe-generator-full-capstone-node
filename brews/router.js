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
                return res.status(201).json({message: 'your recipe has been posted!'});
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
    const updateData = req.query;
    let ObjectId = mongoose.Types.ObjectId;
    let userId = new ObjectId(req.params.id);
    console.log(userId);
    const conditionOne = {
        userId: userId
    };
    const editedId = req.query.brewId.replace(/['"]+/g, '');
    let brewId = new ObjectId(editedId);
    console.log(brewId);
    const conditionTwo = {
        brewId: JSON.stringify(brewId)
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
    
    Brew.findOneAndUpdate(conditionOne, updateHomebrew, options)
        .exec()
        .then(homebrew => {
                console.log('updated homebrew:', homebrew);
                return res.status(204).end();
        })
        .catch(err => {
            console.log(err);
        })
    
    Malt.findOneAndUpdate(conditionTwo, updateMalt, options)
        .exec()
        .then(malt => {
            console.log('updated malt', malt);
            return res.status(204).end();
        })
        .catch(err => {
            console.log(err);
        })
    
    Hops.findOneAndUpdate(conditionTwo, updateHops, options)
        .exec()
        .then(hops => {
            console.log('updated hops', hops);
            return res.status(204).end();
        })
        .catch(err => {
            console.log(err);
        })
    
    Yeast.findOneAndUpdate(conditionTwo, updateYeast, options)
        .exec()
        .then(yeast => {
            console.log('updated yeast', yeast);
            return res.status(204).end();
        })
        .catch(err => {
            console.log(err);
        })
    
    return Mash.findOneAndUpdate(conditionTwo, updateMash, options)
        .exec()
        .then(mash => {
            console.log('updated mash', mash)
            return res.status(204).end();
        })
        .catch(err => {
            console.log(err);
        })
})

// Get by id to retrieve user's brews
router.get('/getArchive/:id', jsonParser, (req, res) => {
    const id = req.params.id;
    return Brew.find({ userId: id}).exec()
        .then((brew) => {
            console.log('brew list: ', brew);
            console.log('length of brew: ', brew.length);
            for (var i=0; i < brew.length-1; i++) {
                console.log('brew: ', brew[i]._id);
                const brewId = JSON.stringify(brew[i]._id);
                console.log('current interval: ', i);
                console.log('stringified brewId: ', brewId);
                Hops.find({brewId: brewId})
                .then(hops => {
                    console.log('hops: ',hops[0]);
                    const returnHops = hops[0];
                })
                .catch(err => {
                    console.log('hopsError', err);
                })
                Malt.find({brewId: brewId})
                .then(malt => {
                    console.log('malt', malt[0]);
                    let returnMalt = malt[0];
                })
                .catch(err => {
                    console.log('maltError', err);
                })
                Yeast.find({brewId: brewId})
                .then(yeast => {
                    console.log('yeast', yeast[0]);
                    let returnYeast = yeast[0];
                })
                .catch(err => {
                    console.log('yeastError', err);
                })
                Mash.find({brewId: brewId})
                .then(mash => {
                    console.log('mash', mash[0]);
                    let returnMash = mash[0];
                })
                .catch(err => {
                    console.log('mashError', err);
                })
            }
            return res.status(200).json({
                data: {
                    brew,
                    returnHops,
                    returnMalt,
                    returnYeast,
                    returnMash
                },
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

// Get to retrieve all brews
router.get('/get-all', (req, res) => {
    return Brew.find()
        .then((brew) => {
            console.log('brews retrieved');
            return res.status(200).send(brew).end();
        })
        .catch((err) => {
            console.log(err);
    });
});


// Get to retireve all brews that contain keyword
router.get('/get-one/:keyword', (req, res) => { 
    console.log('searching for brews...');
    const keyword = req.params.keyword;
    console.log(keyword);
    Brew.find()
    .then((brews) => {
        let searchResults = []
        console.log(brews.length);
        for(var i=0; i < brews.length; i++) {
            console.log('sorting through brews');
            if(brews[i].brewName.includes(keyword)) {
                searchResults.push(brews[i]);
            } else {
                return;
            }
        }
        console.log(`Found all beers that contain `, keyword);
        return res.status(200).send(searchResults).end();
    })
    .catch((err) => {
        console.log(err);
    });
});


// Delete to remove a brew from the database
router.delete('/deleteRecipe/:id', (req, res) => {
    const idForRemoval = req.params.id;
    Brew.findByIdAndRemove(idForRemoval)
    .then(() => {
        console.log(`Deleted homebrew recipe`);
        return res.status(204).end();
    });
});



module.exports = {router};