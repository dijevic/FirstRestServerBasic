const {Producto} = require('../models')
const {Categoria} = require('../models')
const {response, request} = require('express')

const getProductos= async (req = request , res = response)=>{

  try{
    const categoria = req.body.categoria

    const categoriaDB = await Categoria.findOne({nombre : categoria})

    if(!categoriaDB){
        return res.status(400).json({msg:`la categoria ${categoria} no existe`})
    }
    const data = {categoria :categoriaDB._id}


    const [total,productos] = await Promise.all([ 
        Producto.countDocuments(data),
        Producto.find(data)
        .populate('usuario','nombre')
    ])
    
    if(!productos){
        return res.status(400).json({msg:`no existen productos con esa categoria`})
    }

    res.json({msg:`busqueda completada` ,total, productos})
  }catch(e){console.log(e)}


}

module.exports = {getProductos}