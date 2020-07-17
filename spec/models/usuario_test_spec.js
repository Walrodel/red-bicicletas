var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
var Usuario = require('../../models/usuario');
var Reserva = require('../../models/reserva');

describe('Testing Usuarios', () => {
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
        Reserva.deleteMany({}, (error, success) => {
            if (error) console.log(error);
            Usuario.deleteMany({}, (error, success) => {
                if (error) console.log(error);
                Bicicleta.deleteMany({}, (error, success) => {
                    if (error) console.log(error);
                    done();
                })
            })
        })
    });

    describe('Cuando un usuario reserva una Bicicleta', () => {
        it('debe existir la reserva', (done) => {
            var usuario = new Usuario({nombre: "Walther"});
            usuario.save();
            var bici = new Bicicleta({code: 1, color: 'morada', modelo: 'urbana', ubicacion: [1, 2]});
            bici.save();
            var hoy = new Date();
            var mañana = new Date();
            mañana.setDate(hoy.getDate() + 1);
            usuario.reservar(bici._id, hoy, mañana, (error, reserva)=>{
                if(error){
                    console.log('Error:', error);
                }
                Reserva.find({}).populate('usuario').populate('bicicleta').exec((err, reservas)=>{
                    expect(reservas.length).toBe(1);
                    expect(reservas[0].diasReserva()).toBe(2);
                    expect(reservas[0].bicicleta.code).toBe('1');
                    expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
                    done();
                })
            });
        })
    });
});


