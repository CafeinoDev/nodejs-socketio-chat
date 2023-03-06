const { response, request } = require("express")


const hasAdminRole = (req = request, res = response, next) => {
    if( !req.user ){
        return res.status(500).json({
            msg: 'Pretending validate role without validate JWT'
        });
    }

    const { name, role } = req.user;

    if( role !== 'ADMIN_ROLE' ){
        return res.status(401).json({
            msg: `${ name } is not authorized`
        })
    }
    
    next();
}

const hasRole = ( ...roles ) => {
    return (req = request, res = response, next) => {
        if( !req.user ){
            return res.status(500).json({
                msg: 'Pretending validate role without validate JWT'
            });
        }


        if( !roles.includes( req.user.role ) ){
            return res.status(401).json({
                msg: `Unauthorized role to do this action`
            })
        }

        next();
    }
}

module.exports = {
    hasAdminRole,
    hasRole
}