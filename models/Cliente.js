const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es obligatorio']
    },
    apellidos: {
        type: String,
        minlength: 4,
        maxlength: 10
    },
    email: {
        type: String,
        match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    },
    cuota: {
        type: Number,
        validate: {
            validator: function (value) {
                return (value % 2 === 0);
            },
            message: 'La cuota debe ser par'
        }
    },
    activo: Boolean,
    dni: String
});

clienteSchema.virtual('nombreCompleto').get(function () {
    return this.nombre + ' ' + this.apellidos;
});

clienteSchema.virtual('nombreCompleto').set(function (newValue) {
    const arr = newValue.split(' ');
    this.nombre = arr[0];
    this.apellidos = arr[1];
});

clienteSchema.virtual('cuotaIva').get(function () {
    return this.cuota + (0.15 * this.cuota);
});

clienteSchema.statics.activos = function () {
    return this.model('cliente').find({ activo: true });
}

module.exports = mongoose.model('cliente', clienteSchema);

