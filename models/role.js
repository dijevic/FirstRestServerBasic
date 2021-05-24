const { Schema,model } =require( 'mongoose');

const rolSchema = new Schema({
    rol:{
        type: String,
        required : [true,'rol es obligatorio y requerido'],
    },
   
    
})

module.exports = model('role',rolSchema)
