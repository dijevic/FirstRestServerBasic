const {Categoria} = require('../models')


const existeCategoriaId = async(id)=>{
    const findCategoria = await Categoria.findById(id)
    if(!findCategoria){
       throw new Error(`la categoria con id  :'${id}' no esta registrado`)
    }
}

module.exports ={existeCategoriaId}