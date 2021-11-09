const Venta = require('../models/Venta');
const { validationResult } = require('express-validator');

const AGE18 = 18 * 365 * 24 * 60 * 60 * 1000;

exports.crearVenta = async (req, res) => {
    // revisamos los errores
    //middleware
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    const { buyerDate } = req.body;
    console.log('🚀 ~ file: ventaController.js ~ line 30 ~ exports.crearVenta= ~ req.body', req.body);
    try {
        //revisar fecha de nacimiento
        const today = new Date().valueOf();
        const birthdayDate = new Date(buyerDate).valueOf();

        const age = today - birthdayDate;

        if (age <= AGE18) {
            return res.status(400).json({ msg: 'Sos menor no podes comprar ' });
        }

        let venta;

        //nueva venta
        venta = new Venta(req.body);

        //guardar venta
        await venta.save();

        //venta de exito
        res.json({ msg: 'Venta realizada Correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};

exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Venta.find();
        res.send(ventas);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
exports.obtenerVenta = async (req, res) => {
    try {
        const ventas = await Venta.findById(req.params.id).select('buyerEmail, buyerAdress1');
        res.send(ventas);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.borrarVenta = async (req, res) => {
    try {
        await Venta.findByIdAndDelete(req.params.id);
        res.send('venta eliminada');
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
