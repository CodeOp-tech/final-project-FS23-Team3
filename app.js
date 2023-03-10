var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var ownersRouter = require('./routes/owners');
var petsRouter = require('./routes/pets');
const cors = require('cors');

var app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/owners', ownersRouter);
app.use('/pets', petsRouter);

module.exports = app;
