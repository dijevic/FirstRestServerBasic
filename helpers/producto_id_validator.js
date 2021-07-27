const {Producto} = require('../models')

const validarId = async (id)=>{

    const producto = await Producto.findById(id)

    if(!producto){
    throw new Error(`el producto con id  :'${id}' no esta registrado`)
         
    }
}

module.exports = validarId