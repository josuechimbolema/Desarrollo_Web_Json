const express = require('express');
const router = express.Router();
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuario,
  actualizarUsuario,
  eliminarUsuario,
} = require('../controllers/usuarioController');
const protegerRuta = require('../middleware/authMiddleware');

router.post('/', crearUsuario);
router.get('/', protegerRuta, obtenerUsuarios);
router.get('/:id', protegerRuta, obtenerUsuario);
router.put('/:id', protegerRuta, actualizarUsuario);
router.delete('/:id', protegerRuta, eliminarUsuario);

module.exports = router;
