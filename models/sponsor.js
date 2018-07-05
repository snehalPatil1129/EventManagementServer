const mongoose = require('mongoose');
const Joi = require('joi');

const Sponsors = mongoose.model('Sponsors', new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    websiteURL: String,
    imageURL: String,
    category:{
        type: String,
        required: true
    }
}));

function validateSponsor(sponsor) {
    const schema = {
        name: Joi.string().required(),
        description: Joi.string(),
        websiteURL: Joi.string(),
        imageURL: Joi.string(),
        category: Joi.string(),
    };
    return Joi.validate(sponsor, schema);
}
exports.Sponsors = Sponsors;
exports.validateSponsor = validateSponsor;
