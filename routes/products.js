const { Router } = require('express');
const { body, param } = require('express-validator');
const { getProducts, createProduct, getProduct, deleteProduct, updateProduct } = require('../controllers/products');

const { categoryExistById, productExistByName, productExistById } = require('../helpers/db-validators');

const { validateJWT, hasAdminRole, validateFields } = require('../middlewares');

const router = Router();


router.get('/', getProducts);

router.get('/:id', [
    validateJWT,
    param('id', 'Must be a valid id').isMongoId().custom( productExistById ),
    validateFields
], getProduct);

router.post('/', [
    validateJWT,
    body('name', 'Name is required').not().isEmpty().custom( productExistByName ),
    body('category', 'Category is required').isMongoId().custom( categoryExistById ),
    validateFields
], createProduct);

router.put('/:id', [
    validateJWT,
    param('id', 'Must be a valid id').isMongoId().custom( productExistById ),
    body('name', 'Name is required').not().isEmpty().custom( productExistByName ),
    body('category', 'Category is required').isMongoId().custom( categoryExistById ),
    validateFields
], updateProduct);

router.delete('/:id', [
    validateJWT,
    hasAdminRole,
    param('id', 'Must be a valid id').isMongoId().custom( productExistById ),
    validateFields
], deleteProduct);

module.exports = router;
