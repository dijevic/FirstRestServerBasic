const {response} = require('express');
const bcrypt   = require('bcrypt')
const Usuario  = require('../models/usuarios')
const generaJWT = require('../helpers/generar_jwt')
const googleVerify = require('../helpers/google-verify')




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
        res.status(200).json({
            rsp:'login ok !',
            user,
            token,
            status:200
        })

    }catch(err){
        return res.json({
            msg:`algo salio mal`
        })
    }


  

}

const googleSignIn = async(req= request, res = response, next)=>{

    const {id_token} = req.body
    
    let userNew;
    try{
    const {correo,img,nombre} = await googleVerify(id_token)
    let user = await Usuario.findOne({correo})
    // if(!user.estado || user.estado == null || user.estado == undefined){
    //     return res.status(400).json({msg:'erro'})
    // }
    if(!user){
        try{

            let data = {
                nombre,
                correo,
                password:':p',
                img,
                google:true
            }
           
            user = new Usuario(data)
            const salt = bcrypt.genSaltSync(10);
            user.password = bcrypt.hashSync(data.password, salt)
            await user.save()

        }catch(err){
            return res.status(400).json({msg:err})
        }
      
       
    }
    
    if(!user.estado ){
        return res.json({msg:`usuario bloqueado !!!`})
    }
     
    const token =  await generaJWT(user.id)
    res.json({
        msg:`sign in`,
        user,
        token
    
    })


      
    }catch(err){
        return res.status(400).json({msg:`token de google invalido`,err})
    }
   
}

const renovarToken = async (req= request, res = response,)=>{

    const {usuario} = req
    const token =  await generaJWT(usuario.id)

    res.json({
        status:200,
        usuario,
        token
    })

}

module.exports ={
    login,
    googleSignIn,
    renovarToken
};