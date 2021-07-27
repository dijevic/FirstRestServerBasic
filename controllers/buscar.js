const {response, request} = require('express')
const {ObjectId} = require('mongoose').Types
const {Producto, Categoria , Usuario ,  role} = require('../models')



const coleccionesPermitidas = [

    'usuarios','categorias','productos','roles'
]

const buscarUsuario = async(termino = '',res)=>{

    const esMongoId = ObjectId.isValid(termino)

    if(esMongoId == true){
        const usuario = await Usuario.findById(termino)

        return res.json({
            msg:`busqueda completada por ID`,
            resultados : usuario
        })
    }

    const regex = new RegExp(termino, 'i')
    const usuarios = await Usuario.find({
        $or :[{nombre : regex},{correo: regex}] ,
        $and :[{estado : true}],
    })

    if(usuarios){

        return res.status(200).json({
            msg:`busqueda completada por NOMBRE`,
            resultados : usuarios
        })
    }

  

}


const buscarCategoria = async(termino = '',res)=>{

    const esMongoId = ObjectId.isValid(termino)

    if(esMongoId == true){
        const categoria = await Categoria.findById(termino).populate('usuario','nombre')

        return res.json({
            msg:`busqueda completada por ID CATEGORIA`,
            resultados : categoria
        })
    }
    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({nombre : regex , estado:true}).populate('usuario','nombre')

    if(categorias){

        return res.status(200).json({
            msg:`busqueda completada por CATEGORIA`,
            resultados : categorias
        })
    }

  

}



const buscarProducto = async(termino = '',res)=>{

    const esMongoId = ObjectId.isValid(termino)

    if(esMongoId == true){
        const producto = await Producto.findById(termino).populate('categoria','nombre')

        return res.json({
            msg:`busqueda completada por ID Producto`,
            resultados : producto
        })
    }
    const regex = new RegExp(termino, 'i')

    const productos  = await Producto.find({nombre : regex , estado : true }).populate('categoria','nombre')

    if(productos){

        return res.status(200).json({
            msg:`busqueda completada por PRODUCTOS`,
            resultados : productos
        })
    }

  

}



const buscar = async (req = request , res = response)=>{


    const {coleccion , termino} = req.params
    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({error: ` las colecciones permitidas son ${coleccionesPermitidas} `})
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino , res)
            break;
        case 'categorias' :
            buscarCategoria(termino , res)
            break;
        case 'productos' :
            buscarProducto(termino , res)
            break
        default:
            res.status(500).json({error:`error`})
            break;
    }

    
}

module.exports = {
    buscar
}