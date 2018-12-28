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
var LicenceType=mongoose.model('LicenceType',SchemaComponent.licenceTypeSchema);
app.get("/",(req,res)=>{
    res.send('Hola Mongoose');
});

app.get("/messages",(req,res)=>{

    Message.find({}).then((messages)=>{
     res.send(messages);
    });
    
});
app.get("/message/:titulo/:descripcion/:tipo",(req,resp)=>{

    var message=new Message({
       titulo:req.params.titulo,
       descripcion:req.params.descripcion,
       tipo:req.params.tipo
    });
    message.   save((err)=>{
        resp.send(err ? err.message:"Se ha Guardado los datos");
    });
   
});
app.get("/message/:titulo",(req,res)=>{

    Message.find({titulo:req.params.titulo}).then((message)=>{
     res.send(message);
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
    userName:req.body.userName,
    password:req.body.password,
    fechaCreacion:new Date()
  }).then((object)=>{
     resp.send(object);
  }
  ).catch((err)=>resp.send(err.errmsg));

});
app.get('/EditMessage/:id/:titulo/:descripcion',express.json(),(req,resp)=>{
    
    let id=req.params.id;
    let titulo=req.params.titulo;
    let descripcion=req.params.descripcion;

    Message.findById(id,(err,message)=>{
      if(titulo)
      message.titulo=titulo;
      if(descripcion)
      message.descripcion=descripcion;
      message.save((err,upadtedMessage)=>{
          resp.send(upadtedMessage ? upadtedMessage:err);
      })
    });
  
  });




mongoose.connect('mongodb://localhost:27017/QuiclyMessages')
.then(()=>console.log('Mongo Connected'))
.catch((err)=>console.log(err));

app.listen('3000',()=> console.log('express running in PORT 3000'));

