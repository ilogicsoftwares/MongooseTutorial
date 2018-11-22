import mongoose from "mongoose";
import { Schema} from "mongoose";

//model
 var Modela={  
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
        fechaCreacio:String,
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
var Schemax={
    userSchema: new Schema(Modela.userSchema),
    messageSchema:new Schema(Modela.messageSchema),
    licenceSchema:new Schema(Modela.licenceSchema),
    licenceTypeSchema:new Schema(Modela.licenceTypeSchema)
    }
//index
Schemax.userSchema.index({userName:1,licence:1});
Schemax.messageSchema.index({user:1,titulo:1});
Schemax.licenceSchema.index({number:1});
var Modelo={};
Modelo.User=mongoose.model("User",Schemax.userSchema);
Modelo.Message=mongoose.model("Message",Schemax.messageSchema);
Modelo.Licence=mongoose.model("licence",Schemax.licenceSchema);
Modelo.licenceType=mongoose.model("licenceType",Schemax.licenceTypeSchema);



export default {Modelo,mongoose};
