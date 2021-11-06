const Producto = require('../models/Producto');

exports.crearProducto = async (req, res) => {
    try {
        //nuevo producto
        const producto = new Producto(req.body);
        res.send('producto creado');
        //guardar producto
        await producto.save();
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
};

exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.send(productos);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
exports.obtenerProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        res.send(producto);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.modificarProducto = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (req.body.hasOwnProperty('titulo')) {
            producto.name = req.body.titulo;
        }
        if (req.body.hasOwnProperty('imagen')) {
            producto.image = req.body.imagen;
        }
        if (req.body.hasOwnProperty('price')) {
            producto.price = req.body.price;
        }
        if (req.body.hasOwnProperty('category')) {
            producto.category = req.body.category;
        }
        if (req.body.hasOwnProperty('description')) {
            producto.description = req.body.description;
        }
        if (req.body.hasOwnProperty('background')) {
            producto.background = req.body.background;
        }
        await producto.save();
        res.send(producto);
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};

exports.borrarProducto = async (req, res) => {
    try {
        await Producto.findByIdAndDelete(req.params.id);
        res.send('Producto eliminado');
    } catch (error) {
        res.status(400).send('Hubo un error en la conexion a la base de datos');
    }
};
