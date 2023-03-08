const { Router } = require('express');
const { body, param } = require('express-validator');

const { uploadFields, updateImages, showImage } = require('../controllers/uploads');
const { allowedCollections } = require('../helpers');
const { validateFields, validateFile } = require('../middlewares');

const router = Router();

router.post( '/', validateFile, uploadFields );

router.put( '/:collection/:id', [
    validateFile,
    param('id', 'Must be valid id').isMongoId(),
    param('collection').custom( c => allowedCollections( c, ['users', 'products'] )),
    validateFields
], updateImages );

router.get( '/:collection/:id',
[
    param('id', 'Must be valid id').isMongoId(),
    param('collection').custom( c => allowedCollections( c, ['users', 'products'] )),
    validateFields
], showImage )

module.exports = router;