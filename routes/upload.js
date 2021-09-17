const { Router } = require('express');
const { validarCampos, validarCargaArchivo } = require('../middlewares');
const { validateCollections } = require('../helpers');
const { check } = require('express-validator');

const { uploadImg, updateImg } = require('../controller/upload.controller');


const router = Router();

router.post('/', validarCargaArchivo , uploadImg);

router.put('/:collection/:id', [
    validarCargaArchivo,
    check('id','el id debe ser de mongo').isMongoId(),
    check('collection').custom( c => validateCollections(c, ['users', 'products']) ),
    validarCampos
], updateImg);

module.exports = router;