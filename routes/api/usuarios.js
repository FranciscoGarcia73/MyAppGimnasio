const router = require('express').Router();
const Usuario = require('../../models/Usuario');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dayjs = require('dayjs');
const jwt = require('jsonwebtoken');

// /api/usuarios/registro
router.post('/registro', [
    check('username').exists(),
    check('email').exists().isEmail(),
    check('password').exists().matches(/^([a-zA-Z0-9@*#]{8,15})$/),
    check('email').custom(async value => {
        const usuario = await Usuario.findOne({ email: value });
        console.log(usuario);
        if (usuario) {
            throw new Error('Email ya existe');
        } else {
            return true;
        }
    })
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ error: errors.array() });
    }

    // Encripto la password
    req.body.password = bcrypt.hashSync(req.body.password, 10);

    req.body.rol = 'NORMAL';

    Usuario.create(req.body)
        .then(nuevoUsuario => {
            res.json({ success: 'Se ha creado el usuario' });
        }).catch(error => {
            res.json({ error: 'Se ha producido un error en el registro' });
        });
});





router.post('/login', async (req, res) => {
    // 1 - Comprobar el usuario a partir de su email
    const usuario = await Usuario.findOne({
        email: req.body.email
    });
    if (usuario) {
        // El email está en la BD
        // Comparo las password
        const iguales = bcrypt.compareSync(req.body.password, usuario.password);
        if (iguales) {
            res.json({
                success: '¡Login correcto!',
                token: createToken(usuario)
            });
        } else {
            res.json({ error: "El email/password es incorrecto 2" });
        }
    } else {
        // El email NO está en la BD
        res.json({ error: "El email/password es incorrecto 1" });
    }
});

function createToken(usuario) {
    const data = {
        usuarioId: usuario._id,
        caduca: dayjs().add(10, 'days').unix()
    }

    return jwt.sign(data, process.env.SECRET_KEY);
}



module.exports = router;