const validarJwt = require('../helpers/validar_jwt')
const {ChatMensaje}         = require('../models/index')
const chatMensaje = new ChatMensaje()

const socketController = async (socket , io)=>{

    // verifico que retorna el validador de jwt
    const usuario = await validarJwt(socket.handshake.headers['x-token'])

    if(!usuario){
       return socket.disconnect()
    }
    chatMensaje.conectarUsuarios(usuario)

   //  con la propiedad del socket join lo uno a alguna sala especial
    socket.join( usuario.id )
    io.emit('usuarios-activos',chatMensaje.usuariosArr)

    io.emit('recibir-mensaje',chatMensaje.ultimos10Mensajes)

// elimino de la lista a el usuario que se desconecta
     socket.on('disconnect',()=>{
        chatMensaje.desconectarUsuario(usuario.id)
      io.emit('usuarios-activos',chatMensaje.usuariosArr)


     })

     
     socket.on('enviar-mensaje',({mensaje,uid})=>{
        

      if(uid){
         socket.to(uid).emit('mensaje-privado',{usuario , mensaje})
      }else{

        // crep un mensaje y la agrego al arreglo de mensajes
        chatMensaje.enviarMensajes(usuario.id , usuario.nombre , mensaje)

        // envior el mensaje a todas las salas
        io.emit('recibir-mensaje',chatMensaje.ultimos10Mensajes)
      }
     })

    
}

module.exports = {
    socketController
}