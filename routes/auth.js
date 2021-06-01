const {Router} = require('express');
const {check}  = require('express-validator');
const login    = require('../controllers/login')
const {validarCampos }    = require('../middleware/validate');


const router = Router();
router.post('/login',[
    check('correo', 'El correo es obligtorio').isEmail(),
    check('password', 'contrase;a es obligatoria').not().isEmpty(),
    validarCampos
],login )

module.exports = router;