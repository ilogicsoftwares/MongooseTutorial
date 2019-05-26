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
            required:true,
            index:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String
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
         token:String, 
         inicio:String,
         fin:String
    },
    licenceTypeSchema:{
        name:{
            type:String,
            required:true
        },
        cost:String,
        messageCount:Number
    },
    messageTipoSchema:{
        name:String,
        color:String
    }
} ;




export default  Schemas;
