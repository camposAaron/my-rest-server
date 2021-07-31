const express = require('express');
const cors = require('cors');

class Server{
    
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';
        
        this.middlewares();

        this.routes();
    }

    middlewares(){

        //CORS
        this.app.use(cors());
        //lectura y parseo a json
        this.app.use(express.json());
        //Servir carpeta pública
        this.app.use( express.static('public'));
    }

    routes(){
        this.app.use(this.userPath, require('../routes/users'));
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log('Escuchando en el puerto: ', this.port);
        });        
    }


}

module.exports =  Server;