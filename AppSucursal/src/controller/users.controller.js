'use strict'

var Usuario = require("../models/users.model");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../services/jwt");
var fs = require('fs');
var path = require('path');

// ---- Registar ----
function registrar(req, res) {
    var usuarioModel = new Usuario();
    var params = req.body;
    console.log(params);
    if (params.email && params.username && params.password) {
        //     Modelo Base de datos= los datos del cuerpo de datos/formulario
        usuarioModel.nombres = params.nombres;
        usuarioModel.username = params.username;
        usuarioModel.email = params.email;
        usuarioModel.rol = 'ADMINMAC';
        usuarioModel.imagen = null;

        Usuario.find({
            $or: [
                { username: usuarioModel.username },
                { email: usuarioModel.email }
            ]
        }).exec((err, usuariosEncontrados) => {
           
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Usuarios' });

            if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El usuario ya se encuentra utilizado' });
            } else {
                bcrypt.hash(params.password, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;

                    usuarioModel.save((err, usuarioGuardado) => {

                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Guardar Usuario' });

                        if (usuarioGuardado) {
                            res.status(200).send({ usuarioGuardado })
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar el usuario' })
                        }
                    })
                })
            }
        })

    }
}

// ---- Login ----
function login(req, res) {
    var params = req.body;
   
    Usuario.findOne({ email: params.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });

        if (usuarioEncontrado) {
            bcrypt.compare(params.password, usuarioEncontrado.password, (err, passVerificada) => {
                if (passVerificada) {
                    if (params.getToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(usuarioEncontrado)
                        })
                    } else {
                        usuarioEncontrado.password = undefined;
                        return res.status(200).send({ usuarioEncontrado });
                    }
                } else {
                    return res.status(500).send({ mensaje: 'El usuario no se a podido identificar' });
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'Error al buscar el usuario' });
        }
    })
}

// ---- Todos los usuarios ----
function obtenerUsuarios(req, res) {
  
    Usuario.find().exec((err, usuarios) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Usuarios' });
        if (!usuarios) return res.status(500).send({ mensaje: 'Error en la consutla de Usuarios o no tiene datos' });
        return res.status(200).send({ usuarios });
     
    })
}


// ---- Un solo usuario ----
function obtenerUsuarioID(req, res) {
    var usuarioId = req.params.idUsuario;
   

    Usuario.findById(usuarioId, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Usuario' });
        if (!usuarioEncontrado) return res.status(500).send({ mensaje: 'Error al obtener el Usuario.' });
        return res.status(200).send({ usuarioEncontrado });
    })
}


// ----  Editar Informacion del usuario ----
function editarUsuario(req, res) {
    var idUsuario = req.params.id;
    var params = req.body;


    delete params.password;

    Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioActualizado) return res.status(500).send({ mensaje: 'No se a podido editar al Usuario' });

        return res.status(200).send({ usuarioActualizado })
    })
  
}


// ---- Editar informacion del usuario Administrador ----

function editarUsuarioAdmin(req, res) {
    var idUsuario = req.params.id;
    var params = req.body;

    
    delete params.password;

    if(req.user.rol != 'ADMINMAC'){
        return res.status(500).send({mensaje: 'Solo el administrador puede editar usuarios.'})
    }
    
    Usuario.findByIdAndUpdate(idUsuario, params, { new: true }, (err, usuarioActualizado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if (!usuarioActualizado) return res.status(500).send({ mensaje: 'No se a podido editar al Usuario' });

        return res.status(200).send({ usuarioActualizado })
    })
  
}

function eliminarUsuarioAdmin(req, res) {
    var idUsuario = req.params.idUsuario;

   /* if(req.user.rol != "ROL_ADMIN"){
        return res.status(500).send({ mensaje: 'Solo el administrador puede eliminar al Usuario' });
    }*/

    Usuario.findByIdAndDelete(idUsuario, ((err, usuarioEliminado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar usuario' });
        if(!usuarioEliminado) return res.status(500).send({ mensaje: 'Error al eliminar el Usuario'});

        return res.status(200).send({ usuarioEliminado })
    }))
}

module.exports = {
registrar,
login,
obtenerUsuarios,
obtenerUsuarioID,
editarUsuario,
editarUsuarioAdmin,
eliminarUsuarioAdmin


}