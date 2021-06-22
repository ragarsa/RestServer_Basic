
const {Schema, model} = require('mongoose');

const UserSchema = Schema({
    name: {
        type:String,
        required:[true, 'You have to write the name']
    },
    email: {
        type:String, 
        required:[true, 'You have to write the email'],
        unique: true
    },
    password: {
        type: String, 
        required:[true, "You have to write the password"]
    },
    img: {
        type: String

    },
    role: {
        type: String,
        required: true, 
        default: 'USER_ROLE',
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    state: {
        type: Boolean,
        default: true

    },
    google: {
        type: Boolean,
        default: false
    }
});

//overwrite a method
UserSchema.methods.toJSON = function () {
    const {__v, password, _id, ...user} = this.toObject();
    user['uid'] = _id
    return user; 
}

module.exports = model( 'User', UserSchema );

// {
//     name:'',
//     email:'',
//     password:'hash',
//     img:'url_image',
//     rol:'',
//     state: false, 
//     google:false, 
// }
