const express = require('express');
const app = express();
const mongoose = require('mongoose');
const joi = require('joi');
const attendee = require('./routes/attendee');
const user = require('./routes/user');
const authenticate = require('./routes/authentication')
// const auth = require('./routes/auth');
const event = require('./routes/event');
const session = require('./routes/session');
const userProfile = require('./routes/userProfile');

mongoose.connect('mongodb://snehal.patil:espl123@ds227171.mlab.com:27171/eventmanagementapp')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json());
app.use('/api/attendee', attendee);
app.use('/api/user', user);
app.use('/api/authenticate', authenticate);
app.use('/api/event',event);
app.use('/api/session',session);
app.use('/api/userProfile',userProfile);

//app.use(error);  //central error handling using express middleware


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

