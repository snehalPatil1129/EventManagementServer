const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { ProfileList} = require('../models/profileList');
const _ = require('lodash');

router.get('/', async (req, res) => {
    try {
        const profileList = await ProfileList.find();
        res.send(profileList);
    }
    catch (error) {
        res.send(error.message);
    }
});

router.post('/', async (req, res) => {
    try {
        var profileList = new ProfileList(_.pick(req.body, ['profile']))
        profileList = await profileList.save();
        res.send(profileList);
    }
    catch (error) {
        res.send(error.message);
    }
})

module.exports = router;