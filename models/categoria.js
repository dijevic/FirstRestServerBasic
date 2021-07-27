const { Schema,model } =require( 'mongoose');

const CategoriaSchema = new Schema({
    nombre:{
        type: String,
        required : [true,'nombre de la categoria es obligatoria'],
        unique : true,
    },
    estado :{
        type: Boolean,
        default: true

    },
    usuario :{
        type: Schema.Types.ObjectId,
        ref: 'usuario',
        required:true
    }
   
    
})
CategoriaSchema.methods.toJSON = function(){
    const {__v,estado, ...data} = this.toObject();

    return data
}

module.exports = model('Categoria',CategoriaSchema)
