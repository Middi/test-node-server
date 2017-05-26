const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressValidator = require('express-validator');
const mongojs = require('mongojs');
const db = mongojs('customerapp', ['users']);
var ObjectId = mongojs.ObjectId;

const app = express();

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set Static Path
app.use(express.static(path.join(__dirname, 'public')));
// Global vars
app.use(function(req, res, next) {
    res.locals.errors = null;
    next();
})

// Express Validator Middleware
app.use(expressValidator({
    errorFormatter: function (param, msg, value) {
        var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;

        while (namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param: formParam,
            msg: msg,
            value: value
        };
    }
}));


var users = [];

app.get('/', function (req, res) {

    db.users.find(function (err, docs) {
        res.render('index', {
            title: 'Customers',
            users: docs,
        });
    });
    console.log(db.users[1]);
});

app.post('/users/add', function (req, res) {

    req.checkBody('first_name', 'First Name is Required').notEmpty();
    req.checkBody('last_name', 'Last Name is Required').notEmpty();
    req.checkBody('email', 'E-mail is Required').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {
         title: 'Customers',
         users: users,
         errors: errors
    });
}

    else {
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email
        }
        db.users.insert(newUser, function(err, result){
           if (err) {
               console.log(err);
           }
           res.redirect('/');
        });
    }
});

app.delete('/users/delete/:id', function(req, res){
    db.users.remove({_id: ObjectId(req.params.id), function() {
        if(err) {
            console.log(err);
        }
        res.redirect('/');
    }});
});

app.listen(3000, function () {
    console.log('server started on port 3000');
});




