const { Router } = require('express');
const { body, param } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validation_fields');

const router = Router();

router.post('/login', [
    body('email', 'The email is required').isEmail(),
    body('password', 'Password is required').not().isEmpty(),
    validateFields
],login);

module.exports = router;