'use stric'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var sucursalSchema  = Schema({
    nombreSucursal: String,
    direccionSucursal: String,
    contraseña : String,
    idEmpresa: { type: Schema.Types.ObjectId, ref:'usuarios'},
    rol: String,
    productosSucursal: [{
        nombreProducto: String,
        proveedor: String,
        stock: Number

    }]
})

module.exports = mongoose.model('sucursal', sucursalSchema);