const express = require('express');
const cors = require('cors');
const { connectionDB } = require('../DB/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.pathRoutes = {
            usersPath: '/api/users',
            authPath: '/api/auth',
            categoriesPath: '/api/categories'
        }



        //Connect DB
        this.connectDB()

        //Middlewares

        this.middlewares();
        //Routes
        this.routes();


    }

    async connectDB() {
        await connectionDB()
    }

    middlewares() {

        //cors
        this.app.use(cors());


        //Middleware parse body
        this.app.use(express.json());

        //Public Directory
        this.app.use(express.static('public'));

    }

    routes() {
        //Middleware routes
        this.app.use(this.pathRoutes.authPath, require('../routes/auth'));
        this.app.use(this.pathRoutes.categoriesPath, require('../routes/categories'));
        this.app.use(this.pathRoutes.usersPath, require('../routes/user'));


    }

    listen() {

        this.app.listen(this.port, () => {
            console.log('Servidor en puerto', this.port)

        });
    }
};

module.exports = Server;