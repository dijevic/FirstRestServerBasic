const {Categoria} = require('../models')
const {response, request} = require('express')

const crearCategoria = async (req  ,res = response)=>{

 try{
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB =  await Categoria.findOne({nombre})

    if(categoriaDB){
        return res.status(400).json({
            message: `la categoria ${categoriaDB.nombre} ya existe `
        })
     }



// data a guardar 
     const data = {
         nombre,
         usuario : req.usuario._id
     }

     const categoria = new Categoria(data)

    //  guardar en DBus

    await categoria.save()

    res.status(200).json({categoria})
 }catch(err){
     console.log(err)
 }

    
}

const getCategorias =  async(req = request, res  = response)=>{

    const {limite,desde} = req.query
    const stateActived = {estado:true}

    let [total,categorias]  = await Promise.all([
       Categoria.countDocuments(stateActived),
       Categoria.find(stateActived)
       .limit(Number(limite))
       .skip(Number(desde))
       .populate('usuario','nombre')
    ])
   

    res.status(200).json(
        {msg:`todo ok`,
         total ,
      categorias})

}
const getCategoriaById =  async(req = request, res  = response)=>{

    const {id} = req.params

    const categoria = await Categoria.findById(id).populate('usuario','nombre')
    res.status(200).json(
        {msg:`todo ok`,
         categoria})

}

const updateCategoria = async(req = request,res  = response)=>{

    const {id} = req.params
    const {usuario, ...data}  = req.body

    data.usuario = req.usuario._id
    data.estado = true

    const categoria = await Categoria.findOneAndUpdate(id,data,{new:true})
    res.status(200).json({
        msg:'usuario actualizado : true',
        categoria
    })
}


// cambio l estao, no lo elimino directamente
const deleteCategoria = async (req, res = response)=>{


    const {id} = req.params
    const estado = {estado :false}
    const categoria = await Categoria.findOneAndUpdate(id,estado)

    res.status(200).json({
        msg:'estado actualizado : false',
        categoria 
    })
}

module.exports = {crearCategoria,getCategorias,getCategoriaById,updateCategoria,deleteCategoria}