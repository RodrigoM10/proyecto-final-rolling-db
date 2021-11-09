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
        check('buyerData.buyerEmail', 'Agrega un Email Valido').isEmail(),
        check('buyerData.buyerName', 'Nombre obligatorio').not().isEmpty(),
        check('buyerData.buyerLastName', 'Apellido obligatorio').not().isEmpty(),
        check('buyerShipping.buyerCity', 'Apellido obligatorio').not().isEmpty(),
        check('buyerShipping.buyerState', 'Apellido obligatorio').not().isEmpty(),
        check('buyerShipping.buyerZip', 'Apellido obligatorio').not().isEmpty(),
        check('buyerCard.buyerCardNumber', 'Apellido obligatorio').not().isEmpty(),
        check('buyerCard.buyerCardName', 'Apellido obligatorio').not().isEmpty(),
        check('buyerCard.buyerCardDate', 'Apellido obligatorio').not().isEmpty(),
        check('buyerCard.buyerCardCode', 'Apellido obligatorio').not().isEmpty(),
    ],
    ventaController.crearVenta
);
router.get('/', ventaController.obtenerVentas);
router.get('/:id', ventaController.obtenerVenta);
router.delete('/:id', ventaController.borrarVenta);

router.get('/', () => {});

module.exports = router;
