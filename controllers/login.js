const {response} = require('express');
const bcrypt   = require('bcrypt')
const Usuario  = require('../models/usuarios')
const generaJWT = require('../helpers/generar_jwt')




const login = async(req, res = response)=>{

    const {correo,password} = req.body

    const user = await Usuario.findOne({correo})
    if(!user){
        return res.status(400).json({
            msg: `algo salio mal, usuario o password erroneo - correo`
        })
    }
    if(!user.estado){
        return res.status(400).json({
            msg: `algo salio mal, usuario o password erroneo - estado-false`
        })
    }
    const validatePassword = bcrypt.compareSync(password,user.password)
    if(!validatePassword ){
        return res.status(400).json({
            msg: `algo salio mal, usuario o password erroneo - password`
        })
    }

    const token =  await generaJWT(user.id)
    try{
        res.json({
            rsp:'login ok !',
            user,
            token
        })

    }catch(err){
        console.log(err)
        return res.json({
            msg:`algo salio mal`
        })
    }


  

}

module.exports = login;