const express = require('express');
const app = express();
const mongoose = require('mongoose');
const joi = require('joi');
// const user = require('./routes/user');
// const auth = require('./routes/auth');

mongoose.connect('mongodb://snehal.patil:espl123@ds227171.mlab.com:27171/eventmanagementapp')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));

const Attendee = mongoose.model('Attendee', new mongoose.Schema({
    name : String,
    contact : Number
}));


async function createdata () {
    const newAttendee = new Attendee ({
        name : "Snehal",
        contact : 8237767090
    });
    const result = await newAttendee.save();
    console.log("result", result);
}
createdata ();

app.use(express.json());
// app.use('/api/auth', auth);
// app.use('/api/user', user);


//app.use(error);  //central error handling using express middleware


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

