const { Router } = require('express');
const { body } = require('express-validator');
const { login, googleSignIn, renovateToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares');
const { validateFields } = require('../middlewares/validation_fields');

const router = Router();

router.post('/login', [
    body('email', 'The email is required').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    body('id_token', 'The token is required').not().isEmpty(),
    validateFields
], googleSignIn);


router.get('/', validateJWT, renovateToken );

module.exports = router;