const { Category, Role, User, Product } = require('../models');

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

const productExistByName = async( name ) => {
    const productExists = await Product.findOne({ name: name.toUpperCase() });

    if( productExists ){
        throw new Error(`Product ${ name } already exists`);
    }
}

const productExistById = async( id ) => {
    const productExists = await Product.findById( id );

    if( !productExists ){
        throw new Error(`The product with id ${ id } doesn\'t exists`)
    }
}

const allowedCollections= ( collection = '', allowedCollections = [] ) => {

    const included = allowedCollections.includes( collection );

    if( !included ) {
        throw new Error(`The collection ${ collection } is not allowed. Must be: ${ allowedCollections }`)
    }

    return true;

}

module.exports = {
    allowedCollections,
    categoryExistById,
    categoryExistsByName,
    emailExists,
    userExistById,
    validateRole,
    productExistByName,
    productExistById
}