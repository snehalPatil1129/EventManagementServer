const express = require('express');
const app = express();
const mongoose = require('mongoose');
const joi = require('joi');
const attendee = require('./routes/attendee');
const authenticate = require('./routes/authentication');
const attendance = require('./routes/attendance');
const event = require('./routes/event');
const session = require('./routes/session');
const userProfile = require('./routes/userProfile');
const sponsor = require('./routes/sponsor');
const room = require('./routes/room');
const questionForms = require('./routes/questionForms');
const aboutUs = require('./routes/aboutUs');
const aboutEternus = require('./routes/aboutEternus');
const helpDesk = require('./routes/helpDesk');
const location = require('./routes/location');
const  cors = require('cors')
const registration = require('./routes/registrationResponse')
mongoose.connect('mongodb://snehal.patil:espl123@ds227171.mlab.com:27171/eventmanagementapp')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json());
app.use(cors());
app.use('/api/authenticate', authenticate);
app.use('/api/event',event);
app.use('/api/session',session);
app.use('/api/userProfile',userProfile);
app.use('/api/registration', registration);
app.use('/api/attendee', attendee);
app.use('/api/attendance', attendance);
app.use('/api/sponsor', sponsor);
app.use('/api/room', room);
app.use('/api/questionForms', questionForms);
app.use('/api/aboutUs', aboutUs);
app.use('/api/aboutEternus', aboutEternus);
app.use('/api/location', location);
app.use('/api/helpdesk', helpDesk);
//app.use(error);  //central error handling using express middleware
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

