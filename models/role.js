


const {Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'Role is important']
    }

});



module.exports = model('Role', RoleSchema)