const mongoose = require('mongoose');
const Joi = require('joi');
var nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const generator = require('generate-password');

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
    },
    password: {
        type : String,
        minlength: 6,
        required : true
    }
});

userSchema.methods.sendPasswordViaEmail = async function (password , email , name) {
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

const User = mongoose.model('User', userSchema );

function validateUser(user) {
    const schema = {
        name: Joi.string().required().min(5),
        email: Joi.string().required().email(),
    };
    return Joi.validate(user, schema);
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

exports.User = User;
exports.validateUser = validateUser;
exports.validateAuthUser = validateAuthUser;
exports.generatePassword = generatePassword;
