const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsers, putUsers, postUsers, deleteUsers, patchUsers } = require('../controller/users.controller');
const router = Router();

router.get('/', getUsers);

router.put('/:id', putUsers);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe contener al menos 5 caracteres').isLength({ min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    check('role', 'No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
], postUsers);

router.delete('/', deleteUsers);

router.patch('/', patchUsers);

module.exports = router;

