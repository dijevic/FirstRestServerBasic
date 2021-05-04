const {response} = require('express')

const usuariosGet = (req, res = response) =>{
    const query = req.query
    res.json({
      msg:'get -- controller',
      query
    })
  }

const usuariosPost = (req, res = response) =>{
    const {nombre} = req.body
    res.json({
      nombre
    })
  }
const usuariosPut = (req, res = response) =>{
    const {id} = req.params
    res.json({
        mesg:'put--controller',
        id
    })
  }
const usuariosDelete = (req, res = response) =>{
    res.json({
      msg:'get -- controller'
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