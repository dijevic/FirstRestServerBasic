const {Router} = require('express');
const {check}  = require('express-validator');
const {validarCampos }    = require('../middleware/validate');
const {validarJwt} =require('../middleware')
const {crearProducto, getProductos,getProducto, updateProducto, deleteProducto, getProductosCategorias}   = require('../controllers/productos')
const validarId = require('../helpers/producto_id_validator')


const router = Router();

// para crear la  rita necesitpo que este validado el token
router.post('/',
[
    validarJwt,
    check('nombre',`el nombre es requerido`).not().isEmpty(),
    validarCampos
],
    crearProducto
)

router.get('/',[

    validarCampos
],getProductos)


router.get('/:id',[

    check('id').custom(validarId),
    validarCampos]
    ,getProducto)

    router.put('/:id',[
        validarJwt,
         check('id').custom(validarId),
         validarCampos
    ], updateProducto)


router.delete('/:id',[
    validarJwt,
    check('id').custom(validarId),
    validarCampos
],deleteProducto)

module.exports = router;