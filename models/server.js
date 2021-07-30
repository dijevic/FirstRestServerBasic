const express = require('express');
const cors    = require('cors');
const{ dbConection}= require('../DB/config')
const fileUpload= require('express-fileupload')

class Server{

    constructor(){
       this.port = process.env.PORT 
        this.app = express();

        this.paths = {
            Auth       : '/api/auth',
            buscar     : '/api/buscar',
            Categorias : '/api/categorias',
            productos  : '/api/productos',
            productos_categoria : '/api/productosxcategoria',
            usuarios   : '/api/users',
            uploads    : '/api/uploads'
        }

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
        
        // middleware para subida de archivos

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));
    }
    routes(){
        this.app.use(this.paths.Auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.Categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.productos_categoria , require('../routes/productos_categoria'))
        this.app.use(this.paths.buscar , require('../routes/buscar'))
        this.app.use(this.paths.uploads , require('../routes/uploads'))

    }
    listen(){
        this.app.listen(this.port,()=>{
            console.log(`servidor corriendo en el puerto ${this.port}`)
        })
    }

}

module.exports = {
    Server
}