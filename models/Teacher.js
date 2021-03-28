const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El campo nombre es obligatorio']
    },
    apellidos: {
        type: String,
        minlength: 4,
        maxlength: 10
    },
    edad: {
        type: Number,
        validate: {
            validator: function (value) {
                return (value>0 && value<100);    
            },
            message: 'La edad debe ser mayor que 0 y menor que 100'
        }
        
    },
    especialidad: {
        type: String,
        required: [true, 'El campo nombre es obligatorio']

    }
});


module.exports = mongoose.model('teacher', teacherSchema);