require('dotenv').config();
const mongoose = require('mongoose')

const connectionDB = async() => {

    try {
        
        await mongoose.connect(process.env.MONGO_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex:true,
            useFindAndModify: false
        });

        console.log('DataBase Connection OK')

    } catch (error) {
        throw new Error('Database Access failed',error)
    }

};


module.exports = {
    connectionDB
}