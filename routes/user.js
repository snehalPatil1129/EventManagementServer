const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { User , validateUser , generatePassword } = require('../models/user');
const generator = require('generate-password');
const bcrypt = require('bcrypt');

router.get('/' , async (req ,res) => {
    try {
        const users = await User.find();
        res.send(users);
    }
    catch (error) {
        console.log(error.message);
    }
})


router.post('/', async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(404).send(error.details[0].message);
        
        let user = await User.findOne({email : req.body.email});
        if(user) return res.status(404).send("user already registered...");
        
        //steps remaining 
        //1.x-auth-token

        const { password , hashedPassword } = await generatePassword();
        
        const newUser = new User({
            name: req.body.name,
            email : req.body.email,
            password : hashedPassword
        });
        const emailResult = newUser.sendPasswordViaEmail(password, req.body.email, req.body.name)
        const result = await newUser.save();
        res.send(result);
    }
    catch (error) {
        console.log('error :', error.message);
        res.send(error.message);
    }
});

module.exports = router;
