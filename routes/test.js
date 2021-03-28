const router = require('express').Router();
const Cliente = require('../models/Cliente');

// Inserción a través de instancia
router.get('/insert_v1', (req, res) => {
    const cliente = new Cliente();
    cliente.nombre = 'Araceli';
    cliente.apellidos = 'López';
    cliente.email = 'aralop@gmail.com';
    cliente.cuota = 29.99;
    cliente.activo = true;

    cliente.save()
        .then(nuevoCliente => {
            res.json(nuevoCliente);
        })
        .catch(error => res.json(error));
});

// Inserción con método create
router.get('/insert_v2', async (req, res) => {
    const nuevoCliente = await Cliente.create({
        nombre: 'Ramón',
        apellidos: 'Martín',
        email: 'ramon@gmail.com',
        cuota: 40,
        activo: true
    });
    res.json(nuevoCliente);
});

// Recuperación de clientes
router.get('/find', (req, res) => {
    // SELECT * FROM clientes
    Cliente.find()
        .then(clientes => res.json(clientes))
        .catch(error => console.log(error));
});

// Recuperar clientes activos
router.get('/activos', async (req, res) => {
    try {
        const clientes = await Cliente.find({ activo: true });
        res.json(clientes);
    } catch (error) {
        console.log(error);
    }
});

// Recuperar clientes con cuota superior a 30€
router.get('/cuota_superior', (req, res) => {
    Cliente.find({
        cuota: { $gte: 30, $lt: 100 },
        activo: true
    })
        .then(clientes => res.json(clientes))
        .catch(error => console.log(error));
});

// Recuperar clientes con cuota menor 30 o activos
router.get('/or', (req, res) => {
    Cliente.find({
        $or: [
            { cuota: { $lt: 30 } },
            { activo: true }
        ]
    }).sort({ cuota: -1 })
        .then(clientes => res.json(clientes))
        .catch(error => console.log(error));
});


module.exports = router;