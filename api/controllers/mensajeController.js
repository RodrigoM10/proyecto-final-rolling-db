const Mensaje = require('../models/Mensaje');
const { validationResult } = require('express-validator');

exports.crearMensaje = async (req, res) => {
    // revisamos los errores
    //middleware
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    try {
        let mensaje;

        //nuevo mensaje
        mensaje = new Mensaje(req.body);

        //guardar mensaje
        await mensaje.save();

        //mensaje de exito
        res.json({ msg: 'Mensaje enviado Correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};

exports.obtenerMensajes = async (req, res) => {
    try {
        const mensajes = await Mensaje.find();
        res.send(mensajes);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
exports.obtenerMensaje = async (req, res) => {
    try {
        const mensaje = await Mensaje.findById(req.params.id).select('senderName senderEmail messaje');
        res.send(mensaje);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.borrarMensaje = async (req, res) => {
    try {
        await Mensaje.findByIdAndDelete(req.params.id);
        res.send('usuario eliminado');
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
