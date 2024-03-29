const mongoose = require('mongoose');
var Schema = mongoose.Schema;



const Roles = new Schema(
    {
        userRole:{
            type: String,
            min:4,
            max:20

            },
        module:{
                type: String,                
                min:2,
                max:25  
    
                },
        operation:{
                type: String, 
                enum:["C","R","U","D","A"],             
             

            },
        
        date:{
            type: Date,
            default: Date.now
             
        }
    });







    
    module.exports= mongoose.model('Roles',Roles);
   