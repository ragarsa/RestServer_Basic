const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No token in requests'
        });
    }

    try {

        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //read model
        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valid - user not in database'
            })
        }

        // validate if state:false

        if (!user.state) {
            return res.status(401).json({
                msg: 'Token no valid - user with state false'
            })
        }

        req.user = user;

        next();

    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'No valid token'
        })
    }



};


module.exports = {
    validateJWT
}