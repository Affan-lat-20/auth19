const { string } = require('@hapi/joi');
const mongoose = require('mongoose');
const User = require('../model/User');
var Schema = mongoose.Schema;

const roleSchema = new Schema({
    roleid :mongoose.Schema.Types.ObjectId,
    roleType:{
        type:String,
        enum:["Admin","CampaignManager"]
       
    }
});
module.exports= mongoose.model('Role',roleSchema);
