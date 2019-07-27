'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {Brew, Hops, Yeast, Malt, Mash} = require('../brews/index');
const {TEST_DATABASE_URL} = require('../config');

const expect = chai.expect;
chai.use(chaiHttp);
//
//
//function seedBrews() {
//    const brew1 = {
//        brewName,
//        abv,
//        userId,
//        _id: ObjectId('5b8de6abc7147a5a52c21762')
//    };
//
//    const brew2 = {
//        brewName: "testBrew2",
//        abv: 3,
//        userId: testId,
//        _id: ObjectId('5b8de6abc7147a5a52c21762')
//    };
//
//    return Brew.create(brew, brew2);
//}
//
describe('/api/brews', function() {
    const brewName = 'testBrew';
    const abv = 'test%';
    const userId = '5b8de6abc7147a5a52c21762';
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
    
    after(function() {
        return closeServer();
    });
    
    beforeEach(function() {});

    afterEach(function() {
        Brew.remove({});
        return Hops.remove({});
        return Yeast.remove({});
        return Malt.remove({});
        return Mash.remove({});
    });
//    
//    it('should retrieve all brews in the database', function() {
//        let res;
//        return Brew.create(
//            {
//                brewName,
//                abv,
//                userId
//            },
//            {
//                brewName: 'testBrew2',
//                abv: 3,
//                userId: 'testId2'
//            }
//        )
//        .then(()=> chai.request(app).get('/brews/get-all'))
//        .then(function(res) {
//            console.log('all the brews found: ', res.body);
//            expect(res).to.have.status(200);
//            expect(res.body).to.be.an('array');
//            expect(res.body).to.have.length(2);
//        })
//        .catch(err => {
//            console.log(err);
//        });
//    });
//
//    it('should retrieve all brews that match the given keyword', function() {
//        let res;
//        const keyword = 'test'
//        return Brew.create(
//            {
//                brewName,
//                abv,
//                userId
//            },
//            {
//                brewName: 'testBrew2',
//                abv: 3,
//                userId: 'testId2'
//            }
//        )
//        .then(() => chai.request(app).get(`/brews/get-one/${keyword}`))
//            .then(function(res) {
//                console.log(`all brews that include ${keyword}`, res.body);
//                expect(res).to.have.status(200);
//                expect(res.body).to.be.an('array');
//                expect(res.body.length).to.equal(2);
//            });
//        });

//    it('should retrieve all beers created by a user', function() {
//        let res;
//        const currentId = 'testId';
//        return Brew.create(
//            {
//                brewName,
//                abv,
//                userId
//            },
//            {
//                brewName: 'testBrew2',
//                abv: 3,
//                userId: 'testId'
//            }
//        )
//        .then(() => chai.request(app).get(`/brews/getArchive/${currentId}`))
//            .then(function(res) {
//                console.log(res.body);
//                expect(res).to.have.status(200);
//                expect(res.body.data).to.be.an('array');
//                expect(res.body.data.length).to.equal(2);
//            });
//        });
        
//    it('should retrieve the recipe contents for the selected brew', function() {
//        return Brew.create({
//            brewName,
//            abv,
//            userId
//        })
//        .then(brew => {
//            console.log('made brewname');
//            const id = brew._id;
//            return Hops.create({
//                hopsName,
//                hopsMeasurement: hopsMeasure,
//                brewId: id
//            })
//        })
//        .then(brew => {
//            console.log('made hops');
//            const id = brew.brewId;
//            return Malt.create({
//                maltName,
//                maltMeasurement: maltMeasure,
//                brewId: id
//            })
//        })
//        .then(brew => {
//            console.log('made malt');
//            const id = brew.brewId;
//            return Yeast.create({
//                yeastName,
//                yeastMeasurement: yeastMeasure,
//                yeastSchedule,
//                brewId: id
//            })
//        })
//        .then(brew => {
//            console.log('made yeast');
//            const id = brew.brewId;
//            return Mash.create({
//                mashSchedule,
//                brewId: id
//            })
//        })
//        .then(brew => {
//            const id = brew.brewId;
//            console.log(id);
//            return chai.request(app).get(`/brews/viewBrew/${id}`)
//            .then(res => {
//                console.log('selected brew recipe', res.body);
//                expect(res).to.have.status(200);
//            });
//        });
//    });
////
////    
//    it('should remove the brew by given id', function () {
//        Brew.create(
//            {
//                brewName,
//                abv,
//                userId
//            }
//        )
//        .then(brew => {
//            var id = brew._id;
//            return chai.request(app).delete(`/brews/deleteRecipe/${id}`)
//            .then(res => {
//                expect(res).to.have.status(204);
//            });
//        });
//    });
////    
////
//    it('should post a new recipe to the database', function () {
//        const brewObj = {
//            brewName,
//            abv,
//            maltName,
//            maltMeasure,
//            yeastName,
//            yeastMeasure,
//            hopsName,
//            hopsMeasure,
//            yeastSchedule,
//            mashSchedule
//        };
//        const userBrew = { brew: brewObj, id: userId };
//        console.log('userBrew: ', userBrew);
//        return chai.request(app).post('/brews/').send(userBrew)
//        .then(res => {
//            console.log(res.body);
//            expect(res).to.have.status(201);
//        });
//    });
});