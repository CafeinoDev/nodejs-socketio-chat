const validateJWT = require('./validate_jwt');
const validateRoles = require('./validate_roles');
const validateFields = require('./validation_fields');

module.exports = {
    ...validateFields,
    ...validateRoles,
    ...validateJWT
}