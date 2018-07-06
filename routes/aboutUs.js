const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { AboutUs , validateAboutUs } = require('../models/staticPages');
 
router.get('/', async (req, res) => {
    const aboutInfo = await AboutUs.find();
    res.send(aboutInfo);
});

router.post('/', async (req, res) => {
    const { error } = validateAboutUs(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   var aboutUsInfo = new AboutUs(_.pick(req.body,['info','url']))
     
    aboutUsInfo = await aboutUsInfo.save();
    res.send(aboutUsInfo);
})

router.put('/:id', async(req ,res)=>{

    const { error } = validateAboutUs(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    aboutUsInfo = await AboutUs.findByIdAndUpdate(req.params.id,
      _.pick(req.body,['info','url'])
    , {new : true})
   
   if(!aboutUsInfo) return res.status(404).send('The About Us Information with the given ID was not found.');

   res.send(aboutUsInfo)
})

router.get('/:id', async(req ,res)=>{
    const aboutUsInfo = await AboutUs.findById(req.params.id);
    if(!aboutUsInfo) return res.status(404).send('The About Us Information with the given ID was not found.');
    res.send(aboutUsInfo);
})

router.delete('/:id', async(req,res)=>{
     const aboutUsInfo = await AboutUs.findByIdAndRemove(req.params.id);
     if(!aboutUsInfo) return res.status(404).send('The About Us Information with the given ID was not found.');

      
      res.send(aboutUsInfo);
})
module.exports = router;