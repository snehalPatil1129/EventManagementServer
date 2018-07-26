const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { Sponsors, validateSponsor } = require('../models/sponsor');


router.get('/', async (req, res) => {
    try {
        const sponsors = await Sponsors.find().populate('event');;
        res.send(sponsors);
    } catch (error) {
        res.send(error.message);
    }

});

router.post('/', async (req, res) => {
    try {
        const { error } = validateSponsor(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        var sponsor = new Sponsors(_.pick(req.body, ['name', 'event' ,'description', 'websiteURL', 'imageURL', 'category']))
        sponsor = await sponsor.save();
        res.send(sponsor);
    } catch (error) {
        res.send(error.message);
    }

})

router.put('/:id', async (req, res) => {
    try {
        const { error } = validateSponsor(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        sponsor = await Sponsors.findByIdAndUpdate(req.params.id,
            _.pick(req.body, ['name', 'event' ,'description', 'websiteURL', 'imageURL', 'category'])
            , { new: true })
        if (!sponsor) return res.status(404).send('The Sponsor with the given ID was not found.');

        res.send(sponsor)
    } catch (error) {
        res.send(error.message);
    }

})

router.get('/:id', async (req, res) => {
    try {
        const sponsor = await Sponsors.findById(req.params.id);
        if (!sponsor) return res.status(404).send('The Sponsor with the given ID was not found.');
        res.send(sponsor);
    } catch (error) {
        res.send(error.message);
    }

})

router.get('/event/:id', async (req, res) => {
    try {
        const sponsor = await Sponsors.find().where('event').equals(req.params.id).populate('event');
        if (!sponsor) return res.status(404).send('The Sponsors for given event ID was not found.');
        res.send(sponsor);
    }
    catch (error) {
        res.send(error.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const sponsor = await Sponsors.findByIdAndRemove(req.params.id);
        if (!sponsor) return res.status(404).send('The Sponsor with the given ID was not found.');
        res.send(sponsor);
    } catch (error) {
        res.send(error.message);
    }

})
module.exports = router;