const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // no es requerido: usuarios de Google no tienen password
    rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' },
    googleId: { type: String, default: null },
    avatar: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuario', usuarioSchema);
