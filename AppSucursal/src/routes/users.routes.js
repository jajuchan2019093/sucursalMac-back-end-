'use strict'

// IMPORTACIONES
var express = require("express");
var usuarioControlador = require("../controller/users.controller");

// IMPORTACION MIDDLEWARES PARA RUTAS
var md_autorizacion = require("../middlewares/authenticated");



//RUTAS
var api = express.Router();

api.post('/registrar', usuarioControlador.registrar);
api.post('/login', usuarioControlador.login);
api.get('/obtenerUsuarios', usuarioControlador.obtenerUsuarios);
api.get('/obtenerUsuarioId/:idUsuario', usuarioControlador.obtenerUsuarioID);
api.put('/editarUsuario/:id', /*md_autorizacion.ensureAuth , */ usuarioControlador.editarUsuario);
api.put('/editarUsuarioAdmin/:id',/* md_autorizacion.ensureAuth,*/ usuarioControlador.editarUsuarioAdmin);
api.delete('/eliminarUsuarioAdmin/:idUsuario', /*md_autorizacion.ensureAuth,*/ usuarioControlador.eliminarUsuarioAdmin);
module.exports = api;