// Rutas para Ventas
const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');
const { check } = require('express-validator');

// Crear un venta
// api/ventas
router.post(
    '/',
    [
        check('buyerEmail', 'Agrega un Email Valido').isEmail(),
        check('buyerName', 'Nombre obligatorio').not().isEmpty(),
        check('buyerLastName', 'Apellido obligatorio').not().isEmpty(),
        check('buyerCity', 'Apellido obligatorio').not().isEmpty(),
        check('buyerState', 'Apellido obligatorio').not().isEmpty(),
        check('buyerZip', 'Apellido obligatorio').not().isEmpty(),
        check('buyerCardNumber', 'Apellido obligatorio').not().isEmpty(),
        check('buyerCardName', 'Apellido obligatorio').not().isEmpty(),
        check('buyerCardDate', 'Apellido obligatorio').not().isEmpty(),
        check('buyerCardCode', 'Apellido obligatorio').not().isEmpty(),
    ],
    ventaController.crearVenta
);
router.get('/', ventaController.obtenerVentas);
router.get('/:id', ventaController.obtenerVenta);
router.delete('/:id', ventaController.borrarVenta);

router.get('/', () => {});

module.exports = router;
