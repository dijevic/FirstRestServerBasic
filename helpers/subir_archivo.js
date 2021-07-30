const path = require('path')
const {v4 : uuidv4} = require('uuid')

const subirArchivo = ({archivo}, extensionesValidas = ['jpg','png','jpeg','svg','gif'] , carpeta ='')=>{
     return new Promise((resolve, reject)=>{
         

        try{
        const cutName = archivo.name.split('.')
        const extension = cutName[cutName.length - 1]
    
        if(!extensionesValidas.includes(extension)){
          reject(`error con la extension del archivo que intento cargar, extensiones validad ${extensionesValidas}`)
        }
    
        
        const nombreTemp = `${uuidv4()}.${extension}`
  //       con este path uno mi path local al path donde lo quiero llevar
        const uploadPath = path.join(  __dirname , '../uploads/' , carpeta , nombreTemp)
      
        // Use the mv() method to place the file somewhere on your server
        archivo.mv(uploadPath, function(err) {
          if (err){
              reject(err)
          }
      
          resolve(nombreTemp)
    });
        }catch(e){
            console.log(e)
        }
     })
    
}

module.exports = subirArchivo