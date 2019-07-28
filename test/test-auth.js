'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const { app, runServer, closeServer } = require('../server');
const {User} = require('../users/models');
const { Logged } = require('../auth/models');
const { JWT_SECRET, DATABASE_URL, TEST_DATABASE_URL } = require('../config');

const expect = chai.expect;

chai.use(chaiHttp);


describe('Auth endpoints', function () {
    const username = 'exampleUser';
    const password ='examplePassword';
    
    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    after(function() {
        return closeServer();
    });

    beforeEach(function() {
        return User.hashPassword(password).then(password => User.create({
            username,
            password
        })
        );
    });

    afterEach(function () {
        return User.remove({});
        return Logged.remove({});
    });
    
    describe('/auth/login', function () {
//        it('Should return a valid auth token', function(){
//            return chai.request(app).post('/auth/login')
//            .send({username, password})
//            .then(res => {
//                expect(res).to.have.status(200);
//                expect(res.body).to.be.an('object');
//                const token = res.body.authToken;
//                console.log('token: ', token);
//                expect(token).to.be.a('string');
//                const payload = jwt.verify(token, JWT_SECRET, {
//                    algorithm: ['HS256']
//                });
//            });
//        });
        
        
//        it('Should store valid auth token in cookie', function() {
//            return chai.request(app).post('/auth/login')
//            .send({username, password})
//            .then(res => {
//                const sessionObj = res.headers['set-cookie'][0];
//                const re = /=(.*?)=/;
//                const cookieToken = sessionObj.match(re);
//                const compareCookie = cookieToken[1];
//                expect(res).to.have.status(200);
//                expect(res).to.be.an('object');
//            })
//        });
    });
    
    describe('/auth/refresh', function () {
//        it('Should return a valid auth token with a newer expiry date', function() {
//            const token = jwt.sign(
//                {
//                    user: {
//                        username
//                }
//                },
//                    JWT_SECRET,
//                {
//                    algorithm: 'HS256',
//                    subject: username,
//                    expiresIn: '7d'
//                }
//            );
//            const decoded = jwt.decode(token);
//
//            return chai.request(app).post('/auth/refresh')
//            .set('authorization', `Bearer ${token}`)
//            .then(res => {
//                expect(res).to.have.status(200);
//                expect(res.body).to.be.an('object');
//                const token = res.body.authToken;
//                expect(token).to.be.a('string');
//                const payload = jwt.verify(token, JWT_SECRET, {
//                    algorithm: ['HS256']
//                });
//                expect(payload.user).to.deep.equal({
//                    username
//                });
//                expect(payload.exp).to.be.at.least(decoded.exp);
//            });
//        });
    });
        
    describe('/auth/userLoggedIn', function () {
        
//        it('Should retrieve all existing user sessions', function () {
//            return Logged.create({usersLoggedIn: username})
//            .then(() => chai.request(app).get('/auth/userLoggedIn'))
//            .then(res => {
//                console.log('all sessions found', res.body);
//                expect(res).to.have.status(200);
//                expect(res.body).to.be.a('Object');
//            });
//        });
        
//        it('Should remove the users session', function() {
//            return Logged.create({usersLoggedIn: username})
//            .then(() => chai.request(app).delete('/auth/userLoggedIn').send({user: username}))
//            .then(res => {
//                expect(res).to.have.status(204);
//            });
//        });
        
//        it('Should post a new persistant session', function() {
//            const user = {user: username};
//            return chai.request(app).post('/auth/userLoggedIn').send(user)
//            .then(res => {
//                console.log(res.body);
//                expect(res).to.have.status(201);
//            })
//        });
    });
});