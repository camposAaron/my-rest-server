const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const { uploadArchive } = require('../controller/upload.controller');


const router = Router();

router.post('/', uploadArchive);

module.exports =  router;