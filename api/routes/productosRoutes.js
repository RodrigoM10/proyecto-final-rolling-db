// Rutas para productos
const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

// Crear un producto
// api/productos
router.post('/', productoController.crearProducto);
router.get('/', productoController.obtenerProductos);
router.get('/:id', productoController.obtenerProducto);
router.put('/:id', productoController.modificarProducto);
router.delete('/:id', productoController.borrarProducto);

module.exports = router;
