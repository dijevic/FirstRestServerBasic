const JWT = require('jsonwebtoken')

const generaJWT = (uid)=>{
    return new Promise((resolve, reject)=>{
        const payload = {uid}

        JWT.sign(payload,process.env.PRIVATEKEY,{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                reject(`no se puede generar el token`)
            }else{
                resolve(token)
            }
        } )
    })
}

module.exports = generaJWT;