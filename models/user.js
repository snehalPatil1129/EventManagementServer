const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique :  true
    }
    // password: {
    //     type : String,
    //     minlength: 6,
    //     required : true
    // },
    // isAdmin :{
    //     type : Boolean,
    //     required : true
    // } 
});

// userSchema.methods.generateAuthToken = function () {
//     const token =  jwt.sign({_id : this._id , isAdmin : this.isAdmin}, config.get('jwtPrivateKey'));
//     return token;
// };

const User = mongoose.model('User', userSchema );

function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(5),
        email: Joi.string().required().email(),
        //password: Joi.string().required().min(6),
        //isAdmin : Joi.boolean().required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validateUser = validateUser;