const { Router } = require('express');
const { body, param } = require('express-validator');
const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('../controllers/categories');
const { categoryExistById, categoryExistsByName } = require('../helpers/db-validators');

const { validateJWT, hasAdminRole, hasRole, validateFields } = require('../middlewares');

const router = Router();

router.get( '/', getCategories );

// Obtain category by id - public
// Middleware :id exists in category
router.get('/:id', [
    param('id').custom( categoryExistById ),
    validateFields
], getCategory);

// Create new category - private (whatever user logged with valid token)
router.post('/', [
        validateJWT,
        body('name', 'Name is required').not().isEmpty(),
        validateFields
    ], createCategory  
);

// Put update category by id - private (whatever user logged with valid token)
router.put('/:id', [
    validateJWT,
    param('id').custom( categoryExistById ),
    body('name', 'Name is required').not().isEmpty().custom( categoryExistsByName ),
    validateFields
], updateCategory);

// Delete category - only Admin
router.delete('/:id', [
    validateJWT,
    param('id').custom( categoryExistById ),
    hasAdminRole,
    validateFields
], deleteCategory);

module.exports = router;