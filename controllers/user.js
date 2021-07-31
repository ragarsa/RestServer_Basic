const { response, request } = require('express');
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator');
const User = require('../models/user');



const getUser = async (req = request, res = response) => {

    let { limit = 5, from = 0 } = req.query;
    const query = { state: true }
    if (Number.isNaN(Number(limit)) || Number.isNaN(Number(from))) {
        limit = 5;
        from = 0;
    }




    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        // resp
        total,
        users
    })
}



const postUser = async (req, res = response) => {


    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // //Verify email

    //Hash password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt)

    //Save in DB
    await user.save();

    res.status(201).json({
        user
    })
}

const putUser = async (req, res = response) => {

    const { id } = req.params
    const { _id, password, google, correo, role, ...resto } = req.body;

    //TODO validate in DB 
    if (password) {
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(password, salt)

    }


    const userDB = await User.findByIdAndUpdate(id, resto)


    res.json(userDB)
}

const patchUser = (req, res = response) => {
    res.json({
        msg: 'patch API from controller'
    })
}

const deleteUser = async (req, res = response) => {
    try {

        const { id } = req.params;




        await User.findByIdAndUpdate(id, { state: false });
        const user = await User.findById(id);



        res.json({
            user
        })
    } catch (error) {
        res.json({msg: 'Algo anda mal'})
    }

}


module.exports = {
    getUser,
    postUser,
    putUser,
    patchUser,
    deleteUser
}












//Verify email 
 // const existEmail = await User.findOne({email})
    // if (existEmail) {
    //     return res.status(400).json({
    //         msg:'The email already exists'
    //     })
    // }