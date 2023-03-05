const { Router } = require('express');
const { body, param } = require('express-validator');
const { usersGet,
        usersPost,
        usersPut,
        usersDelete,
        usersPatch } = require('../controllers/user');

const { validateRole, emailExists, userExistById } = require('../helpers/db-validators');
const { validateFields } = require('../middlewares/validation_fields');



const router = Router();


router.get('/', usersGet);

router.post('/', 
    [
        body('name', 'Name is required').not().isEmpty(),
        body('email', 'Email is not valid').isEmail().custom( emailExists ),
        body('password', 'Password is required and length more than 6 character').isLength({ min: 6 }),
        // body('role', 'Isn\'t a valid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        body('role').custom( validateRole ),
        validateFields
    ],
    usersPost);

router.put('/:id', 
    [
        param('id', 'The id is not valid').isMongoId(),
        param('id').custom( userExistById ),
        validateFields
    ],
    usersPut);

router.delete('/:id',
    [
        param('id', 'The id is not valid').isMongoId(),
        param('id').custom( userExistById ),
        validateFields
    ], usersDelete);

router.patch('/', usersPatch);

module.exports = router;