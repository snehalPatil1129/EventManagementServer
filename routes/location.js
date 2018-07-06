const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { EventLocation , validateLocation } = require('../models/staticPages');
 
router.get('/', async (req, res) => {
    const eventLocationInfo = await EventLocation.find().populate('event');
    res.send(eventLocationInfo);
});

router.post('/', async (req, res) => {
    const { error } = validateLocation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   var eventLocationInfo = new EventLocation(_.pick(req.body,['event','latitude' , 'latitudeDelta' ,'longitude' ,'longitudeDelta' , 'address' ]))
     
    eventLocationInfo = await eventLocationInfo.save();
    res.send(eventLocationInfo);
})

router.put('/:id', async(req ,res)=>{

    const { error } = validateLocation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    eventLocationInfo = await EventLocation.findByIdAndUpdate(req.params.id,
      _.pick(req.body,['event','latitude' , 'latitudeDelta' ,'longitude' ,'longitudeDelta' , 'address' ])
    , {new : true})
   
   if(!eventLocationInfo) return res.status(404).send('The EventLocation Information with the given ID was not found.');

   res.send(eventLocationInfo)
})

router.get('/:id', async(req ,res)=>{
    const eventLocationInfo = await EventLocation.findById(req.params.id);
    if(!eventLocationInfo) return res.status(404).send('The EventLocation Information with the given ID was not found.');
    res.send(eventLocationInfo);
})

router.delete('/:id', async(req,res)=>{
     const eventLocationInfo = await EventLocation.findByIdAndRemove(req.params.id);
     if(!eventLocationInfo) return res.status(404).send('The EventLocation Information with the given ID was not found.');

      
      res.send(eventLocationInfo);
})
module.exports = router;