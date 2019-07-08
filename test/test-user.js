'use strict';
const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, runServer, closeServer} = require('../server');
const {User} = require('../users/models');
const {authToken} = require('../auth/router');
const { TEST_DATABASE_URL} = require('../config');


const expect = chai.expect;
chai.use(chaiHttp);

describe('/api/users', function() {
    const username = 'testUser';
    const password = 'testPassword';
    
    before(function() {
        return runServer(TEST_DATABASE_URL);
    });
    
    after(function() {
        return closeServer();
    });
    
    beforeEach(function() {});

    afterEach(function() {
        return User.remove({});
    });
    
    describe('POST', function() {
        it('should post a new user to the user collection', function() {
            let res;
            const newUser = {
                username: username,
                password: password
            };
            
            return User.hashPassword(newUser.password)
             .then(function() {
                return chai.request(app).post('/users').send(newUser);
            })
             .then(function(res) {
                expect(res).to.have.status(201);
                expect(res).to.be.a('object');
                expect(res.body).to.include.keys('username','password','id');
                expect(res.body.username).to.equal(newUser.username);
            });
        });
    });
    
    describe('GET', function() {
        it('should return empty users array', function() {
            return chai.request(app).get('/usersa').then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(0);
            });
        });
        
        it('should return all exsisting users in database', function () {
            return User.create(
                {
                    username,
                    password
                },
                {
                    username: 'usernameB',
                    password: 'passwordB'
                }
            )
            .then(() => chai.request(app).get('/users'))
            .then(res => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.length(2);
            });
        });
        it('should return the users with the matching request id', function() {
            return User.create(
                {
                    username,
                    password
                }
            )
            .then(function(user) {
                chai.request(app).get(`/users/${user._id}`)
                .then(function(res) {
                    expect(res).to.have.status(200);
                    expect(res.username).to.equal(user.username);
                    expect(res._id).to.equal(user._id);
                });
            });
        });
    });
});