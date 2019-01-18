import {Schema} from 'mongoose';


class ModelUtility {

    constructor(SchemaObject){
      
      this.Models={};
    }
    
    buildSchema (SchemaObject){

        var SchemaComponent={};

        Object.keys(SchemaObject).forEach(element => {
        SchemaComponent[element]=new Schema(SchemaObject[element]);
        });
        
        return SchemaComponent;
    }

    getPlantillas (){
        
    var plantillas=[
    {
        "titulo":"DIRECCION",
        "mensaje":`Buenas la dirección de nuestra oficina es:

        &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
        Referencia de como llegar: @@@@@@@@@@@@@@@@@
        
        Horario de atencion:
        
        De lunes a viernes: 10am - 7pm
        Sabados: 10am - 3pm
        
        Saludos Cordiales, Estamos a sus Ordenes
        
        Web: www.***.com
        Rpc: - - - - - - - 
        Entel: - - - - - - 
        Fijo: - - - - - - -`
    },
    {
        "titulo":"CUENTA BANCARIA",
        "mensaje":`Nuestro Numero de Cuenta (Nombre del Banco) es:
        #################
        
        A nombre de & & & & & & & &`
    },{
        "titulo":"CATALOGO",
        "mensaje":`Si desea haga click ✔en este Enlace donde podrá apreciar el catálogo 🗒de todos los productos que tenemos en stock con precios al por mayor y al por menor:

        (Adjuntar Link de tu catalogo Virtual)`
    },{
        "titulo":"DELIVERY Y ENVÍOS",
        "mensaje":`Buenas, por cierto también realizamos envíos a domicilio por un pequeño costo adicional y envios a Nivel Nacional por distintas agencias de transportes dependiendo la ciudad donde resida

        Saludos Cordiales, Estamos a sus Ordenes`
    },{
        "titulo":"DEPOSITOS DEL EXTERIOR",
        "mensaje":`Depositar vía Wester Unión o Money Gram, y los datos son:

        -Nombres: '' '' '' '' '' '' '' '' '' '' '' '' '' "" "" "" "" "" 
        -DNI: 00000000
        -Celular: +51 000000000
        -Direccion: @@@@@@@@@@@@
        -Ciudad: & & & & & & &`
    },{
        "titulo":"CORREO ENVIADO",
        "mensaje":`Listo el correo fue enviado :D , si no estuviese en su bandeja de entrada , 
        busquelo por favor en su bandeja de correo no deseado, estaremos a la
         espera de su pronta respuesta, gracias Saludos Cordiales :D`
    },{
        "titulo":"COTIZACIÓN RÁPIDA",
        "mensaje":`Buenas cómo está, los precios de los productos solicitados son los siguientes:

        -Producto 1= precio 
        
        -Producto 2 = precio
        
        -Producto 3 = precio`
    },{
        "titulo":"ENVIOS A OTRAS CIUDADES",
        "mensaje":`Buenas como esta, le comento que realizamos envios a Nivel Nacional Previo deposito por distintas agencias de transportes (eso dependera de la ciudad a enviar).

        Procedimiento:
        a) Diganos que producto y que cantidad desearia
        
        b) Le daremos el monto total a depositar y el numero de cuenta
        
        c) Una ves que deposite nos envia la foto del deposito o transferencia a nuestro Correo o via WhatsApp
        
        d) Apenas lo confirmemos se procedera a embalar su pedido y Organizar el envio`
    },{
        "titulo":"LO CONTACTAREMOS",
        "mensaje":`Buenas, en estos momentos no nos encontramos disponibles, en breves minutos le devolveremos la llamada.
        Si gusta tambien podria dejarnos un mensaje explicandonos lo que requiere.
        Gracias por su comprensión!`
    }

    ] ;
      return plantillas;
    }
    
    getListofColors (){
        var colors = [
            {
                name:'Primary',
                color:'#1976D2'
            },
            {
                name:'Success',
                color:'#4CAF50'
            },
            {
                name:'Info',
                color:'#E91E63'
            },
            {
                name:'Warning',
                color:'#7B1FA2'
            },
            {
                name:'Danger',
                color:'#D32F2F'
            },


        ]
    }
    

}

export default ModelUtility;