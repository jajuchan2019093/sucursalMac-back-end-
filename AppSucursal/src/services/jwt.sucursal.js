'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'cA$beVe';

exports.createToken = function (sucursal) {
    var payload = {
        
        nombreSucursal: String,
    direccionSucursal: String,
    contraseña : String,
    idEmpresa: { type: Schema.Types.ObjectId, ref:'usuarios'},
    rol: String,
    productosSucursal: [{
        nombreProducto: String,
        proveedor: String,
        stock: Number

    }],
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);
}
