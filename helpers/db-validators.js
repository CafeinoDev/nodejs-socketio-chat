const { Category, Role, User } = require('../models');

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

const categoryExistById = async( id ) => {
    const categoryExists = await Category.findById( id );

    if( !categoryExists ){
        throw new Error(`Category with id ${ id } doesn\'t exists`);
    }
}

const categoryExistsByName = async( name ) => {
    const categoryExists = await Category.findOne({ name: name.toUpperCase() });

    if( categoryExists ){
        throw new Error(`Category with name ${ name } already exists`);
    }
}

module.exports = {
    categoryExistById,
    categoryExistsByName,
    emailExists,
    userExistById,
    validateRole,
}