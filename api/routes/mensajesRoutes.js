// Rutas para mensajes
const express = require('express');
const router = express.Router();
const mensajeController = require('../controllers/mensajeController');
const { check } = require('express-validator');

// Crear un mensaje
// api/mensajes
router.post(
    '/',
    [
        check('senderName', 'El nombre es obligatorio').not().isEmpty(),
        check('senderEmail', 'El email es obligatorio').not().isEmpty(),
        check('mensaje', 'Escriba un mensaje por favor').not().isEmpty(),
        check('senderEmail', 'Agrega un Email Valido').isEmail(),
        check('mensaje', 'El mensaje debe tener como mínimo de 10 caracteres').isLength({ min: 10 }),
        check('mensaje', 'El mensaje debe tener como maximo de 250 caracteres').isLength({ max: 250 }),
    ],
    mensajeController.crearMensaje
);
router.get('/', mensajeController.obtenerMensajes);
router.get('/:id', mensajeController.obtenerMensaje);
router.delete('/:id', mensajeController.borrarMensaje);

router.get('/', () => {});

module.exports = router;
