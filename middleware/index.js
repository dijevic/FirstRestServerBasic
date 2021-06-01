const  validarJwt                                = require('../middleware/validar-jwt')
const {tieneRol,esAdminRol}                                = require('../middleware/validar-roles')
const {validarCampos }                          = require('../middleware/validate');


module.exports ={
    validarJwt,
tieneRol,
esAdminRol,
validarCampos
    
}