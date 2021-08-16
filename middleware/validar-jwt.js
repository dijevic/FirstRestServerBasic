const jwt = require('jsonwebtoken');
const {response , request} = require('express');
const Usuario  = require('../models/usuarios')


// valido el JWT en  mi backend
const validarJwt = async(req = request, res  =response , next) => {

    let token = req.header('x-token')
    if(!token){
        return res.status(401).json({message:`no autorizado falta el JWT`})
    }

    try{

        const {uid} = jwt.verify(token, process.env.PRIVATEKEY)
        const user  = await Usuario.findById(uid)

        if(!user){
            return res.status(401).json({message:`Usuario no existe en DB`})
        }
        
        if(!user.estado){
            return res.status(401).json({message:`token invalido -usuario inactivo(FALSE)`})
        }
        req.usuario = user
        next()
        
        
        
    }catch(err){
        res.status(401).json({message:`token no valido`})
    }
  
   

}

module.exports = validarJwt