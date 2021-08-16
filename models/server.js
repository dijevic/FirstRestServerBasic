const express       = require('express');
const cors          = require('cors');
const{ dbConection} = require('../DB/config')
const fileUpload    = require('express-fileupload')
const {socketController} = require('../sockets/controller.sockets')


class Server{

    constructor(){
       this.port = process.env.PORT 
       this.app = express();
    //    configuracion de mi server-socket
       this.server = require('http').createServer(this.app);
       this.io = require('socket.io')(this.server);
    //    configuracion de mi server-socket END

        this.paths = {
            Auth       : '/api/auth',
            buscar     : '/api/buscar',
            Categorias : '/api/categorias',
            productos  : '/api/productos',
            productos_categoria : '/api/productosxcategoria',
            usuarios   : '/api/users',
            uploads    : '/api/uploads',
            JWT        : '/api/auth/jwt',
        }

        this.conectDb()
        // middlewares
        this.middlewares()
        // rutas de mi aplicacion
        this.routes()
        this.listen()
        this.sockets()
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
        this.app.use(this.paths.JWT , require('../routes/auth'))

    }
    listen(){
        this.server.listen(this.port,()=>{
            console.log(`servidor corriendo en el puerto ${this.port}`)
        })
    }

    // sockets 

    sockets(){
        this.io.on('connection',(socket)=> socketController(socket , this.io) );
    }

}

module.exports = {
    Server
}