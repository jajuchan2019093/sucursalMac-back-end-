'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'cA$beVe';

exports.createToken = function (usuario) {
    var payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        username: usuario.username,
        email: usuario.email,
        rol: usuario.rol,
        imagen: usuario.imagen,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt.encode(payload, secret);
}
