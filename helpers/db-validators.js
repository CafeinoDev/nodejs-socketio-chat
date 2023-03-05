const Role = require('../models/role');
const User = require('../models/users');

const validateRole = async(role = '') => {
    const roleExist = await Role.findOne({ role });

    if( !roleExist ) {
        throw new Error(`Role ${ role } doesn't exists`);
    }
};

const emailExists = async(email = '') => {
    const emailExists = await User.findOne({ email });

    if ( emailExists ){
        throw new Error('Email already exists');
    }
}

const userExistById = async( id ) => {
    const userExists = await User.findById( id )

    if ( !userExists ){
        throw new Error('Id not exists');
    }
}

module.exports = {
    validateRole,
    emailExists,
    userExistById
}