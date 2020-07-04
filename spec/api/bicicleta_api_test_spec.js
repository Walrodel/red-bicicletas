var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www');

beforeEach(function() {console.log('testeando…')});

describe('testeando…', () => {
    describe('GET BICILCETAS', () => {
        it('status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1, 'rojo', 'urbana', [4.7481775, -74.0974518]);
            Bicicleta.add(a);
            request.get('http://localhost:3000/api/bicicletas', (error, response, body) => {
                expect(response.statusCode).toBe(200);
            });
        });
    })
});

describe('testeando…', () => {
    it('status 200', (done) => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var headers = {'content-type': 'application/json'};
        var bici = {'id': '1', 'color': 'dorada', 'modelo': 'montaña'};
        request.post({
            headers: headers,
            url: 'http://localhost:3000/api/bicicletas/create',
            body: JSON.stringify(bici)
        }, (error, response, body) => {
            expect(response.statusCode).toBe(200);
            expect(Bicicleta.findById(1).color).toBe('dorada');
            done();
        });
    });
});