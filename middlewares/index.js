const validateJWT    = require('./validate_jwt');
const validateRoles  = require('./validate_roles');
const validateFields = require('./validation_fields');
const validateFile   = require('./validate-file');

module.exports = {
    ...validateFields,
    ...validateFile,
    ...validateJWT,
    ...validateRoles,
}