const jwt = require('jsonwebtoken');

const generateJWT = ( uid = '' ) => {
    return new Promise( (resolve, reject) => {

        const payload = { uid };

        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '10h'
        }, (err, token) => {
            if(err){
                console.log( err );
                reject( 'An error ocurred while generating JWT' )
            }else{
                resolve( token );
            }
        } )

    })

}

module.exports = {
    generateJWT
}