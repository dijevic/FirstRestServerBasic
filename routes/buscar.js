const {Router} = require('express');
const {check}  = require('express-validator');
const {validarCampos }    = require('../middleware/validate');
const {validarJwt} =require('../middleware')
const {buscar}   = require('../controllers/buscar')


const router = Router();

router.get('/:coleccion/:termino',[validarCampos],buscar)


module.exports = router;