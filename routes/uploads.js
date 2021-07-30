const {Router} = require('express');
const {check}  = require('express-validator');
const {validarCampos }    = require('../middleware/validate');
const {uploadFile , actualizarImagen , cargarImagen ,actualizarImagenCloudunary}  = require('../controllers/uploads')
const {validarColeccion}  = require('../helpers/db.validatos')
const {validarContieneArchivo} = require('../middleware')


const router = Router();

router.post('/',validarContieneArchivo,uploadFile)

router.put('/:coleccion/:id',[  
    validarContieneArchivo,
    check('coleccion').custom(c => validarColeccion(c , ['usuarios', 'productos'])),
    check('id',`el id tine que ser un ID de mongo valido`).isMongoId(),
    validarCampos
],actualizarImagenCloudunary)

router.get('/:coleccion/:id',[  
    check('coleccion').custom(c => validarColeccion(c , ['usuarios', 'productos'])),
    check('id',`el id tine que ser un ID de mongo valido`).isMongoId(),
    validarCampos
],cargarImagen)


module.exports = router;

