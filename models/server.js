const express = require('express');
const cors    = require('cors');
const{ dbConection}= require('../DB/config')

class Server{

    constructor(){
       this.port = process.env.PORT 
        this.app = express();
        this.usuariosPath = '/api/users';
        this.pathAuth     = '/api/auth'
        this.conectDb()
        // middlewares
        this.middlewares()
        // rutas de mi aplicacion
        this.routes()
        // this.listen()
    }
    async conectDb(){
        await dbConection()
    }
    middlewares(){
        this.app.use( cors() )
        this.app.use(express.static('public'))
        // lectura y parseo de body
        this.app.use(express.json())
    }
    routes(){
        this.app.use(this.pathAuth, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/user'))
    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`servisor corriendo en el puerto ${this.port}`)
        })
    }

}

module.exports = {
    Server
}