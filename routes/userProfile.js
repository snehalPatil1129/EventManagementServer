const mongoose = require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const {UserProfiles, validateProfile} = require('../models/userProfile')


router.get('/', async(req, res)=>{
  const userProfiles = await UserProfiles.find();
  res.send(userProfiles);
})

router.post('/', async (req, res) => {
    const { error } = validateProfile(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var userProfile = new UserProfiles({
        profileName : req.body.profileName
    })

    userProfile = await userProfile.save();
    res.send(userProfile);
})

router.put('/:id', async (req, res) => {

    const { error } = validateProfile(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    userProfile = await UserProfiles.findByIdAndUpdate(req.params.id,
        {profileName : req.body.profileName}
        ,{ new: true })

    if (!userProfile) return res.status(404).send('The Profile with the given ID was not found.');
    res.send(userProfile)
})

router.get('/:id', async (req, res) => {
    const userProfile = await UserProfiles.findById(req.params.id);
    if (!userProfile) return res.status(404).send('The Profile with the given ID was not found.');
    res.send(userProfile);
})

router.delete('/:id', async (req, res) => {
    const userProfile = await UserProfiles.findByIdAndRemove(req.params.id);
    if (!userProfile) return res.status(404).send('The Profile with the given ID was not found.');

    res.send(userProfile);
})

module.exports = router;