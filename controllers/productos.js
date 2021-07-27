const {Producto} = require('../models')
const {Categoria} = require('../models')
const {response, request} = require('express')


const crearProducto = async ( req= request, res= response)=>{

    try{
        
    const nombre = req.body.nombre;
    const categoria = req.body.categoria
    const productoDB = await Producto.findOne({nombre})
    const categoriaDB = await Categoria.findOne({nombre : categoria})


    if(productoDB){
        return res.json(
            {msg: `el producto ${productoDB.nombre} ya existe`
        })
    }
    if(!categoriaDB){
        return res.json(
            {msg: `el categoria ${categoriaDB} NO existe`
        })
    }


    const data = {

        nombre,
        usuario :req.usuario._id,
        categoria : categoriaDB._id
        

    }

    const producto = new Producto(data)

    //  guardar en DBus

    await producto.save()

    res.status(200).json({msg:`proceso ok`,producto ,categoria_registrada : categoriaDB})
    } catch(e){
        console.log(e)
    }




}

const getProductos = async (req = request, res = response)=>{

    const {limite ,desde } = req.query
    const stateActived = {estado:true}
    const [total,productos] = await Promise.all([ 
        Producto.countDocuments(stateActived),
        Producto.find(stateActived)
        .limit(Number(limite))
        .skip(Number(desde))
        .populate('usuario','nombre')

    ])

    
    
    res.status(200).json({
        msg:`Busqueda exitosa !`,
        total,
        productos,
      
    })
}

const getProducto = async ( req = request, res = response)=>{
    const {id}  = req.params;

    const producto = await Producto.findById(id).populate('usuario','nombre').populate('categoria','nombre')

   res.json({
       msg:`busqueda Exitosa`,
       producto
   })
}



const updateProducto = async ( req = request, res = response)=>{

    try{
        let categoria ;
        
    const {id} = req.params
    const {estado , _id , ...data}  = req.body

    
    if(req.body.precio){
        data.precio = req.body.precio
    }
    if(req.body.disponibilidad){
        data.disponibilidad = req.body.disponibilidad
    }
    if(req.body.nombre){
        data.nombre = req.body.nombre
    }
    if(req.body.categoria){
        let categoria = await Categoria.findOne({nombre : req.body.categoria})
        if(!categoria){
            return res.status(400).json({message: `la categoria ${req.body.categoria} no existe`})
        }

        data.categoria = categoria._id
    }

    data.usuario = req.usuario._id

    const producto = await Producto.findOneAndUpdate(id,data,{new : true}).populate('categoria','nombre')

    res.json({msg:`Cambios completados`,producto})
    }catch(e){
        console.log(e)
    }
}


const deleteProducto = async (req = request , res = response)=>{

    try{
        
        const {id} = req.params
        const {...data}  = req.body
        data.usuario = req.usuario._id
    
        const producto = await Producto.findOneAndUpdate(id,{estado : false},{new : true})  
    
        res.json({msg:`Cambios completados , registro inactivado`,producto})
    }catch(e){
        console.log(e)
    }
}

module.exports ={
    crearProducto,
    getProductos,
    getProducto,
    updateProducto,
    deleteProducto,
}