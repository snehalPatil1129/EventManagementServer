const mongoose = require('mongoose');
const Joi = require('joi');

const Sessions = mongoose.model('Sessions', new mongoose.Schema({
    sessionName : {
        type : String,
        required : true
    },
    event: {
       type : String,
       required : true
    },
    speakers :{
        type : Array,
        //required : true
    },
    volunteers :{
        type : Array,
        //required : true
    },
    room : String,
    description : String,
    sessionType : String,
    sessionCapacity : Number,
    startTime : Date,
    endTime : Date,
    isBreak : Boolean,
    isRegistrationRequired : Boolean
}));

function validateSession(session) {
    const schema = {
        sessionName : Joi.string().required(),
        event : Joi.required(),
        speakers  : Joi.array(),
        volunteers  : Joi.array(),
        room : Joi.string(),
        description : Joi.string(),
        sessionType : Joi.string(),
        sessionCapacity : Joi.number(),
        startTime : Joi.date(),
        endTime : Joi.date(),
        isBreak : Joi.boolean(),
        isRegistrationRequired : Joi.boolean()
    };
    return Joi.validate(session, schema);
}
exports.Sessions = Sessions;
exports.validateSession = validateSession;
