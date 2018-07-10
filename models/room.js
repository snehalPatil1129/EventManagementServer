const mongoose = require('mongoose');
const Joi = require('joi');


const Rooms = mongoose.model('Rooms', new mongoose.Schema({
     event : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Events'
    },
    roomName :{
        type : String,
        required: true
    },
    capacity : {
        type : Number,
        required: true
    },
     bufferCapacity : Number,
     availableServices: Array
}
))
      
function validateRoom(room){
    const schema = {
        event : Joi.required(),
        roomName : Joi.string().required(),
        capacity : Joi.number().required(),
        bufferCapacity :Joi.number(),
        availableServices :Joi.array()
    }
    return Joi.validate(room,schema);
}

exports.Rooms = Rooms;
exports.validateRoom = validateRoom; 