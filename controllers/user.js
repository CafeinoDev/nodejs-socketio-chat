const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/users');



const usersGet = async(req = request, res = response) => {     
    const { limit = 5, from = 0 } = req.query

    const filterQuery = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(filterQuery),
        User.find(filterQuery).skip( from ).limit( limit )
    ]);
    
    res.json({
        total, 
        users
    });
}

const usersPost = async(req, res = response) => {
    const { name, email, password, role  } = req.body;
    const user = new User( {
        name, email, password, role
    } );

    // Password hash
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    // Store in DB
    await user.save();

    res.status(201).json(user);
};

const usersPut = async(req, res = response) => {
    const { id } = req.params;

    const { _id, password, google, ...rest } = req.body;

    // TODO Validar in database
    if( password ) {
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync( password, salt );
    }

    const user = await User.findByIdAndUpdate( id, rest );

    res.status(400).json(user);
}

const usersDelete = async(req, res = response) => {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate( id, { status: false } );



    res.json({
        user
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'API patch - From Controller'
    });
}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch,
}