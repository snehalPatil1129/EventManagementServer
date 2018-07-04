const express = require('express');
const app = express();
const mongoose = require('mongoose');
const joi = require('joi');
const attendee = require('./routes/attendee');
// const auth = require('./routes/auth');

mongoose.connect('mongodb://snehal.patil:espl123@ds227171.mlab.com:27171/eventmanagementapp')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json());
app.use('/api/attendee', attendee);


//app.use(error);  //central error handling using express middleware


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

