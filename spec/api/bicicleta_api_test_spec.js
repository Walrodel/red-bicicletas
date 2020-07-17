var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

const baseUrl = 'http://localhost:3000/api/bicicletas';

describe('Testing API Biclicletas', () => {
    beforeEach((done) => {
        var URL = 'mongodb://localhost:27017/test_db';

        mongoose.set('useCreateIndex', true);

        mongoose.set('useFindAndModify', false);

        mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useCreateIndex: true });
        var db = mongoose.connection;

        db.on('error', () => {
            console.error('Error occured in db connection');
        });

        db.on('open', () => {
            console.log('DB Connection established successfully');
            done();
        });

    });

    afterEach((done) => {
        Bicicleta.deleteMany({}, (error, success) => {
            if (error) console.log(error);
            done();
        })
    });

    describe('GET BICILCETAS', () => {
        it('status 200', (done) => {
            request.get(baseUrl, (error, response, body) => {
                if(error){
                    console.log(error);
                    return;
                }
                var result = JSON.parse(body);
                console.log(result);
                expect(response.statusCode).toBe(200);
                expect(result.bicicletas.length).toBe(0);
                done();
            });
        });
    })

    describe('Bicicletas POST', () => {
        it('status 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var bici = { 'code': '1', 'color': 'dorada', 'modelo': 'montaña' };
            request.post({
                headers: headers,
                url: `${baseUrl}/create`,
                body: JSON.stringify(bici)
            }, (error, response, body) => {
                var bici = JSON.parse(body).bicicleta;
                expect(response.statusCode).toBe(200);
                expect(bici.code).toBe('1');
                expect(bici.color).toBe('dorada');
                expect(bici.modelo).toBe('montaña');
                done();
            });
        });
    });

    describe('Bicicletas UPDATE', () => {
        it('status 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var bici = { 'code': '1', 'color': 'dorada', 'modelo': 'montaña' };
            request.post({
                headers: headers,
                url: `${baseUrl}/create`,
                body: JSON.stringify(bici)
            }, (error, response, body) => {
                var bici = JSON.parse(body).bicicleta;
                bici.code = '2';
                bici.color = 'morada';
                bici.modelo = 'urbana';
                request.put({
                    headers: headers,
                    url: `${baseUrl}/update/${bici._id}`,
                    body: JSON.stringify(bici)
                }, (error, response, body) => {
                    var biciUpdate = JSON.parse(body).bicicleta;
                    expect(response.statusCode).toBe(200);
                    expect(bici.code).toBe('2');
                    expect(bici.color).toBe('morada');
                    expect(bici.modelo).toBe('urbana');
                    done();
                })
            });
        });
    });

    describe('Bicicletas DELETE', () => {
        it('status 200', (done) => {
            var headers = { 'content-type': 'application/json' };
            var bici = { 'code': '1', 'color': 'dorada', 'modelo': 'montaña' };
            request.post({
                headers: headers,
                url: `${baseUrl}/create`,
                body: JSON.stringify(bici)
            }, (error, response, body) => {
                var bici = JSON.parse(body).bicicleta;
                request.delete({
                    headers: headers,
                    url: `${baseUrl}/delete/${bici._id}`,
                }, (error, response, body) => {
                    expect(response.statusCode).toBe(202);
                    done();
                })
            });
        });
    });

})
