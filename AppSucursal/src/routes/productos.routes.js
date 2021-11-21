'use stric'
const express = require('express');
const productosController = require('../controller/productos.controller')

const api = express.Router();
api.post('/addProducto', productosController.addproducto),
api.get('/obtenerProductos', productosController.getProductos)
api.get('/obtenerProducto/:id',productosController.getProductoID)
api.put('/editarProducto/:id', productosController.updateProducto)
api.delete('/eliminarProducto', productosController.deleteProducto )
module.exports = api;