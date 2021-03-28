const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    username: String,
    email: String,
    password: String,
    rol: String
});

module.exports = mongoose.model('usuario', usuarioSchema);