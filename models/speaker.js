const mongoose = require('mongoose');
const Joi = require('joi');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const generator = require('generate-password');

const Speakers = mongoose.model('Speakers', new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    password : {
        type: String
    },
    contact : {
        type : Number,
        required : true
    },
    roleName : String,
    speakerLabel : String,
    speakerCount : Number,
    briefInfo : String,
    profileImageURL : String,
    eventId : String
}));

function validateSpeaker(speaker) {
    const schema = {
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        email : Joi.string().required(),
        //password : Joi.string().required(),
        contact : Joi.number().required(),
        roleName : Joi.string(),
        speakerLabel : Joi.string(),
        speakerCount : Joi.number(),
        briefInfo : Joi.string(),
        profileImageURL : Joi.string(),
        eventId : Joi.string()
    };
    return Joi.validate(speaker, schema);
}

function validateAuthUser(user) {
    const schema = {
        email: Joi.string().required().email(),
        password : Joi.string().required().min(6)
    };
    return Joi.validate(user, schema);
}

async function generatePassword() {
    let password = await generator.generate({
        length: 6,
        numbers: true
    });
    const salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);
    return { password : password ,hashedPassword : hashedPassword };
}

async function sendPasswordViaEmail(password , email , name) {
    try {
     var transporter = nodemailer.createTransport({
         service: 'gmail',
         auth: {
           user: 'snehal.eternus@gmail.com',
           pass: 'espl@123'
         }
       });
       var mailOptions = {
         from: 'snehal.eternus@gmail.com',
         to: email,
         subject: 'Password for User ' + name +' for Event management Application',
         html :'<p>Hello ' + name + ',</p><p>Greetings from Event management. </p> <p>Your Password for account registered through ' + email + ' is as ' + password + ' .Please Login for better experience .</p>'
     };
       const emailResponse = transporter.sendMail(mailOptions);
    }
    catch (error) {
     console.log(error.message);
    }
 };
 
exports.Speakers = Speakers;
exports.validateSpeaker = validateSpeaker;
exports.validateAuthUser = validateAuthUser;
exports.generatePassword = generatePassword;
exports.sendPasswordViaEmail = sendPasswordViaEmail;
