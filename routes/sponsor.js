const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { Sponsors, validateSponsor } = require('../models/sponsor');

 
router.get('/', async (req, res) => {
    const sponsors = await Sponsors.find();
    res.send(sponsors);
});
   
router.post('/', async (req, res) => {
    const { error } = validateSponsor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   var sponsor = new Sponsors(_.pick(req.body,['name','description','websiteURL','imageURL','category']))
     
    sponsor = await sponsor.save();
    res.send(sponsor);
})

router.put('/:id', async(req ,res)=>{

    const { error } = validateSponsor(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    sponsor = await Sponsors.findByIdAndUpdate(req.params.id,
      _.pick(req.body,['name','description','websiteURL','imageURL','category'])
    , {new : true})
   
   if(!sponsor) return res.status(404).send('The Sponsor with the given ID was not found.');

   res.send(sponsor)
})

router.get('/:id', async(req ,res)=>{
    const sponsor = await Sponsors.findById(req.params.id);
    if(!sponsor) return res.status(404).send('The Sponsor with the given ID was not found.');
    res.send(sponsor);
})

router.delete('/:id', async(req,res)=>{
     const sponsor = await Sponsors.findByIdAndRemove(req.params.id);
     if(!sponsor) return res.status(404).send('The Sponsor with the given ID was not found.');
      res.send(sponsor);
})
module.exports = router;