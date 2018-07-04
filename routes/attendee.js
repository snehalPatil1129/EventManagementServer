const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//const auth = require('../middleware/auth');
//const admin = require('../middleware/admin');
//const asyncMiddleware = require('../middleware/async');
///const { Attendance, validateAttendance } = require('../models/attendance');

const Attendee = mongoose.model('Attendee', new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    contact: Number
}));


router.get('/', async (req, res) => {
    const attendaceTable = await Attendee.find();
    res.send(attendaceTable);
});

router.post('/', async (req, res) => {
    try {
        const newAttendance = new Attendee({
            name: req.body.name,
            contact: req.body.contact,
        });
        const newAtt = await newAttendance.save();
        res.send(newAtt);
    }
    catch (error) {
        console.log('error :', error.message);
        res.send(error.message);
    }
});

router.delete('/:id',async (req, res, next) => {
    const result = await Attendance.findByIdAndRemove(req.params.id);
    if (!result) return res.status(404).send('not found');
    res.send(result);
});

module.exports = router;