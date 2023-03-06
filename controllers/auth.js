const { response } = require("express");
const bcrypt = require("bcryptjs");

const User = require('../models/users');
const { generateJWT } = require("../helpers/generate-jwt");


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

module.exports = {
    login
}