const { response } = require("express");


const validateAdminRole = (req, res = response, next) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Token invalid, you cant verify the role of the user '
        })
    }

    const {role, name} = req.user; 

    if (role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} is not administrator`
        })
    }
 
    next(); 

};


const hasRole = ( ...roles ) => {


    
    return (req, res, next) => {
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Token invalid, you cant verify the role of the user '
            })
        }

        if (!roles.includes(req.user.role)) {
            return res.status(401).json({
                msg: 'Do not have the permissions to modify'
            })
        }

        next(); 
    }

};



module.exports = {
    validateAdminRole,
    hasRole
}