import express from 'express';
import mongoose from 'mongoose';
import Schemas from './Model/Model';
import ModelUtility from './Model/ModelBuilder';
import Verifier from 'google-play-billing-validator';
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
    res.send('Hola Mongoose');
});

app.get("/messages/:userid", (req, res) => {
  
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
    })
   

});

app.get("/users", (req, res) => {

    User.find({}).then((users) => {
        res.send(users);
    });

});

app.get("/message/:titulo", (req, res) => {

    Message.find({ titulo: req.params.titulo }).then((message) => {
        res.send(message);
    });

});
app.post('/login', express.json(), (req, resp) => {
    var email = req.body.mail;
    var password = req.body.password;

    User.findOne({ userName: email }).populate('licence').then((user) => {

        if (user.password == password) {
            if(user.licence){
                let objeto = user._id + "," + user.licence.number +"," + user.licence.token
                resp.send({ estatus: true, message: objeto });
                return;    
            }

            resp.send({ estatus: true, message: user._id });
			return;
        }

        resp.send({ estatus: false });

    });


});


app.post('/message', express.json(), (req, resp) => {
   
   
    var message = new Message({
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo
    });
    message.save((err) => {
        resp.send(err ? err.message : "Se ha Guardado los datos");
    });

});
app.post('/CreateUser', express.json(), (req, resp) => {
    User.create({
        userName: req.body.username,
        password: req.body.password,
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
app.get('/deleteMessage/:id', (req, resp) => {

    Message.deleteOne({ _id: req.params.id }, function (err) {
        if (err) resp.send(handleError(err));
        // deleted at most one tank document
    });

});
app.post('/billing/', express.json(), (req, resp) => {
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
        Message.findById(id, (err, message) => {
            if (titulo)
                message.titulo = titulo;
            if (descripcion)
                message.descripcion = descripcion;
            if (tipo)
                message.tipo = tipo;
            message.save((err, upadtedMessage) => {
                resp.send(upadtedMessage ? upadtedMessage : err);
            })
        });

    }


});




mongoose.connect('mongodb://localhost:27017/QuiclyMessages')
    .then(() => console.log('Mongo Connected'))
    .catch((err) => console.log(err));

app.listen('3000', () => console.log('express running in PORT 3000'));

