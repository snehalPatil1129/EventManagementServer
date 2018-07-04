const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const  { User } = require('../models/user');
const Joi = require('joi');


//authenticate user to portal
router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(404).send(error.details[0].message);

        let user = await User.findOne({email : req.body.email});
        if(!user) return res.status(404).send("Invalid Email/Password...");
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);  //return a boolean
        if(!validPassword) return res.status(404).send("Invalid Email/Password...");
        
        const token = user.generateAuthToken(); 
        res.send(token);
    }
    catch (error) {
        console.log('error', error)
    }
})

function validate(req) {
    const schema = {
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    };
    return Joi.validate(req, schema);
}
module.exports = router;