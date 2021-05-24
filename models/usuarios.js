const { Schema,model } =require( 'mongoose');

const userSchema = new Schema({
    nombre:{
        type: 'string',
        required : [true,'nombre es obligatorio'],
        unique: false
       
    },
    password:{
        type: 'string',
        required : [true,'password es obligatorio']

    },
    correo :{
        type: 'string',
        required : [true,'email es obligatorio'],
        unique : true

    },
    img:{
        type: 'string',
    },
    rol:{
        type: 'string',
        required : true
      
    },
    estado:{
        type:Boolean,
        default:true
    },
    google :{
        type:Boolean,
        default:false
    }
})


// con este metodo elimino de la vista del modelo el password
userSchema.methods.toJSON = function(){
    const {__v,password, ...usuario} = this.toObject();
    return usuario
}


module.exports = model('usuario',userSchema)