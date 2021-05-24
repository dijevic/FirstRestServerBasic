const mongoose = require('mongoose') /* conecto a la base de adotos */
const dbConection = async()=>{

    try{
        await mongoose.connect(process.env.MONGODB_CNN,
            {
             useNewUrlParser: true, 
             useUnifiedTopology: true,
             useCreateIndex:true,
             useFindAndModify:true})
             console.log('Conectado a la DB')
        

             const db = mongoose.connection;
             db.on('error', console.error.bind(console, 'connection error:'));
             db.once('open', function() {
               console.log('corriendo la base de datos')
             });

    }catch(err){
        console.error(err)
        throw new Error(`error en la base de datos`)
    }

}

module.exports = {
    dbConection
}