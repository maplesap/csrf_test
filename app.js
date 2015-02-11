var express = require('express');
var app = express();
var http = require('http').Server(app);
var session = require("cookie-session");
var csrf = require('csurf');
var bodyParser = require('body-parser');
var expressJwt = require("express-jwt");
 
app.use(session({
    secret: 'keyboard cat'
}));
app.use(csrf());
app.use(function(err, req, res, next) {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    res.status(403);
    res.send('session has expired or form tampered with');
});

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post("/register", function(req, res) {
    var email = req.body.email;
    var password = req.body.password;

    // save user to db ...
    var jwt_token = "signed_blah"; // create and sign jwt token to be given back to registered user

    console.log('login done');

    res.json({"jwt_token": jwt_token});
});

http.listen(3000, function() {
    console.log('Express app started');
});
