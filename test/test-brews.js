'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {Brew, Hops, Yeast, Malt, Mash} = require('../brews/index');
const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;
chai.use(chaiHttp);

describe('/api/brews', function() {
    const brewName = 'testBrew';
    const abv = 'test%';
    const userId = 'testId';
    const hopsName = 'testHops';
    const hopsMeasure = 'testHopsMeasure';
    const maltName = 'testMalt';
    const maltMeasure = 'testMaltMeasure';
    const yeastName = 'testYeast';
    const yeastMeasure = 'testYeastMeasure';
    const yeastSchedule = 'testYeastSchedule'
    const mashSchedule = 'testMashSchedule';
    
    
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });

      after(function(){
        return closeServer();
      });

    beforeEach(function() {});

    afterEach(function() {
        return Brew.remove({});
    });
    
    describe('GET', function() {
        it('should retrieve all brews in the database', function() {
            Brew.create(
                {
                    brewName,
                    abv,
                    userId
                },
                {
                    brewName: 'testBrew2',
                    abv: 3,
                    userId: 'testId2'
                }
            )
            .then(function() {
                return chai.request(app).get('/get-all')
                .then(function(res) {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    expect(res.body).to.have.length(2);
                });
            });
        });
        
        it('should retrieve all brews that match the given keyword', function() {
            const keyword = 'test'
            Brew.create(
                {
                    brewName,
                    abv,
                    userId
                },
                {
                    brewName: 'testBrew2',
                    abv: 3,
                    userId: 'testId2'
                }
            )
            .then(function() {
                return chai.request(app).get(`/get-one/${keyword}`)
                .then(function(res) {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                });
            });
        });
        
        it('should retrieve all beers created by a user', function() {
            const currentId = 'testId';
            Brew.create(
                {
                    brewName,
                    abv,
                    userId
                },
                {
                    brewName: 'testBrew2',
                    abv: 3,
                    userId: 'testId'
                }
            )
            .then(function() {
                return chai.request(app).get(`/getArchive/${currentId}`)
                .then(function(res) {
                    console.log(res.body);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                });
            });
        });
        
        it('should retrieve the recipe contents for the selected brew', function() {
            const keyword = brewName;
            const userId = 'testUserId';
            return Brew.create({
                brewName,
                abv,
                userId
            })
            .then(brew => {
                console.log('made brewname');
                const brewId = JSON.stringify(brew._id);
                return Hops.create({
                    hopsName,
                    hopsMeasurement: hopsMeasure,
                    brewId
                })
            })
            .then(brew => {
                console.log('made hops');
                const id = JSON.stringify(brew._id);
                return Malt.create({
                    maltName,
                    maltMeasurement: maltMeasure,
                    brewId: id
                })
            })
            .then(brew => {
                console.log('made malt');
                const id = JSON.stringify(brew._id);
                return Yeast.create({
                    yeastName,
                    yeastMeasurement: yeastMeasure,
                    yeastSchedule,
                    brewId: id
                })
            })
            .then(brew => {
                console.log('made yeast');
                const id = JSON.stringify(brew._id);
                return Mash.create({
                    mashSchedule,
                    brewId: id
                })
            })
            .then(brew => {
                const id = brew._id;
                console.log(id);
                return chai.request(app).get(`/viewBrew/${id}`)
                .then(res => {
                    console.log('selected brew recipe', res.status);
                    expect(res).to.have.status(200);
                });
            });
        });
    });
    
    describe('DELETE', function() {
        it('should remove the brew by given id', function () {
            Brew.create(
                {
                    brewName,
                    abv,
                    userId
                }
            )
            .then(brew => {
                var id = brew._id;
                return chai.request(app).delete(`/deleteRecipe/${id}`)
                .then(res => {
                    expect(res).to.have.status(204);
                });
            });
        });
    });
    
    describe('POST', function() {
        it('should post a new recipe to the database', function () {
            const brewObj = {
                brewName,
                abv,
                maltName,
                maltMeasure,
                yeastName,
                yeastMeasure,
                hopsName,
                hopsMeasure,
                yeastSchedule,
                mashSchedule
            };
            const userBrew = { brew: brewObj, id: userId };
            console.log('userBrew: ', userBrew);
            return chai.request(app).post('/')
            .then(res => {
                console.log(res.body);
                expect(res).to.have.status(201);
            });
        });
    });
});


//Brew.create(
//                {
//                    brewName,
//                    abv,
//                    userId
//                }
//            )
//            .then(function(brew) {
//                const brewId = brew._id;
//                console.log('selected brewId', brewId);
//                Hops.create(
//                    {
//                        hopsName: 'testHops',
//                        hopsMeasurement: 5,
//                        brewId: brewId
//                    }
//                )
//                .then(function(hops) {
//                    console.log('created hops');
//                    Yeast.create(
//                        {
//                            yeastName: 'testYeast',
//                            yeastMeasurement: 5,
//                            yeastSchedule: 'testYeastSchedule',
//                            brewId: brewId
//                        }
//                    )
//                    .then(function() {
//                        console.log('created yeast');
//                        Malt.create(
//                            {
//                                maltName: 'testMalt',
//                                maltMeasurement: 5,
//                                brewId: brewId
//                            }
//                        )
//                        .then(function() {
//                            console.log('created malt');
//                            Mash.create(
//                                {
//                                    mashSchedule: 'testMashSchedule',
//                                    brewId: brewId
//                                }
//                            )
//                            .then(function() {
//                                console.log('created mash');
//                                return chai.request(app).get(`/viewBrew/${brewId}`)
//                                .then(function(res) {
//                                    console.log('retrieved recipes', res.body);
//                                });
//                            });
//                        });
//                    });
//                });
//            });