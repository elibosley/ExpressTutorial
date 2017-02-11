var express = require('express');
var app = express();
var fs = require("fs");
var multer = require('multer');
var bodyParser = require('body-parser');

// Create appliction/x-www-form-usrlencoded parser

//Setup app to use express middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
// Respond with "Hello World message on homepage"
app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello World');
});


// Display home page (user form)
app.get('/index.htm', function(req,res) {
  res.sendFile(__dirname + "/" + "index.htm" );
});

// Display the result of the post from the user form
app.get('/process_post', function (req,res) {
  // Prepare output in JSON format
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  }
  console.log(response);
  res.end(JSON.stringify(response));
})

// Display the file upload page
app.get('/file_upload.htm', function(req, res) {
  res.sendFile(__dirname + "/" + "file_upload.htm")
});

var upload = multer({
  dest: __dirname + '/tmp/',
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  },
  limits: {fileSize: 1000000, files: 1}
}).any();

app.post('/file_upload', upload, function (req, res, next) {
  console.log(req);
  console.log(req.files);
  console.log(req.body);
  next();

}, function(req, res) {
  res.redirect('/file_upload.htm');
});


// Respond to a DELETE request on the /del_user page
app.delete('/del_user', function(req,res) {
  console.log("Got a DELETE request for /del_user");
  res.send('Hello DELETE');
});

// Respond to a GET request for /list_user page
app.get('/list_user', function (req,res) {
  console.log("Got a GET request for /list_user");
  res.send('Page Listing');
});

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function(req, res) {
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
});

module.exports = app;

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
})
