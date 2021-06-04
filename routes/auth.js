const {Router} = require('express');
const {check}  = require('express-validator');
const {googleSignIn,login}    = require('../controllers/login')
const {validarCampos }    = require('../middleware/validate');


const router = Router();
router.post('/login',[
    check('correo', 'El correo es obligtorio').isEmail(),
    check('password', 'contrase;a es obligatoria').not().isEmpty(),
    validarCampos
],login )


router.post('/google',[
    check('id_token', 'el id token de google es obligatorio y unico').not().isEmpty(),
    validarCampos
],googleSignIn)
module.exports = router;