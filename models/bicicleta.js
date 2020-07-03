var Bicicleta = function (id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

// Bicicleta.prototype.toString = () => {
//     return `id: ${this.id} color: ${this.color}`;
// }

Bicicleta.allBicis = [];

Bicicleta.add = (aBici) => {
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = (aBiciId) => {
    let bici = Bicicleta.allBicis.find(x => x.id.toString() === aBiciId.toString());
    if(bici)
        return bici;
    else
        throw new Error(`No existe la bicicleta con id: ${aBiciId}`)
}

Bicicleta.removeById = (aBiciId) => {
    console.log('aBiciId', aBiciId);
    Bicicleta.allBicis.forEach((bici, index) => {
        if(bici.id.toString() === aBiciId.toString()){
            Bicicleta.allBicis.splice(index, 1);
            return;
        }
    });
}

// var a = new Bicicleta(1, 'rojo', 'urbana', [4.7481775, -74.0974518]);
// var b = new Bicicleta(2, 'blaca', 'urbana', [4.7440077, -74.0974715]);

// Bicicleta.add(a);
// Bicicleta.add(b);

module.exports = Bicicleta;