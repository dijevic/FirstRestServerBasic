const {Router} = require('express');
const {check}  = require('express-validator');
const {validarCampos }    = require('../middleware/validate');
const {validarJwt} =require('../middleware')
const {crearCategoria,getCategorias,getCategoriaById,updateCategoria,deleteCategoria}     = require('../controllers/categorias')
const {existeCategoriaId} = require('../helpers/categoria_id_validator')
const router = Router();


// obtener todas las categorias
router.get('/',[validarCampos],getCategorias)


// obtener categoria mediante id
router.get('/:id',[
    check('id').custom(existeCategoriaId),
    validarCampos
],getCategoriaById)


// crear categorias . sera privada para cualquier token valido
router.post('/',[
    validarJwt,
    check('nombre','Campo nombre es obligatorio').not().isEmpty(),
    validarCampos
 ] ,crearCategoria)

// actualizas, privadp, cualquiera con token valido
router.put('/:id',[
    validarJwt,
    check('id','no es un id de mongo').isMongoId(),
    check('id').custom(existeCategoriaId),
    check('nombre','Campo nombre es obligatorio').not().isEmpty(),
    validarCampos
],updateCategoria)

// privado, solo permido al admin borrar
router.delete('/:id',[
    validarJwt,
    check('id').custom(existeCategoriaId),
    validarCampos
],deleteCategoria)



module.exports = router;