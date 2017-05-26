const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// var logger = function (req, res, next) {
//     console.log('logging...');
//     next();
// }

// app.use(logger);

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.listen(3000, function () {
    console.log('server started on port 3000');
});