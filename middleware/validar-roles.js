const {response , request} = require('express');

const esAdminRol = (req = request, res = response, next)=>{


    if(!req.usuario){
        return res.status(500).json({
            msg:` se quiere validar el rol sin sin validar el token`
        })
    }

    const {rol,nombre} = req.usuario

    if(rol != `ADMIN_ROLE`){
        return res.status(401).json({
            msg: ` ${nombre} sin el rol necesario`
        })
    }

    next()
}

const tieneRol = (...roles)=>{

    return (req = request, res = response, next)=>{
        const {rol,nombre} = req.usuario
        if(!req.usuario){
            return res.status(500).json({
                msg:` se quiere validar el rol sin sin validar el token`
            })
        }
        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({message:`el servicio requiere de uno de estos roles ${roles.join(' ,')}`})
        }
  
        next()
    }
}

module.exports ={tieneRol, esAdminRol}