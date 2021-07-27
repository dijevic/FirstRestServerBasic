const {Router} = require('express');
const {check}  = require('express-validator');
const {validarCampos }    = require('../middleware/validate');
const {getProductos} = require('../controllers/productos_categoria')


const router = Router();

router.get('/',[
    check('categoria',`la categoria es requerida`).not().isEmpty(),
    validarCampos],
    getProductos)


module.exports = router