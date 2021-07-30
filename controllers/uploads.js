const path = require('path')
const fs = require('fs')
const {response , request}     = require('express')
const {Producto , Usuario}     = require('../models')
const {subirArchivo}           = require('../helpers')
var cloudinary = require('cloudinary').v2

cloudinary.config(process.env.CLOUDINARY_URL)


const uploadFile = async (req = request , res= response)=>{

  
      try{
          const nombre = await subirArchivo(req.files, undefined ,'imagenes')
      
          res.status(200).json({msg: nombre})
          
      }catch(e){
          res.status(400).json({msg :`error en la extension`})
      }
     
}



const actualizarImagen = async (req = request , res = response)=>{

    const {id , coleccion} = req.params 


    let model ;
    switch (coleccion) {
        case 'usuarios':
        model = await Usuario.findById(id)
        if(!model){
            return res.status(400).json({msg:` el usuario con el id ${id} no existe`})
        }
            break;
        case 'productos':
            model = await Producto.findById(id)
            if(!model){
                return res.status(400).json({msg:` el usuario con el id ${id} no existe`})
            }
                break;
    
        default:
            break;
    }
    
    if(model.img){
        const pathImg = path.join(__dirname,'../uploads',coleccion , model.img )
        if( fs.existsSync(pathImg)){
            fs.unlinkSync(pathImg)

        }
    }
    const nombre = await subirArchivo(req.files, undefined ,coleccion)
    model.img =  nombre   
    
    await model.save()
    res.json({msg : `todo ok`,status : 200 , model})
}
const cargarImagen = async (req = request , res = response)=>{

    const {id , coleccion} = req.params 


    let model ;
    switch (coleccion) {
        case 'usuarios':
        model = await Usuario.findById(id)
        if(!model){
            return res.status(400).json({msg:` el usuario con el id ${id} no existe`})
        }
            break;
        case 'productos':
            model = await Producto.findById(id)
            if(!model){
                return res.status(400).json({msg:` el usuario con el id ${id} no existe`})
            }
                break;
    
        default:
            return res.status(500).json({msg:` error`})
            break;
    }
    
    if(model.img){
      return  await res.json({ok : 200 ,url : model.img})
    }
    const pathNoImg = path.join( __dirname ,'../assets', 'no-image.jpg' )
    res.sendFile(pathNoImg)
    
}



const actualizarImagenCloudunary = async (req = request , res = response)=>{

    const {id , coleccion} = req.params 


    let model ;
    switch (coleccion) {
        case 'usuarios':
        model = await Usuario.findById(id)
        if(!model){
            return res.status(400).json({msg:` el usuario con el id ${id} no existe`})
        }
            break;
        case 'productos':
            model = await Producto.findById(id)
            if(!model){
                return res.status(400).json({msg:` el usuario con el id ${id} no existe`})
            }
                break;
    
        default:
            break;
    }
    
    if(model.img){
       const nombreArr    = model.img.split('/')
       const nombre       = nombreArr[nombreArr.length - 1]
       const [private_id] = nombre.split('.')
        cloudinary.uploader.destroy(private_id)
    }

    const {tempFilePath} = req.files.archivo
    
    const {secure_url } = await cloudinary.uploader.upload(tempFilePath)

    model.img = secure_url 
    await model.save()
    
    res.json({model})
}




module.exports = {
    uploadFile,
    actualizarImagen,
    actualizarImagenCloudunary,
    cargarImagen
}