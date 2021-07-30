const  Role               = require('../models/role')
const Usuario  = require('../models/usuarios')

 
 const isValidRole = async(rol)=>{
    const existRol = await Role.findOne({rol});
    
    
    if(!existRol){
         throw new Error(`EL rol ${rol} no es valido`)
    
    }}

const existeEmail = async(correo)=>{
    const findEmail = await Usuario.findOne({correo})
    if(findEmail){
       throw new Error(`el correo ${correo} ya esta registrado`)
    }
}
const existeUsuarioId = async(id)=>{
    const findUser = await Usuario.findById(id)
    if(!findUser){
       throw new Error(`el usuario con id  :'${id}' no esta registrado`)
    }
    return true
}
const validarColeccion = (coleccion , colecciones , next)=>{

    if(!colecciones.includes(coleccion)){
        return res.status(400).json({msg : ` la coleccion ${coleccion} no es una coleccion valida`})
    }
    return true
}
module.exports = {
    isValidRole,
    existeEmail,
    existeUsuarioId,
    validarColeccion
}