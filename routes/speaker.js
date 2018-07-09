const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Speakers, validateSpeaker ,generatePassword , sendPasswordViaEmail } = require('../models/speaker');
const _ = require('lodash');

router.get('/', async (req, res) => {
    try{
        const speakers = await Speakers.find();
        res.send(speakers);
    }
   catch (error) {
    res.send(error.message);
   }
});

router.post('/', async (req, res) => {
    try {
        const { password , hashedPassword } = await generatePassword();
        const { error } = validateSpeaker(req.body);
        if(error) return res.status(404).send(error.details[0].message);

        req.body.password = hashedPassword;
        const speaker = new Speakers(_.pick(req.body,['firstName','lastName','email' , 'password', 'contact' , 'roleName' , 'speakerLabel' , 'speakerCount' , 'briefInfo' , 'profileImageURL' , 'eventId']));
        let name = req.body.firstName + ' ' + req.body.lastName;
        const result = await speaker.save();
        const emailResult =  await sendPasswordViaEmail(password, req.body.email, name);
        res.send(result);
    }
    catch (error) {
        console.log('error :', error.message);
        res.send(error.message);
    }
});

router.delete('/:id',async (req, res) => {
    try {
        const result = await Speakers.findByIdAndRemove(req.params.id);
        if (!result) return res.status(404).send('not found');
        res.send(result);
    }
    catch (error) {
        console.log('error :', error.message);
        res.send(error.message);
    }
});

module.exports = router;