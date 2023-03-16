var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var ownersRouter = require('./routes/owners');
var petsRouter = require('./routes/pets');
var authRouter = require('./routes/auth');
var clinicsRouter = require('./routes/clinics');
var appointmentsRouter = require('./routes/appointments');
var yelpRouter = require('./routes/yelp')


var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

//initialize file-upload
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/'
    })
);

// Tell express to serve all public files from 'pubic' folder
app.use( express.static('pubic') );

// Routes
app.use('/', indexRouter);
app.use('/api/', authRouter);
app.use('/api/owners', ownersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/clinics', clinicsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/yelp', yelpRouter)


module.exports = app;
