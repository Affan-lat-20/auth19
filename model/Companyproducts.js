const mongoose = require('mongoose');
// const Branduser = require('../model/Branduser');
var Schema = mongoose.Schema;


 
const companyproductSchema = new Schema(
    {

        Companyid:{  type: mongoose.Schema.Types.ObjectId,
            ref: 'User' 
                },
        category:{

            type: String,
            required: true,
            min:6,
            max:255,
            subCategory:{type: String}
},
 
        brand:{
            type: String,
            required:true,
            min:5,
            max:255
                },
       
        region:{
            type: String,
            required:true,
            min:5,
            max:255
            
    },
        productName:{
        type: String,
        required:true,
        min:4,
        max:255
},
 
        productURL:{
            type: String,
            required:true,
            min:4,
            max:255   
 
            },
        productDescription:{
                type: String,
                required:true,
                min:4,
                max:500
    
            }
            
    });
 
module.exports= mongoose.model('Companyproducts',companyproductSchema);