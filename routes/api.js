const router = require('express').Router();
const { checkToken } = require('./middlewares');

const clientesApiRouter = require('./api/clientes');
const usuariosApiRouter = require('./api/usuarios');
const teacherApiRouter = require('./api/teachers');

router.use('/clientes', checkToken, clientesApiRouter);
router.use('/usuarios', usuariosApiRouter);
router.use('/teachers',checkToken, teacherApiRouter);

module.exports = router;