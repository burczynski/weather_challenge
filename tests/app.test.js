'use strict';
const app     = require('../src/server/app');
const request = require('supertest');
const should  = require('should');

describe('all /GET /v1/ endpoints', () => {
    it('/v1/location Should return json as default format', done => {
        request(app)
            .get('/v1/location')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end( (err, res) => {
                res.status.should.equal(200);
                res.should.be.json;
                done();
            })
    });

    it('/v1/current Should return json as default format', done => {
        request(app)
            .get('/v1/current')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end( (err, res) => {
                res.status.should.equal(200);
                res.should.be.json;
                done();
            })
    });

    it('/v1/current/undefinedcity Should return json with error when city does not exists', done => {
        request(app)
            .get('/v1/current/undefinedcity')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end( (err, res) => {
                res.status.should.equal(500);
                res.should.have.property('error')
                res.should.be.json;
                done();
            })
    });

    it('/v1/current/city Should return json with city info', done => {
        request(app)
            .get('/v1/current/mercedes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end( (err, res) => {
                res.status.should.equal(200);
                res.should.be.json;
                
                console.log(res);
                done();
            })
    });

    it('/v1/forecast/city Should return json as default format with city info', done => {
        request(app)
            .get('/v1/forecast/quilmes')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end( (err, res) => {
                res.status.should.equal(200);
                res.should.be.json;
                done();
            })
    });

    it('/v1/forecast/undefinedcity Should return json with error when city does not exists', done => {
        request(app)
            .get('/v1/forecast/undefinedcity')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end( (err, res) => {
                res.status.should.equal(500);
                res.should.have.property('error')
                res.should.be.json;
                done();
            })
    });

    it('/v1/forecast/ Should return json as default format with your city info', done => {
        request(app)
            .get('/v1/forecast')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .end( (err, res) => {
                res.status.should.equal(200);
                res.should.be.json;
                done();
            })
    });
});