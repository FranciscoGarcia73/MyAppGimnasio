const router = require('express').Router();
const Teacher = require('../models/Teacher');

// GET /teachers
router.get('/', (req, res) => {
    Teacher.find()
        .then(teachers => {
            res.render('teachers/index', { teachers });
        })
        .catch(error => console.log(error));
});

// GET /teachers/editar/IDTEACHER
router.get('/editar/:idTeacher', (req, res) => {
    Teacher.findById(req.params.idTeacher)
        .then(teacher => res.render('teachers/edit', { teacher }))
        .catch(error => console.log(error));
});

router.post('/update', (req, res) => {
    Teacher.findByIdAndUpdate(req.body.id, req.body, { new: true })
        .then(teacherEditado => res.redirect('/teachers'))
        .catch(error => console.log(error))
});


module.exports = router;