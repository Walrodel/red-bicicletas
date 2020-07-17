var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');

describe('Testing Biclicletas', () => {
    beforeEach((done) => {
        var URL = 'mongodb://localhost:27017/test_db';

        mongoose.set('useCreateIndex', true);

        mongoose.set('useFindAndModify', false);

        mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useCreateIndex:true});
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

    describe('bicibleta createIntance', () => {
        it('instanciar una bicicleta', (done) => {
            var bici = Bicicleta.createIntance(1, 'morada', 'urbana', [1, 2]);
            expect(bici.code).toBe('1');
            expect(bici.color).toBe('morada');
            expect(bici.modelo).toBe('urbana');
            done();
        })
    });

    describe('Bicicleta.allBicis', () => {
        it('comienza vacia', (done) => {
            Bicicleta.allBicis((errr, bicis) => {
                expect(bicis.length).toBe(0);
                done();
            })
        })
    });

    describe('Bicicleta.add', () => {
        it('agreaga una bicicleta', (done) => {
            var bici = new Bicicleta({ code: '1', color: 'dorada', modelo: 'urbana' });
            Bicicleta.add(bici, (err, resBici) => {
                if (err) console.log(err);
                Bicicleta.allBicis((errr, bicis) => {
                    expect(bicis.length).toBe(1);
                    expect(bicis[0].code).toBe('1');
                    done();
                })
            });
        })
    })

    describe('Bicicleta.findByCode', () => {
        it('consulta una bicicleta', (done) => {
            Bicicleta.allBicis((errr, bicis) => {
                expect(bicis.length).toBe(0);

                var bici1 = new Bicicleta({ code: '1', color: 'dorada', modelo: 'urbana' });
                Bicicleta.add(bici1, (err, resBici) => {
                    if (err) console.log(err);
                    var bici2 = new Bicicleta({ code: '2', color: 'roja', modelo: 'montaña' });
                    Bicicleta.add(bici2, (err, resBici) => {
                        if (err) console.log(err);
                        Bicicleta.findByCode('1', (err, resBici) => {
                            if (err) console.log(err);
                            expect(resBici.code).toBe('1');
                            expect(resBici.color).toBe('dorada');
                            expect(resBici.modelo).toBe('urbana');
                            done();
                        });
                    });
                });
            })
        })
    })
});


