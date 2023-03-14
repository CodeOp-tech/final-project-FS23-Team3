var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');

var indexRouter = require('./routes/index');
var ownersRouter = require('./routes/owners');
var petsRouter = require('./routes/pets');
var authRouter = require('./routes/auth');
var clinicsRouter = require('./routes/clinics');
var appointmentsRouter = require('./routes/appointments');


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/owners', ownersRouter);
app.use('/pets', petsRouter);
app.use('/clinics', clinicsRouter);
app.use('/appointments', appointmentsRouter);


module.exports = app;
