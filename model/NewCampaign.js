const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const newCampaignSchema = new Schema(
   { 
//Step-1
    overview:{
        projectName:{
            type:String,
            min:6,
            max:20},
        description:{
            type:String,
            min:20,
            max:200
        }
    },
//Step-2
    productDetails:{
        category:{
            type:String
        },
        brand:{
            type:String
        },
        productDetails:{
            type:String
        },
        region:{
            type:String
        },
        image:{
            type:String
        },
        productName:{type:String},
        productURL:{type:String},
        productDescription:{type:String}
    },
//Step-3
    projectDetails:{},
   });

module.exports=mongoose.model('NewCampaign',newCampaignSchema);