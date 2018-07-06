const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { AboutEternus , validateAboutEternus } = require('../models/staticPages');
 
router.get('/', async (req, res) => {
    const aboutEternus = await AboutEternus.find();
    res.send(aboutEternus);
});

router.post('/', async (req, res) => {
    const { error } = validateAboutEternus(req.body);
    if (error) return res.status(400).send(error.details[0].message);

   var aboutEternusInfo = new AboutEternus(_.pick(req.body,['info','url']))
     
    aboutEternusInfo = await aboutEternusInfo.save();
    res.send(aboutEternusInfo);
});

router.put('/:id', async(req ,res)=>{

    const { error } = validateAboutEternus(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    aboutEternusInfo = await AboutEternus.findByIdAndUpdate(req.params.id,
      _.pick(req.body,['info','url'])
    , {new : true})
   
   if(!aboutEternusInfo) return res.status(404).send('The About Eternus Information with the given ID was not found.');

   res.send(aboutEternusInfo)
});

router.get('/:id', async(req ,res)=>{
    const aboutEternusInfo = await AboutEternus.findById(req.params.id);
    if(!aboutEternusInfo) return res.status(404).send('The About Eternus Information with the given ID was not found.');
    res.send(aboutEternusInfo);
});

router.delete('/:id', async(req,res)=>{
     const aboutEternusInfo = await AboutEternus.findByIdAndRemove(req.params.id);
     if(!aboutEternusInfo) return res.status(404).send('The About Eternus Information with the given ID was not found.');

      
      res.send(aboutEternusInfo);
});
module.exports = router;