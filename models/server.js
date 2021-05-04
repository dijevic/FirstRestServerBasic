const express = require('express');
const cors    = require('cors')

class Server{

    constructor(){
       this.port = process.env.PORT 
        this.app = express();
        this.usuariosPath = '/api/users'

        // middlewares
        this.middlewares()
        // rutas de mi aplicacion
        this.routes()
        // this.listen()
    }
    middlewares(){
        this.app.use( cors() )
        this.app.use(express.static('public'))
        // lectura y parseo de body
        this.app.use(express.json())
    }
    routes(){
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