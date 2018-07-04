const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Attendee, validateAttendee } = require('../models/attendee');
const _ = require('lodash');

router.get('/', async (req, res) => {
    try{
        const attendees = await Attendee.find();
        res.send(attendees);
    }
   catch (error) {
    res.send(error.message);
   }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateAttendee(req.body);
        if(error) return res.status(404).send(error.details[0].message);

        const attendee = new Attendee(_.pick(req.body,['firstName','lastName','email','password' , 'contact' ,'profiles', 'roleName' , 'attendeeLabel' , 'attendeeCount' , 'briefInfo' , 'profileImageURL' , 'eventId']));
        const result = await attendee.save();
        res.send(result);
    }
    catch (error) {
        console.log('error :', error.message);
        res.send(error.message);
    }
});

router.delete('/:id',async (req, res) => {
    try {
        const result = await Attendee.findByIdAndRemove(req.params.id);
        if (!result) return res.status(404).send('not found');
        res.send(result);
    }
    catch (error) {
        console.log('error :', error.message);
        res.send(error.message);
    }
});

module.exports = router;