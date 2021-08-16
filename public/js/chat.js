// referencias al html :
const txtUid = document.getElementById('txtUid')
const txtMensaje = document.getElementById('txtMensaje')
const ulUsuarios = document.getElementById('ulUsuarios')
const ulMensajes = document.getElementById('ulMensajes')
const btnSalir = document.getElementById('btnSalir')

const usuario = null ;
let socket ;

let url = (window.location.host.includes('localhost'))
          ? `http://localhost:8080/api/auth/`
          : `https://restserver--inicial.herokuapp.com/api/auth/`


// validar el token guardado en el localstorage
const validarJwt = async()=>{

    const token = localStorage.getItem('token') || '';
    
    if(token.length < 10 || token == null || token == undefined){
        window.location ='index.html'
        throw new Error('no hay token en el servidor')
    }
// mando mi peticion al sevidor con mi token 
    try{
        const resp = await fetch(url + 'jwt',{
            headers : {'x-token' : token}
        })
        
        const {status, usuario : usuarioDB , token: tokenDB , message} = await resp.json()
        if(message){
            window.location ='index.html'
            throw new Error(message)

        }
        if(status == 200){
            document.title = usuarioDB.nombre
            localStorage.setItem('token',tokenDB)
            conectSocket()

        }
    }catch(e){console.log(e)}



}

const conectSocket = async ( )=>{

  socket = io({
        'extraHeaders' : {
            'x-token': localStorage.getItem('token')
        }
    })

    socket.on('connect',()=>{
        console.log('sockets online')
    })
    socket.on('disconnect',()=>{
        console.log('sockets online')
    })
    socket.on('recibir-mensaje',dibujarMensajes)
    socket.on('usuarios-activos',dibujarUsuarios)
    socket.on('mensaje-privado',(payload)=>{
        console.log(payload)
    })

 
 




}

const main = async()=>{

    // validar json web token
    await validarJwt()
}


const dibujarUsuarios = (usuarios = [])=>{

    let html = ''

    usuarios.forEach(({nombre , uid}) => {
        
        html = html +  `
        <li class="mb-2">
                    <p>
                        <h5 class="text-success">${nombre}</h5>
                        <span class="fs-6 text-muted">${uid}</span>
                    </p>
        </li>`
    })
    ulUsuarios.innerHTML = html
}

const dibujarMensajes = (Mensajes= [])=>{

    let html = ''

    Mensajes.forEach(({nombre , uid, mensaje}) => {
        
        html = html +  `
        <li class="mb-2">
                    <p>
                        <h5 class="text-success">${nombre}</h5>
                        <span class="fs-6 text-muted">${mensaje}</span>

                    </p>
        </li>`
    })
    ulMensajes.innerHTML = html
}

txtMensaje.addEventListener('keyup',({keyCode})=>{
    
    const uid = txtUid.value
    const mensaje = txtMensaje.value
    if(keyCode != 13 || mensaje.length == 0){
        return ;
    }
    socket.emit('enviar-mensaje',{mensaje, uid})
    txtMensaje.value = ''

})


main()