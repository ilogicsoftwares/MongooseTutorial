import {Schema} from 'mongoose';


//model
 var Schemas={  
      messageSchema : {
        titulo:{
        type:String,
        required:true
        },
        descripcion:String,
        tipo:String,
        user:{
            type:Schema.Types.ObjectId,ref: 'User',
            required:true
        }
    },
     userSchema :{
        userName:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        fechaCreacion:String,
        licence:{
           type:Schema.Types.ObjectId,
           ref:'Licence'
        }
    },
    licenceSchema:{
         number:{
             type:String,
             required:true
         },
         licenceType:{
             type:Schema.Types.ObjectId,
             ref:"licenceType"
         },
         inicion:String,
         fin:String
    },
    licenceTypeSchema:{
        name:{
            type:String,
            required:true
        },
        cost:String,
        messageCount:Number
    }
} ;




export default  Schemas;
