

class Mensaje{
    constructor(uid , nombre , mensaje){
        this.uid = uid
        this.nombre = nombre
        this.mensaje = mensaje
    }
}

// mi modelo para controlar en general el funcionamiento del chat

class ChatMensaje {

    constructor(){
        this.mensajes = []; 
        this.usuarios = {};
    }


    // retorno los ultimos 10 mensajes
    get ultimos10Mensajes(){
        this.mensajes = this.mensajes.splice(0,10)
        return this.mensajes
    }

    // devuelvo mis usuarios en forma de arr
    get usuariosArr(){
        return Object.values(this.usuarios) 
    }


        // manekjador para enviar mensajes
    enviarMensajes(uid , nombre , mensaje){

        this.mensajes.unshift(
            new Mensaje(uid , nombre , mensaje)
        )

        return this.mensajes

    }
    // conecto a un usuario ' lo agrego a mi objeto
    conectarUsuarios(usuario) {
        this.usuarios[usuario.id] = usuario
    }
    // desconecto a un usuario lo elimino de mi objeto

    desconectarUsuario(id){
        delete this.usuarios[id]
    }
}

module.exports = {
    ChatMensaje
}