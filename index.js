import express from 'express';
import mongoose from 'mongoose';
import Schemas from './Model/Model';
import ModelUtility from './Model/ModelBuilder'
const Schema=mongoose.Schema;

let app=express();
//Models 
var modelUtility=new ModelUtility();
var SchemaComponent = modelUtility.buildSchema(Schemas);

var Message=mongoose.model('Message',SchemaComponent.messageSchema);
var Licence=mongoose.model('Licence',SchemaComponent.licenceSchema);
var User = mongoose.model('User',SchemaComponent.userSchema);
User.createIndexes();
var LicenceType=mongoose.model('LicenceType',SchemaComponent.licenceTypeSchema);
app.get("/",(req,res)=>{
    res.send('Hola Mongoose');
});

app.get("/messages/:userid",(req,res)=>{
    
    Message.find({user:req.params.userid}).then((messages)=>{
        res.send(messages);
    });
    
});

app.get("/users",(req,res)=>{
    
    User.find({}).then((users)=>{
        res.send(users);
    });
    
});

app.get("/message/:titulo",(req,res)=>{

    Message.find({titulo:req.params.titulo}).then((message)=>{
     res.send(message);
    });
    
});
app.post('/login',express.json(),(req,resp)=>{
    var email=req.body.mail;
    var password=req.body.password;
    
    User.findOne({userName:email}).then((user)=>{
       
        if(user.password==password)
        {
            resp.send({estatus:true,message:user._id});
        } 
        
            resp.send({estatus:false});
        
    });


});


app.post('/message',express.json(),(req,resp)=>{
     var message=new Message({
        titulo:req.body.titulo,
        descripcion:req.body.descripcion,
        tipo:req.body.tipo
     });
     message.   save((err)=>{
         resp.send(err ? err.message:"Se ha Guardado los datos");
     });

});
app.post('/CreateUser',express.json(),(req,resp)=>{
  User.create({
    userName:req.body.username,
    password:req.body.password,       
    name:req.body.name,
    fechaCreacion:new Date()
  }).then((object)=>{
     resp.send({estatus:true,message:"Listo"});
  }
  ).catch((err)=>{
    console.log(err);  
    resp.send({
      estatus:false,message:err.errmsg
    
    });
  });

});
app.get('/deleteMessage/:id',(req,resp)=>{

    Message.deleteOne({ _id: req.params.id }, function (err) {
        if (err) resp.send(handleError(err));
        // deleted at most one tank document
      });
    
});
app.post('/EditMessage/',express.json(),(req,resp)=>{
    
    var id=req.body.id;
    var userid=req.body.userid;
    var titulo=req.body.titulo;
    var descripcion=req.body.descripcion;
	
      if (id=="0"){
		var message=new Message({
        titulo:titulo,
        descripcion:descripcion,
        tipo:"",
        user:userid
     });
     message.   save((err)=>{
         resp.send(err ? err.message:"Se ha Guardado los datos");
     });
		  
	  }else{
	  Message.findById(id,(err,message)=>{
      if(titulo)
      message.titulo=titulo;
      if(descripcion)
      message.descripcion=descripcion;
      message.save((err,upadtedMessage)=>{
          resp.send(upadtedMessage ? upadtedMessage:err);
      })
       });	  
		  
	  }
    
  
  });




mongoose.connect('mongodb://localhost:27017/QuiclyMessages')
.then(()=>console.log('Mongo Connected'))
.catch((err)=>console.log(err));

app.listen('3000',()=> console.log('express running in PORT 3000'));

