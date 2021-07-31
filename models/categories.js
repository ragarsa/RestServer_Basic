
const {Schema, model } = require('mongoose');

const CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is important'],
        unique: true
    }, 
    state: {
        type: Boolean,
        default: true, 
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

});



module.exports = model('Category', CategorySchema)