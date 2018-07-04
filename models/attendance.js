const mongoose = require('mongoose');
const Joi = require('joi');

const Attendance = mongoose.model('Attendance', new mongoose.Schema({
    eventId : {
        type: String,
        required: true
    },
    sessionId : {
        type: String,
        required: true
    },
    userId : {
        type: String,
        required: true
    },
    scannedBy : {
        type: String,
        required: true
    }
}));

function validateAttendance(attendance) {
    const schema = {
        eventId : Joi.string().required(),
        sessionId : Joi.string().required(),
        userId : Joi.string().required(),
        scannedBy : Joi.string().required(),
    };
    return Joi.validate(attendance, schema);
}
exports.Attendance = Attendance;
exports.validateAttendance = validateAttendance;
