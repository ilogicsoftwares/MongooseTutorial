import express from 'express';
import mongoose from 'mongoose';
import Schemas from './Model/Model';
import ModelUtility from './Model/ModelBuilder';
import Verifier from 'google-play-billing-validator';
import jwt from 'jsonwebtoken';
import token from './utility/tokenFunc';
import cryt from 'cryptr';
import nodemailer from 'nodemailer';
const cry = new cryt("NicoleDylanKelly")
const Schema = mongoose.Schema;
const options = {
    email: "kopipaste@api-8743698024900724737-401710.iam.gserviceaccount.com",
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDqaAyrcXDT4b84\nl+mpa5UnsXXPemAzxorGZE4BwArdx+wjJ84ZMfx1ETKhs5ter+6Vpov0TQ2HXT8M\nVJdk194+U0d/XU+SzRxx705xFAOy9XH676DlJJ4/BBE98d6QKrWgAJp3jF6QXaTT\nzdgNxeNXPKtKCbO4MX2c843gi4OFsc+1YogNFx/9fzMwO9KN7+3pBZdKdW59Vd4H\nXU43VEbxmG/1OVREm4y2beDg0b9H38WbCphFeqnIbNvmZrTH/BW0fS+8Gp70W9w4\nK9S1HuHZdSFjTfM0S/aKCYdbJgcP4JHUmdkYBZ6CtWoJIwfKCS9bIimbz6YcvWy7\nmZmj259zAgMBAAECgf8vxz9QwCNUbuy9HzfUIHnTA2Zp3hv3gwc9pocPyLbC/Ofh\nel43GS0sCemPSbI3Ol3Dea/4BKtPjb2g1S2Lb+Y5QW2HPVdD+uczicl5HIBN5pjS\nDhkduIsTZiTtbegWCQpajN31EH0gugy/61APEtVAD6/3IhKFjARjOOzatVtwJdvL\nxd2NJkBH3tT1VSiHYkU/pA1+WaFCSbA6pSVQognlDJVuxgOdFYkcA1jf75IPTYrm\na5plmvYhNral5pGVS8cFzI3zNYdReTJT5mAqfEhqDfvP1ChylTno1jlnZLyX1j+0\nlTorvWik+aBBNF5kyPNqB2R4o80pWx+61w+KNEECgYEA+36lTVZoMsPwGjdfSITw\ni4PFlDPbCpVToKazpoa/jYnVmfdUuAsKQtLOYNm1M2zQxDDPRdhCO3Ojakw27FPb\nITQ5f9ThxZKxz6NiAPZAVCohGaqVa+cg1lMVZdSyQYhQS3fhvRLiDjfgm92yCkhg\nUMNax4k2cIKdJFE+/hZ1cgsCgYEA7psJeifRiYv1uD6VXTIDNYkrwg9jhde9L7OS\nre9qmO//tsgXkroU314EZdWomaxaSfkYUYQQa6WrohY28hY2dkHvvWGFVG74h0ks\nxrutbjHzkmkBRXdZEKqxX0ZMf1x32yANiig7nGyU1+yRWAH5smI09zohiUdHdWc1\n5jF3kTkCgYApjEus0iiWsm4ZNqqkJWpD8joS+NooDnFpagDl8v70WCAUtpqlaRWB\n4qe7slvQKhr3PoUPqeGPRtRpfDvaoSPjgWg6aSX/aPO9NOW8+PG5tdgQEHFtCRsQ\nrVssno3wa5+wSBbgEJ2N8cdGmMKQFlLrJMr7ifyXa8ygMlfwzC8M7wKBgQDjoAHt\niDkMh/nVV9b0PnbzRrX4/udJ0yOHcz9WMZW26xY/ECn07xJkePOnFqouWE8WTM1X\nTq6/kx/mlFy8nFY+gO6t82/XubncjgFqYba07nBYV1ZAJ/hOvxhRNOZbhiJNaAmi\nqHkd5DQmvWd21wOXmrq+s7U0mkxggyLXRI+1eQKBgQDqIFMlbdsv3xQBccqlYWix\nkqRw9riNME9SEBLYwjU/4ZdPkjgp++sfWdhWecvDZEXALv+Fyf+XYOlL2TxvShAY\nSfrjCvgzl7vV7M1b0sf9hhPFpluDNgCQEEMe9gLJnkaXETMzsbWWmgpgDR3tOfHE\n3bd/ojtwnn06rSfOJEzJmg==\n-----END PRIVATE KEY-----\n",
    project_id: "api-8743698024900724737-401710"
}
const verifier = new Verifier(options);


let app = express();
//Models 
var modelUtility = new ModelUtility();
var SchemaComponent = modelUtility.buildSchema(Schemas);

var Message = mongoose.model('Message', SchemaComponent.messageSchema);
var Licence = mongoose.model('Licence', SchemaComponent.licenceSchema);
var User = mongoose.model('User', SchemaComponent.userSchema);
//Default Values in DB
const LicenceStatuses= {Active:1,Expired:0,Refound:2};
//Default Values in DB

User.createIndexes();
var LicenceType = mongoose.model('LicenceType', SchemaComponent.licenceTypeSchema);

app.get("/", (req, res) => {
    res.send('KopyPaste Api');
});
app.post('/login', express.json(), (req, resp) => {
    var email = req.body.mail;
    var password = req.body.password;

    User.findOne({ userName: email }).populate('licence').then((user) => {

        if (cry.decrypt(user.password) == password) {

            const token = jwt.sign({user}, 'NicoleDylanKelly');
            if(user.licence){
                let objeto = user._id + "," + user.licence.number +"," + user.licence.token
                resp.send({ estatus: true, message: objeto,token:token });
                return;    
            }

            resp.send({ estatus: true, message: user._id,token:token });
			return;
        }

        resp.send({ estatus: false });

    });


});

app.get('/licence/:userid',token,express.json(),(req,res)=>{
    let id =req.params.userid;
    User.findOne({ _id: id }).populate('licence').then((user) => {
        
        if(user.licence){
            res.send([{ estatus: true, message:  user.licence.number }]);
            return;    
        }
        res.send([{ estatus: false}]);
    })
    
})
app.post('/CreateUser', express.json(), (req, resp) => {
    
    let encryptedPassword=cry.encrypt(req.body.password);
    User.create({
        userName: req.body.username,
        password: encryptedPassword,
        name: req.body.name,
        fechaCreacion: new Date()
    }).then((object) => {


        modelUtility.getPlantillas().map(x => {
            var message = new Message({
                titulo: x.titulo,
                descripcion: x.mensaje,
                tipo: "",
                user: object._id
            });
            message.save();
        });


        resp.send({ estatus: true, message: "Listo" });
    }
    ).catch((err) => {
        console.log(err);
        resp.send({
            estatus: false, message: err.errmsg

        });
    });

});
app.get("/messages/:userid",token, (req, res) => {
  
    User.findOne({_id:req.params.userid},(err,user)=>{
        if(user.licence){
            Message.find({ user: req.params.userid }).then((messages) => {
                res.send(messages);
            });
        }else{
            Message.find({ user: req.params.userid }).limit(9).then((messages) => {
                res.send(messages);
            });
        }
    });
});

/*app.get("/users", (req, res) => {

    User.find({}).then((users) => {
        res.send(users);
    });

});*/
app.get("/message/:titulo",token, (req, res) => {

    Message.find({ titulo: req.params.titulo }).then((message) => {
        res.send(message);
    });

});
app.post('/message',token, express.json(), (req, resp) => {
   
   
    var message = new Message({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo
    });
    message.save((err) => {
        resp.send(err ? err.message : "Se ha Guardado los datos");
    });

});
app.get('/deleteMessage/:id',token, (req, resp) => {

    Message.deleteOne({ _id: req.params.id }, function (err) {
        if (err) resp.send(handleError(err));
        // deleted at most one tank document
    });

});
app.post('/billing/',token, express.json(), (req, resp) => {
    let orderID = req.body.orderid;
    let orderToken = req.body.ordertoken;
    let orderSku=req.body.sku;
    let orderTime = req.body.ordertime;
    let inicio = new Date();
    let fin = (new Date()).setFullYear(inicio.getFullYear() + 1);
    let userid = req.body.userid;

    let receipt = {
        packageName: "com.floatingwidgetchathead_demo",
        productId: orderSku,
        purchaseToken: orderToken
    };
    let promiseData = verifier.verifyINAPP(receipt)

    promiseData.then(function (response) {
       console.log(response);
       Licence.findOne({token:orderToken},(err,lic)=>{
           if(lic){

           }else{
            let licence = new Licence();
            licence.number = orderID;
            licence.token = orderToken;
            licence.inicio = inicio;
            licence.fin = fin;
            licence.user = userid;
            licence.save((err, licence) => {
                User.findOne({_id: userid },(err,user)=>{
                    user.licence = licence._id;
                    user.save((err,user)=>{
                        if(err){
                            resp.send({estatus:"false"});        
                        }else{
                            resp.send({estatus:"true"});
                        }
                    });
                    
                });
            });
           }
       })
    })
        .catch(function (error) {
            // Purchase is not valid or API error
            // See possible error messages below
        })

});
app.post('/EditMessage/', express.json(), (req, resp) => {

    let id = req.body.id;
    let userid = req.body.userid;
    let titulo = req.body.titulo;
    let tipo = req.body.tipo;
    let descripcion = req.body.descripcion;

    if (id == "0") {
        User.findOne({_id:userid},(err,user)=>{
              let licence =user.licence;
              Message.find({user:userid},(err,user)=>{
                if(licence){

                }else if(user.length>=9){
                    resp.send({message : "You need to Buy for more Messages"});
                    return;
                }
                
                var message = new Message({
                    titulo: titulo,
                    descripcion: descripcion,
                    tipo: tipo,
                    user: userid
                });
                message.save((err) => {
                    resp.send({message : "Message Saved"});
                });
              });

        })
       

    } else {
        Message.findOne({_id:id}).then((message) => {
            if (titulo)
                message.titulo = titulo;
            if (descripcion)
                message.descripcion = descripcion;
            if (tipo)
                message.tipo = tipo;
            message.save((upadtedMessage) => {
                resp.send({message:"Message Updated"});
            })
        }).catch(err=>{
            resp.send({message:"Error"});
        });

    }


});

app.post("/passwordChange",express.json(),(req,res)=>{
    let code=req.body.code;
    let id=req.body.id;
  
    User.findOne({_id:id}).then(data=>{
        if(data.requirementKey && data.requirementKey==code && req.body.password){
            let encryptedPassword=cry.encrypt(req.body.password);
            data.password=encryptedPassword;
            data.save().then((data)=>{
                res.send({estatus:true,message:"Password Changed"});
            }).catch((err)=>{
                res.send({estatus:false,message:"Error Changing password"});
            });
        }else{
            res.send({estatus:false,message:"Code not match"});    
        }
        
       
    }).catch((err)=>{
        res.send({estatus:false,message:"Error Changing password"});
    });

})
app.post("/sendEmail",express.json(),(req,resp)=>{
    let recoverKey = Math.floor(100000 + Math.random() * 900000);
    console.log(recoverKey);
    let id=req.body.email;
    
    User.findOneAndUpdate({userName:id},{requirementKey:recoverKey}).exec().then((data)=>{
     if(!data){
         resp.send({estatus:false,message:"Email not found"});
         return;
     }
    let content = `Ingrese este codigo para cambiar su Clave: <strong>${recoverKey}</strong>`
    sendEmail(data.userName,"Recuperar/Cambiar Clave",content);
      resp.send({estatus:true, message:data._id});
    });
   
});


 function sendEmail(to,subject,content){
    
    nodemailer.createTestAccount((err, account) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.googlemail.com', // Gmail Host
            port: 465, // Port
            secure: true, // this is true as port is 465
            auth: {
                user: 'siliceinnovaciones@gmail.com', //Gmail username
                pass: 'A17211721' // Gmail password
            }
        });
     
        let mailOptions = {
            from: '"Silice Innovaciones" <siliceinnovaciones@gmail.com>',
            to: to, // Recepient email address. Multiple emails can send separated by commas
            subject: 'Recuperar/Cambio de Clave',
            html: content
        };
     
         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              return  console.log(error);
            }else{
                console.log('Message sent: %s', info.messageId);
            }
           
        });
    });
}






mongoose.connect('mongodb://admin:Nicole1721%23@ds243798.mlab.com:43798/heroku_xm3f0gkh',{useNewUrlParser:true})
    .then(() => console.log('Mongo Connected'))
    .catch((err) => console.log(err));

app.listen(process.env.PORT || 8080, () => console.log('server running'));

