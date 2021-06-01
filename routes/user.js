const {Router}                                  = require('express');
const {check}                                   = require('express-validator')
const {isValidRole,existeEmail,existeUsuarioId} = require('../helpers/db.validatos')
const {validarCampos,validarJwt,tieneRol,esAdminRol} = require('../middleware/index')
const {usuariosGet,
     usuariosDelete,
     usuariosPost,
     usuariosPut,
     usuariospatch}                             = require('../controllers/users')

const router = Router();

router.get('/', usuariosGet)
router.post('/',[
     check('correo','el correo no es valido').isEmail(),
     check('correo').custom(existeEmail),
     check('nombre','el nombre es obligatorio').not().isEmpty(),
     check('password','el password es obligatorio y debe ser mayor a 6').isLength({min:6}),
     // check('rol','no es un rol permitido').isIn(['USER-ROLE','ADMIN-ROLE']),
     check('rol').custom( isValidRole),
     
     validarCampos
],usuariosPost )
router.put('/:id',[
     check('id','no es un ID valido,').isMongoId(),
     check('id').custom(existeUsuarioId),
     check('rol').custom(isValidRole),
     validarCampos
     
],usuariosPut )
router.delete('/:id',[
     validarJwt,
     // esAdminRol,
     tieneRol('ADMIN_ROLE','VENTAS_ROLE'),
     check('id','no es un ID valido,').isMongoId(),
     check('id').custom(existeUsuarioId),
     validarCampos
          
],usuariosDelete )
router.patch('/',usuariospatch
     )



module.exports = router