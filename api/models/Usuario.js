const mongoose = require("mongoose");
const UsuariosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  nacimiento: {
    dia: {
      type: Number,
      required: true,
      trim: true,
    },
    mes: {
      type: Number,
      required: true,
      trim: true,
    },
    año: {
      type: Number,
      required: true,
      trim: true,
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
  select: {
    type: Number,
    trim: true,
  },
  checkbox: {
    type: Boolean,
  },

});
 
module.exports = mongoose.model("Usuario", UsuariosSchema);