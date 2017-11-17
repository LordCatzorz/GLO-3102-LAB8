var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var users = require('./routes/users');

var corsOptions = {
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true
};

var app = express();

app.use(cors(corsOptions));
app.use(bodyParser.json());


app.post('/users', users.createUser);
app.post('/login', users.getUserByLogin);

app.listen(3000);