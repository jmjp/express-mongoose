const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const mongoose = require('mongoose');

class App {
    constructor() {
        this.connect();
        this.server = express();
        this.middlewares()
        this.routes()
    }
    
    connect(){
        mongoose.connect(process.env.DB_CONNECTION_STRING,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true
            }
        );
    }

    routes() {
        this.server.use(routes)
    }

    //Se ocorrerá algum tipo de middleware na aplicação
    middlewares() {
        this.server.use(cors())
        this.server.use(express.json())
    }
}

module.exports = new App().server;