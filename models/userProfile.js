const mongoose = require('mongoose');
const Joi = require('joi');

const UserProfiles = mongoose.model('UserProfiles', new mongoose.Schema({
     profileName :{
         type : String,
         rerquired : true
     }
}))

function validateProfile(userprofiles){
   const schema = {
       profileName : Joi.string().required()
   }
    return Joi.validate(userprofiles, schema);
}

exports.UserProfiles = UserProfiles;
exports.validateProfile = validateProfile;