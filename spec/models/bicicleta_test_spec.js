// var Bicicleta = require('../../models/bicicleta');

// beforeEach(() =>{
//     Bicicleta.allBicis = [];
// });

// describe('Bicileta.allBicis', () => {
//     it('Comienza vacio', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//     });
// });

// describe('Bicileta.add', () => {
//     it('Crear bicicleta', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         var a = new Bicicleta(1, 'rojo', 'urbana', [4.7481775, -74.0974518]);
//         Bicicleta.add(a);
//         expect(Bicicleta.allBicis.length).toBe(1);
//         expect(Bicicleta.allBicis[Bicicleta.allBicis.length - 1]).toBe(a);
//     });
// });

// describe('Bicileta.findById', () => {
//     it('Obtener biclicleta con id 1', () => {
//         expect(Bicicleta.allBicis.length).toBe(0);
//         var a = new Bicicleta(1, 'rojo', 'urbana', [4.7481775, -74.0974518]);
//         var b = new Bicicleta(2, 'morada', 'montaña', [4.7481775, -74.0974518]);
//         Bicicleta.add(a);
//         Bicicleta.add(b);
//         let bici = Bicicleta.findById(1);
//         expect(bici.id).toBe(1);
//         expect(bici.color).toBe('rojo');
//         expect(bici.modelo).toBe('urbana');
//     });
// });



