const { Schema,model } =require( 'mongoose');

const productoSchema = new Schema({
    nombre:{
        type: String,
        required : [true,'nombre de la categoria es obligatoria'],
        unique:true
    },
    estado :{
        type: Boolean,
        default: true

    },
    usuario :{
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required:true
    },
    precio :{
        type    : Number,
        default : 0,

    },
    categoria : {
        type: Schema.Types.ObjectId,
        ref : 'Categoria',
        required:true

    },
    descripcion : {
        type: String
    },
    disponibilidad : {
        type : Boolean,
        default : true
    },
    img : {
        type: String,

    }
   
    
})
productoSchema.methods.toJSON = function(){
    const {__v,estado, ...data} = this.toObject();

    return data
}

module.exports = model('Producto',productoSchema)
