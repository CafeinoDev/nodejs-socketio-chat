const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/users');

const validateJWT = async(req = request, res = response, next) => {

    const token = req.header('Authorization')

    if( !token ){
        return res.status(401).json({
            msg: 'Token is required'
        })
    }

    try{
        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );

        const user = await User.findById( uid );

        if( !user ){
            return res.status(401).json({
                msg: 'Invalid token - User doesn\'t exist'
            })
        }

        if( !user.status ){
            return res.status(401).json({
                msg: 'Invalid token - User status false'
            })
        }

        req.user = user;
        next();
    } catch(error) {
        res.status(401).json({
            msg: 'Invalid token'
        });
    }
    
}

module.exports = {
    validateJWT
}