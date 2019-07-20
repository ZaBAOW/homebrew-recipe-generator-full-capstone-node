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
                console.log(res.body);
                expect(res).to.have.status(201);
            });
        });
    });
    
//    describe('GET', function() {
//        it('should return empty users array', function( done ) {
//            chai.request(app).get('/users').then(res => {
//                expect(res).to.have.status(200);
//                expect(res.body).to.be.an('array');
//                expect(res.body).to.have.length(0);
//                done();
//            });
//        });
//        
//        it('should return all exsisting users in database', function ( done ) {
//            User.create(
//                {
//                    username,
//                    password
//                },
//                {
//                    username: 'usernameB',
//                    password: 'passwordB'
//                }
//            )
//            .then(() => chai.request(app).get('/users'))
//            .then(res => {
//                console.log('all found users: ', res.body);
//                expect(res).to.have.status(200);
//                expect(res.body).to.be.an('array');
//                expect(res.body).to.have.length(2);
//                done();
//            });
//        });
//        it('should return the users with the matching request id', function( done ) {
//            User.create(
//                {
//                    username,
//                    password
//                }
//            )
//            .then((user) =>  {
//                console.log(user._id);
//                chai.request(app).get(`/users/${user._id}`)
//                .then(function(user) {
//                    console.log('user found: ', user.body)
//                    expect(user).to.have.status(200);
//                    done();
//                });
//            });
//        });
//    });
});