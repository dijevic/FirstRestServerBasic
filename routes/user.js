const {Router} = require('express');
const {usuariosGet,
       usuariosDelete,
       usuariosPost,
       usuariosPut,
       usuariospatch}       = require('../controllers/users')

const router = Router();

router.get('/', usuariosGet)
router.post('/',usuariosPost )
router.put('/:id',usuariosPut )
router.delete('/',usuariosDelete )
router.patch('/',usuariospatch
     )



module.exports = router