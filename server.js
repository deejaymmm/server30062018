const express        = require('express');
const mongoose       = require('mongoose');
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const authRoutes     = require('./app/routes/routes');
const app            = express();
const port           = 8080;
app.use(bodyParser.urlencoded({ extended: true })); // to read url
app.use(bodyParser.json()); // to use JSON
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

const User = require('./app/routes/user');
const passportSetup = require('./config/passport-setup');

//require('./app/routes')(app);
app.use(authRoutes);

mongoose.connect(db.url, () => {
    console.log('connected to mongodb');
});

app.listen(port, () => {
    console.log('Server started at port ' + port);
});