'use strict'

var sucursal = require('../models/sucursal.models')

function addSucursal(req,res){
    var sucursalModel = new sucursal();
    var params = req.body;
    var idEmpresa = req.params.idEmpresa
    if(params.nombreSucursal && params.contraseña){
        sucursalModel.nombreSucursal = params.nombreSucursal
        sucursalModel.direccionSucursal = params.direccionSucursal
        sucursalModel.contraseña = params.contraseña
        sucursalModel.rol = 'sucursal'
        sucursalModel.idEmpresa = idEmpresa;

        sucursal.find({
            $or: [
                { nombreSucursal: sucursalModel.nombreSucursal },
                { contraseña: sucursalModel.contraseña }
            ]
        }).exec((err, sucursalEncontrados) => {
           
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Usuarios' });

            if (sucursalEncontrados && sucursalEncontrados.length >= 1) {
                return res.status(500).send({ mensaje: 'El usuario ya se encuentra utilizado' });
            } else {
                bcrypt.hash(params.contraseña, null, null, (err, passwordEncriptada) => {
                    sucursalModel.contraseña = passwordEncriptada;

                    sucursalModel.save((err, sucursalGuardado) => {

                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion de Guardar Usuario' });

                        if (sucursalGuardado) {
                            res.status(200).send({ sucursalGuardado })
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar el usuario' })
                        }
                    })
                })
            }
        })
    }

}






function addProducto(req,res){
    var params = req.body;
    var idSucursal = req.params.id;
    var totalProducto = 0;


    sucursal.findByIdAndUpdate(idSucursal, {$push: {productosSucursal:{nombreProducto : params.nombreProducto ,proveedor: params.proveedor, stock: params.stock }}},
        {new:true}, (err,productoAgregado ) =>{

            sucursal.findByIdAndUpdate( idSucursal,{new:true},(err,productosAgregado)=>{
                return res.status(200).send({ final : productosAgregado})
            })

        }
        
        )
 
}



function getsucursal (req,res){
    sucursal.find().exec((err,sucursalesobtenidas)=>{
        return res.status(200).send({sucursalesobtenidas : sucursalesobtenidas})
    })
}

function getproducto(req,res){
    var idroductos = req.params.id
    sucursal.findById(idroductos, { productosSucursal: 1 }, (err, produObtenido)=>{
        return res.status(200).send({ produObtenido: produObtenido});
    })
}

function deletesucursal(req,res){
    var idSucursales = req.params.idSucursal;

    sucursal.findByIdAndDelete(idSucursales,(err, sucursalEliminado) =>{
        sucursal.deleteMany({idSucursal :idSucursales },(err, departamentoEliminados)=>{
        return res.status(200).send({eliminado :sucursalEliminado})
    })
    })
}

function deleteproducto(req,res){
    var idproducto = req.params.idprodu;

    sucursal.findByIdAndDelete(idproducto,(err, produdelete) =>{
        sucursal.deleteMany({idprodu :idproducto },(err, departamentoEliminados)=>{
        return res.status(200).send({eliminado :produdelete})
    })
    })
}
module.exports = {
    addSucursal,
    addProducto,
    getsucursal,
    getproducto,
    deletesucursal,
    deleteproducto
   

}