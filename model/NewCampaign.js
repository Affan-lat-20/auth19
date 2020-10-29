const mongoose = require('mongoose');
const User = require('../model/User');
var Schema = mongoose.Schema;

const newCampaignSchema = new Schema(
   { 
    Companyid:{  type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
            },

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
    prodDetails:{
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
    projectDetails:{
        medium:[],
        
        budget: {
            currency: { type: String },
            range: {
                min: { 
                    type: Number, min: 0,
                    validate: {
                        validator: function(val){
                            const currMax = this.target.budget.range.max;
                            return (currMax !== undefined ? val <= currMax : true);
                        },
                        message: "The MIN range with value {VALUE} must be <= than the max range!"
                    }
                },
                max: { 
                    type: Number, min: 0,
                    validate: {
                        validator: function(val) {
                            const currMin = this.target.budget.range.min;
                            return (currMin !== undefined ? val >= currMin : true);
                        },
                        message: "The MAX range with value {VALUE} must be >= than the min range!"
                    }
                }
            }
          },
          
          
          age: {
            
            range: {
                min: { 
                    type: Number, min: 0,
                    validate: {
                        validator: function(val){
                            const currMax = this.target.age.range.max;
                            return (currMax !== undefined ? val <= currMax : true);
                        },
                        message: "The MIN range with value {VALUE} must be <= than the max range!"
                    }
                },
                max: { 
                    type: Number, min: 0,
                    validate: {
                        validator: function(val) {
                            const currMin = this.target.age.range.min;
                            return (currMin !== undefined ? val >= currMin : true);
                        },
                        message: "The MAX range with value {VALUE} must be >= than the min range!"
                    }
                }
            }
          },
          startDate: {
            type: Date,
            required: true
          },
          endDate: {
            type: Date,
            required: true,
            validate: [dateValidator, 'Start Date must be less than End Date']
          },
          tagline:{type:String},

          objectives:[]


    }
   });

   // function that validate the startDate and endDate
function dateValidator(value) {
    // `this` is the mongoose document
    return this.startDate <= value;
  }

module.exports=mongoose.model('NewCampaign',newCampaignSchema);