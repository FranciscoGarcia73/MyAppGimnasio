const jwt = require('jsonwebtoken');
const dayjs = require('dayjs');

const Usuario = require('../models/Usuario');

const checkToken = (req, res, next) => {
    // 1 - Token incluido en las cabeceras (Authorization)
    if (!req.headers['authorization']) {
        return res.status(403).json({ error: 'Debes incluir la cabecera de Authorization' });
    }

    // 2 - Comprobar si el token es válido
    const token = req.headers['authorization'];
    let data = {};
    try {
        data = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
        return res.status(403).json({ error: 'El token no es correcto' });
    }

    // 3 - Comprobar si el token está caducado
    if (dayjs().unix() > data.caduca) {
        return res.status(403).json({ error: 'El token está caducado' });
    }

    req.usuarioId = data.usuarioId;

    next();
}

const checkAdmin = async (req, res, next) => {
    const usuario = await Usuario.findById(req.usuarioId);
    if (usuario.rol === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ error: 'Recurso solo disponible para ADMINs' });
    }
}

module.exports = {
    checkToken, checkAdmin
}