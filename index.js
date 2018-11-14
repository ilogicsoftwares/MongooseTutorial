import mongoose from 'mongoose';
import express from 'express';
import {messageSchema} from './Model/Model'

let app=express();
let Schema=mongoose.Schema;


let message_schema=new Schema(messageSchema);

var Message=mongoose.model("Message",message_schema);
app.get("/",(req,res)=>{
    res.send('Hola Mongoose');
});
app.post('/message',express.json(),(req,resp)=>{
     var message=new Message({
        titulo:req.body.titulo,
        descripcion:req.body.descripcion,
        tipo:req.body.tipo
     });
     message.save(()=>{
         resp.send('Usuario Guardado');
     });

});


mongoose.connect('mongodb://localhost:27017/QuiclyMessages')
.then(()=>console.log('Mongo Connected'))
.catch(()=>console.log('Mongo Error'));

app.listen('3000',()=> console.log('express running in PORT 3000'));

