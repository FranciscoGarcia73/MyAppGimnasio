const router = require('express').Router();
const Cliente = require('../models/Cliente');

// GET /clientes
router.get('/', (req, res) => {
    Cliente.find()
        .then(clientes => {
            res.render('clientes/index', { clientes });
        })
        .catch(error => console.log(error));
});

//  GET/clientes/activos
router.get('/activos', (req, res) => {
    Cliente.activos()
        .then(clientes => {
            res.render('clientes/index', { clientes });
        })
        .catch(error => console.log(error));
});

// GET /clientes/nuevo
router.get('/nuevo', (req, res) => {
    res.render('clientes/new');
});

// GET /clientes/delete/IDCLIENTE
router.get('/delete/:idCliente', (req, res) => {
    Cliente.findByIdAndDelete(req.params.idCliente)
        .then(clienteBorrado => {
            console.log(clienteBorrado);
            res.redirect('/clientes');
        })
        .catch(error => console.log(error));
});

// GET /clientes/editar/IDCLIENTE
router.get('/editar/:idCliente', (req, res) => {
    Cliente.findById(req.params.idCliente)
        .then(cliente => res.render('clientes/edit', { cliente }))
        .catch(error => console.log(error));
});

router.post('/create', cambiosFormulario, (req, res) => {
    Cliente.create(req.body)
        .then(nuevoCliente => {
            console.log(nuevoCliente);
            res.redirect('/clientes');
        })
        .catch(error => console.log(error));
});

router.post('/update', cambiosFormulario, (req, res) => {
    Cliente.findByIdAndUpdate(req.body.id, req.body, { new: true })
        .then(clienteEditado => res.redirect('/clientes'))
        .catch(error => console.log(error))
});

// Middleware
function cambiosFormulario(req, res, next) {
    req.body.cuota = parseFloat(req.body.cuota);
    req.body.activo = req.body.activo ? true : false;
    next();
}

module.exports = router;