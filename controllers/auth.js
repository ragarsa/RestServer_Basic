const { response } = require('express')
const User = require('../models/user');
const bs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) => {

    const { email, password } = req.body

    try {

        //Verify if email exists
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                msg: 'The user/password are invalid - email'
            })
        }




        //Verify if status:True
        if (!user.state) {
            return res.status(400).json({
                msg: 'The user/password are invalid - state:false'
            })
        }
        //Verify password
        const validPassword = bs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'The user/password are invalid - password'
            })
        }


        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Something gone wrong"
        });
    }



};

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;
    try {

        const { name, email, img } = await googleVerify(id_token);

        let user = await User.findOne({ email });

        if (!user) {
            //Create user 
            const data = {
                name,
                email,
                password: ':P',
                img,
                google: true

            };
            user = new User(data)
            await user.save();
        }

        //Si el susuario en DB
        if (!user.state) {
            res.status(401).json({
                msg: 'Contact to admin to unblock your account'
            })
        };

        //Generate JWT
        const token = await generateJWT(user.id);

        res.json({
            user, 
            token
        })

    } catch (error) {
        res.status(401).json({
            msg: 'Token in google is not valid'
        })
    }


};

module.exports = {
    login,
    googleSignIn
}