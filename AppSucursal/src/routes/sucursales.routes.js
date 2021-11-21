'use stric'
const express = require('express');
const sucursalesController = require('../controller/sucursales.controller')

const api = express.Router();
    
api.post('/addSucursal', sucursalesController.addSucursal),
api.put('/addproducto/:id', sucursalesController.addProducto)
api.get('/getsucursal', sucursalesController.getsucursal),
api.get('/getproducto/:id', sucursalesController.getproducto),
api.delete('/deleteSucursal/:idsucursal', sucursalesController.deletesucursal)
api.delete('/deleteproducto/:idrodu',sucursalesController.deleteproducto)
module.exports = api