var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var users = require('./routes/users');
var tasks = require('./routes/tasks');

var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true
};

var app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(3000);