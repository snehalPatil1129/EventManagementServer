const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { AttendeeCounts, validateCount } = require('../models/attendeeCount');

router.get('/', async (req, res) => {
    try {
        const counts = await AttendeeCounts.find();
        res.send(counts);
    }
    catch (error) {
        res.send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validateCount(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        var count = new AttendeeCounts(_.pick(req.body, ['attendeeCount', 'speakerCount', 'totalCount', 'eventId']))
        count = await count.save();
        res.send(count);
    }
    catch (error) {
        res.send(error.message);
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { error } = validateCount(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        count = await AttendeeCounts.findByIdAndUpdate(req.params.id,
            _.pick(req.body, ['attendeeCount', 'speakerCount', 'totalCount','eventId'])
            , { new: true })
        if (!count) return res.status(404).send('The Count with the given ID was not found.');
        res.send(count)
    }
    catch (error) {
        res.send(error.message);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const count = await AttendeeCounts.findById(req.params.id);
        if (!count) return res.status(404).send('The Count with the given ID was not found.');
        res.send(count);
    }
    catch (error) {
        res.send(error.message);
    }
})

router.get('/event/:id', async (req, res) => {
    try {
        const count = await AttendeeCounts.find().where('eventId').equals(req.params.id);
        if (!count) return res.status(404).send('The attendeeCount for given event ID was not found.');
        res.send(count);
    }
    catch (error) {
        res.send(error.message);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await AttendeeCounts.findByIdAndRemove(req.params.id);
        if (!count) return res.status(404).send('The Count with the given ID was not found.');
        res.send(count);
    }
    catch (error) {
        res.send(error.message);
    }
})

module.exports = router;