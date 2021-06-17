const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';


        //Middlewares

        this.middlewares();
        //Routes
        this.routes();
    }

    middlewares() {

        //cors
        this.app.use( cors()) ;
        

        //Middleware parse body
        this.app.use( express.json()) ;

        //Public Directory
        this.app.use( express.static('public') );

    }

    routes() {
        //Middleware routes
        this.app.use(this.usersPath, require('../routes/user'));
        
       
        
    }

    listen() {
        
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto', this.port)
        
        });
    }
};

module.exports = Server;