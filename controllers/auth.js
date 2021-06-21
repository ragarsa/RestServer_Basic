const {response } = require('express')
const User = require('../models/user');
const bs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async(req, res=response) => {
    
    const {email, password} = req.body

    try {

        //Verify if email exists
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({
                msg:'The user/password are invalid - email'
            })
        }

        


        //Verify if status:True
        if (!user.state){
            return res.status(400).json({
                msg:'The user/password are invalid - state:false'
            })
        }
        //Verify password
        const validPassword = bs.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg:'The user/password are invalid - password'
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
            msg:"Something gone wrong"
        });
    }

    

};

module.exports = {
    login
}