'use strict'

var producto = require("../models/productos.models");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("../services/jwt");
var fs = require('fs');
var path = require('path');


function addproducto (req,res){
    var  productoModel = new producto();
     var params = req.body;
     var date= new Date();
     if (params.nombreProducto && params.proveedor){
        productoModel.nombreProducto = params.nombreProducto,
        productoModel.proveedor = params.proveedor,
        productoModel.stock = params.stock,
        productoModel.fecha = date
         

        producto.find({
            $or: [
                { nombreProducto: productoModel.nombreProducto }
                
            ]  
        })
        productoModel.save((err,productoGuardado)=>{
            return res.status(200).send({productoGuardado})
        })
     }


    }

    function getProductos (req,res){

        
    producto.find().exec((err, productos) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion ' });
        if (!productos) return res.status(500).send({ mensaje: 'Error en la consulta' });
        return res.status(200).send({ productos });
     
    })
    }


    function getProductoID (req,res){
        var produId = req.params.idProducto;
   

    producto.findById(produId, (err, productoEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion ' });
        if (!productoEncontrado) return res.status(500).send({ mensaje: 'Error al obtener informacion' });
        return res.status(200).send({ productoEncontrado });
    })
    }


    function updateProducto(req,res){
        var idProducto = req.params.id;
        var params = req.body;

        producto.findByIdAndUpdate(idProducto, params, { new: true }, (err, productoActualizado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!productoActualizado) return res.status(500).send({ mensaje: 'No se a podido editar ' });
    
            return res.status(200).send({ productoActualizado })
        })
    }


    function deleteProducto (req,res){
        var idProducto = req.params.idProducto

        producto.findByIdAndDelete(idProducto, ((err, productoEliminado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error en la peticion de Eliminar ' });
            if(!productoEliminado) return res.status(500).send({ mensaje: 'Error al eliminar'});
    
            return res.status(200).send({ productoEliminado })
        }))
    }


module.exports = {
    addproducto,
    getProductos,
    getProductoID,
    updateProducto,
    deleteProducto

}