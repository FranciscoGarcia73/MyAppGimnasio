const router = require('express').Router();
const Teacher = require('../../models/Teacher');
const { check, validationResult } = require('express-validator');
const { checkAdmin } = require('../middlewares');

router.get('/', (req, res) => {
    Teacher.find()
        .then(teachers => {
            res.json(teachers);
        })
        .catch(error => {
            res.json(error);
        });
});

router.post('/',checkAdmin , [
    check('nombre', 'El campo nombre es obligatorio').exists(),
    check('apellidos', 'El campo apellidos es obligatorio').exists(),
    check('edad', 'La edad es obligatoria').exists().isNumeric(),
    check('especialidad', 'La especialidad es obligatoria').exists()
], async (req, res) => {

    // Comprobamos los errores del BODY
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    try {
        const nuevoTeacher = await Teacher.create(req.body);
        res.json(nuevoTeacher);
    } catch (error) {
        res.json(error);
    }
});



module.exports = router;