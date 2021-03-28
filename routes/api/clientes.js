const router = require('express').Router();
const Cliente = require('../../models/Cliente');
const { check, validationResult } = require('express-validator');
const { checkAdmin } = require('../middlewares');

router.get('/', (req, res) => {
    console.log("USER_ID", req.usuarioId);
    Cliente.find()
        .then(clientes => {
            res.json(clientes);
        })
        .catch(error => {
            res.json(error);
        });
});

router.post('/',checkAdmin ,[
    check('nombre', 'El campo nombre es obligatorio').exists(),
    check('apellidos', 'El campo apellidos es obligatorio').exists(),
    check('email', 'El email es incorrecto').exists().isEmail(),
    check('dni', 'El dni es incorrecto').custom(value => {
        return (/^[0-9]{8}[TRWAGMYFPDXBNJZSQVHLCKE]$/i).test(value);
    })
], async (req, res) => {

    // Comprobamos los errores del BODY
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    try {
        const nuevoCliente = await Cliente.create(req.body);
        res.json(nuevoCliente);
    } catch (error) {
        res.json(error);
    }
});

router.put('/:idCliente', async (req, res) => {
    try {
        const clienteEditado = await Cliente.findByIdAndUpdate(req.params.idCliente, req.body, { new: true });
        res.json(clienteEditado);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/:idCliente', (req, res) => {
    Cliente.findByIdAndRemove(req.params.idCliente)
        .then(clienteBorrado => {
            res.json(clienteBorrado);
        }).catch(error => {
            res.json({ error: error.message });
        });
});

module.exports = router;