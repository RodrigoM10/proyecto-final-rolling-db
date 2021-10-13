const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const AGE18 = 18 * 365 * 24 * 60 * 60 * 1000;

exports.registrar = async (req, res) => {
    // revisamos los errores
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
        return res.status(400).json({ msg: errores.array() });
    }

    const { email, password, birthday } = req.body;

    try {
        //revisar fecha de nacimiento
        const today = new Date().valueOf();
        const birthdayDate = new Date(birthday).valueOf();

        const age = today - birthdayDate;

        if (age <= AGE18) {
            return res.status(400).json({ msg: 'Sos menor no podes acceder ' });
        }
        // Revisando q el email sea unico
        let usuarioEncontrado = await Usuario.findOne({ email });

        if (usuarioEncontrado) {
            return res.status(400).send('Email ya esta en uso');
        }

        let usuario;

        //nuevo usuario
        const bodyUsuario = { ...req.body, role: 'user' };
        usuario = new Usuario(bodyUsuario);

        //hashear el password
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);

        //guardar usuario
        // await usuario.save();

        //mensaje de exito
        res.send('Usuario Creado Correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};

exports.login = async (req, res) => {
    try {
        // revisamos los errores
        const errores = validationResult(req);
        if (!errores.isEmpty()) {
            return res.status(400).json({ msg: errores.array() });
        }

        const { email, password } = req.body;

        //Revisar usuario registrado
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ msg: 'El Usuario no existe' });
        }

        //Revisar el password
        const passCorrect = await bcryptjs.compare(password, usuario.password);
        if (!passCorrect) {
            return res.status(400).json({ msg: 'Password incorrecto' });
        }

        // Si todo es correcto Crear y firmar JWT
        const payload = {
            usuario: {
                id: usuario.id,
                role: usuario.role,
            },
        };

        jwt.sign(
            payload,
            process.env.SECRETA,
            {
                expiresIn: 360000, //1 hora
            },
            (error, token) => {
                if (error) throw error;
                res.json({ token, name: usuario.name });
            }
        );
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.obtenerUsuarioAutenticado = async (req, res) => {
    // Leer token
    const token = req.header('x-auth-token');
    // Revisar Token
    if (!token) {
        return res.status(401).json({ msg: 'No hay Token, permiso no valido' });
    }

    // Validar Token
    try {
        const cifrado = jwt.verify(token, process.env.SECRETA);
        const usuario = await Usuario.findById(cifrado.usuario.id).select('name role email');
        res.send(usuario);
    } catch (error) {
        res.status(401).json({ msg: 'Token no valido' });
    }
};
