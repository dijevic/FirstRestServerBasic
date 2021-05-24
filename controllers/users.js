const {response} = require('express')
const Usuario  = require('../models/usuarios')
const bcrypt   = require('bcrypt')
const usuariosGet = async(req, res = response) =>{
  const {limite,desde} = req.query;
  const stateActived = {estado:true}

 let [total,usuarios] = await Promise.all([
    Usuario.countDocuments(stateActived),
    Usuario.find(stateActived)
  .limit(Number(limite))
  .skip(Number(desde))
  ])
    res.json({
      total,usuarios
    })
  }

const usuariosPost = async (req, res = response) =>{


  const {nombre,correo,password,rol} = req.body
  const usuario = new Usuario({nombre,correo,password,rol})
  const findEmail = await Usuario.findOne({correo})
  if(findEmail){
    return res.status(404).json({
      msg : `el correo ya esta registrado`
    })
  }

  const salt = bcrypt.genSaltSync(10);
  usuario.password = bcrypt.hashSync(password, salt)
  await usuario.save()
    res.json({
      msg:'post api',
      usuario
    })
  }
const usuariosPut =async (req, res = response) =>{
    const {id} = req.params
    const {_id , password,google,correo, ...resto}   = req.body
    if(password){
      const salt = bcrypt.genSaltSync(10);
      resto.password = bcrypt.hashSync(password, salt)
    }
   const usuario = await  Usuario.findByIdAndUpdate(id,resto)
    res.json(usuario)
  }

const usuariosDelete = async (req, res = response) =>{

  const {id} = req.params;
  // borrar en fisico
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false})

    res.json({
     usuario
    })
  }
const usuariospatch = (req, res = response) =>{
    res.json({
      msg:'patch -- controller'
    })
  }

module.exports ={
    usuariosGet,
    usuariosPost,
usuariosPut,
usuariosDelete,
usuariospatch
}