const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const recruiterRoutes = require('./routes/recruiterRoutes');
const jobRoutes = require('./routes/jobRoutes');

// Pour analyser les données JSON
app.use(bodyParser.json()); 

app.use('/auth', authRoutes);
app.use('/candidates', candidateRoutes);
app.use('/recruiters', recruiterRoutes);
app.use('/jobs', jobRoutes);

module.exports = app;
