const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

exports.crearUsuario = async (req, res) => {
    // revisamos los errores
    //middleware
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    const { email, password } = req.body;

    try {
        // Revisando q el email sea unico
        let usuarioEncontrado = await Usuario.findOne({ email });

        if (usuarioEncontrado) {
            return res.status(400).json({ msg: 'Ya existe una cuenta con ese email' });
        }

        let usuario;

        //nuevo usuario
        usuario = new Usuario(req.body);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        await usuario.save();

        //mensaje de exito
        res.json({ msg: 'Usuario Creado Correctamente' });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};

exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
exports.obtenerUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id).select('name email role ');
        res.send(usuario);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.modificarUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!req.body.name) {
            return res.status(400).send('Dato de nombre incompleto');
        }
        usuario.name = req.body.name;
        await usuario.save();
        res.send(usuario);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.borrarUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.send('usuario eliminado');
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
