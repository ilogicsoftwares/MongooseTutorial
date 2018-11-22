import express from 'express';
import {Modelo,mongoose} from './Model/Model';

let app=express();
var Modelx=Modelo;
var Message=Modelo.Message;
app.get("/",(req,res)=>{
    res.send('Hola Mongoose');
});

app.get("/messages",(req,res)=>{

    Message.find({}).then((messages)=>{
     res.send(messages);
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
     message.save((err)=>{
         resp.send(err ? err.errmsg:"Se ha Guardado los datos");
     });

});


mongoose.connect('mongodb://localhost:27017/QuiclyMessages')
.then(()=>console.log('Mongo Connected'))
.catch((err)=>console.log(err));

app.listen('3000',()=> console.log('express running in PORT 3000'));

