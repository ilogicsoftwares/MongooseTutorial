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

    

}

export default ModelUtility;