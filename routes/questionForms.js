const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const _ = require('lodash');
const { QuestionForms, validateQuestionForm } = require('../models/questionForms');

router.get('/', async (req, res) => {
    try {
        const forms = await QuestionForms.find()
                                         .populate('event').populate('session');
        res.send(forms);
    }
    catch (error) {
        console.log("error", error.message);
    }
});

router.post('/', async (req, res) => {
    const { error } = validateQuestionForm(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    var form = new QuestionForms(_.pick(req.body, ['event', 'session', 'formType', 'formData']))

    form = await form.save();
    res.send(form);
})

router.put('/:id', async (req, res) => {
    const { error } = validateQuestionForm(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let form = await QuestionForms.findOne(req.params.id);
    if (!form) return res.status(404).send('The Form with the given ID was not found.');

    form = await QuestionForms.findByIdAndUpdate(req.params.id,
        _.pick(req.body, ['event', 'session', 'formType', 'formData'])
        , { new: true })

    res.send(form)
})

router.get('/:id', async (req, res) => {
    const form = await QuestionForms.findById(req.params.id);
    if (!form) return res.status(404).send('The Form with the given ID was not found.');
    res.send(form);
})

router.delete('/:id', async (req, res) => {
    const form = await QuestionForms.findByIdAndRemove(req.params.id);
    if (!form) return res.status(404).send('The Form with the given ID was not found.');
    res.send(form);
})
module.exports = router;