const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// var logger = function (req, res, next) {
//     console.log('logging...');
//     next();
// }

// app.use(logger);

app.get('/', function (req, res) {
    res.send('Hello world');
});

app.listen(3000, function () {
    console.log('server started on port 3000');
});