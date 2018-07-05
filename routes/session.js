const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { Sessions, validateSession } = require('../models/session')

router.get('/', async (req, res) => {
    const sessions = await Sessions.find().sort('eventName');
    res.send(sessions);
});

router.post('/', async (req, res) => {
    const { error } = validateSession(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var session = new Sessions(_.pick(req.body, ['sessionName', 'eventId', 'speakers', 'volunteers', 'description', 'sessionType',
        'sessionCapacity', 'startTime', 'endTime', 'isBreak', 'isRegistrationRequired']))

    session = await session.save();
    res.send(session);
})

router.put('/:id', async (req, res) => {

    const { error } = validateSession(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    session = await Sessions.findByIdAndUpdate(req.params.id,
        _.pick(req.body, ['sessionName', 'eventId', 'speakers', 'volunteers', 'description', 'sessionType',
            'sessionCapacity', 'startTime', 'endTime', 'isBreak', 'isRegistrationRequired'])
        ,{ new: true })

    if (!session) return res.status(404).send('The Session with the given ID was not found.');

    res.send(session)
})

router.get('/:id', async (req, res) => {
    const session = await Sessions.findById(req.params.id);
    if (!session) return res.status(404).send('The Session with the given ID was not found.');
    res.send(session);
})

router.delete('/:id', async (req, res) => {
    const session = await Sessions.findByIdAndRemove(req.params.id);
    if (!session) return res.status(404).send('The Session with the given ID was not found.');

    res.send(session);
})
module.exports = router;