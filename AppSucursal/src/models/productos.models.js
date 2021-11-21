'use strict'

var mongoose = require("mongoose")
var Schema = mongoose.Schema

var productosSchema = Schema({
 nombreProducto: String,
 proveedor: String,
 stock: Number,
 fecha: String
})

module.exports = mongoose.model('productos', productosSchema)