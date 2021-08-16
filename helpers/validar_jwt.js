const Usuario  = require('../models/usuarios')
const jwt = require('jsonwebtoken');

const validarJwt = async(token = '') => {

    
    try{
        if(!token || token.length <= 10){
            return null
        }

        // saco mi id del token con jwt.verify
        const {uid} = jwt.verify(token, process.env.PRIVATEKEY)
        // busco en mi modelo de usuario con el id
        const usuario  = await Usuario.findById(uid)

        if(!usuario){
            return null
        }
        
        if(!usuario.estado){
            return null
        }

        return usuario
        
        
        
    }catch(err){
        console.log(err)
    }
  
   

}

module.exports = validarJwt
