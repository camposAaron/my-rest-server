const { Router } = require('express');
const { check } = require('express-validator');

const {
    validarCampos,
    validarJWT,
    isAdminRole
} = require('../middlewares/index');

const {
    existsCategoryId,
    existsProduct
} = require('../helpers/db-validator');

const {
    createProduct, getProducts, getProductById
} = require('../controller/product.controller')

const router = Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id','el id no es valido').isMongoId(),
    check('id').custom(existsProduct),
    validarCampos
], getProductById);

router.delete('/:id', (req, res) => {
    res.json('delete');
});

router.put('/:id', (req, res) => {
    res.json('put');
});

router.post('/', [
    validarJWT,
    isAdminRole,
    check('name').not().isEmpty(),
    check('price').isNumeric(),
    check('category').isMongoId(),
    check('category').custom(existsCategoryId),
    check('description').isString(),
    check('available').isBoolean(),
    validarCampos

], createProduct);

module.exports = router;

