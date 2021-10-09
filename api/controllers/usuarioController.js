const Usuario = require("../models/Usuario");
 
exports.crearUsuario = async (req, res) => {
  try {
    let usuario;
 
    //nuevo usuario
    usuario = new Usuario(req.body);
 
    //guardar usuario
    await usuario.save();
 
    //mensaje de exito
    res.send("Usuario Creado Correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

  