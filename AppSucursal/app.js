'use strict'

// VARIABLES GLOBALES
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

// IMPORTACION DE RUTAS
var usuario_rutas = require("./src/routes/users.routes");
var  sucursales_rutas = require("./src/routes/sucursales.routes");
var productos_rutas = require("./src/routes/productos.routes")


// MIDDLEWARES

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CABECERAS
app.use(cors());

// APLICACION DE RUTAS  localhost:3000/api/ejemplo
app.use('/api', usuario_rutas, sucursales_rutas, productos_rutas);

// EXPORTAR
module.exports = app;