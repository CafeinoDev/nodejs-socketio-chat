const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const User = require('../models/users');
const { generateJWT } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try{

        // Verify if email exists
        const user = await User.findOne({ email })

        // Verify if user is active
        if (! user ){
            return res.status(400).json({
                msg: 'Bad email or password - status: email'
            });
        }

        // Verify status
        if (! user.status ){
            return res.status(400).json({
                msg: 'Bad email or password - status: false'
            });
        }

        // Verify password
        const validPassword = bcrypt.compareSync( password, user.password );
        if (! validPassword ){
            return res.status(400).json({
                msg: 'Bad email or password - status: password'
            });
        }

        // Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            msg: 'Something goes wrong'
        })
    }

}

const googleSignIn = async(req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const { email, name, picture } = await googleVerify(id_token);
        
        let user = await User.findOne({ email });

        if( !user ){
            const data = {
                name,
                email,
                password: ':)',
                img: picture,
                google: true
            };

            user = new User( data );

            await user.save();
        }

        if ( !user.status ){
            return res.status(401).json({
                msg: 'User status false'
            });
        }

        // Generate JWT
        const token = await generateJWT( user.id );

        res.json({
            user,
            token
        });
    }catch(err){
        json.status(400).json({
            msg: 'Google token unrecognized'
        })
    }

}

const renovateToken = async(req, res = response) => {
    const { user } = req;

    const token = await generateJWT( user.id );

    res.json({
        user,
        token
    });
}

module.exports = {
    googleSignIn,
    login,
    renovateToken
}