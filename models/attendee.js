const mongoose = require('mongoose');
const Joi = require('joi');

const Attendee = mongoose.model('Attendee', new mongoose.Schema({
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
        type: String,
        required: true
    },
    contact : {
        type : Number,
        required : true
    },
    profiles : Array,
    roleName : String,
    attendeeLabel : String,
    attendeeCount : Number,
    briefInfo : String,
    profileImageURL : String,
    eventId : String
}));

function validateAttendee(attendee) {
    const schema = {
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        email : Joi.string().required(),
        password : Joi.string().required(),
        contact : Joi.number().required(),
        profiles : Joi.array(),
        roleName : Joi.string(),
        attendeeLabel : Joi.string(),
        attendeeCount : Joi.number(),
        briefInfo : Joi.string(),
        profileImageURL : Joi.string(),
        eventId : Joi.string()
    };
    return Joi.validate(attendee, schema);
}
exports.Attendee = Attendee;
exports.validateAttendee = validateAttendee;
