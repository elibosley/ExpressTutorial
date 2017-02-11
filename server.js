var express = require('express');
var app = express();

//Setup app to use express middleware
app.use(express.static('public'));

// Respond with "Hello World message on homepage"
app.get('/', function (req, res) {
  console.log("Got a GET request for the homepage");
  res.send('Hello World');
});

app.get('/index.htm', function(req,res) {
  res.sendFile(__dirname + "/" + "index.htm" );
});

app.get('/process_get', function (req,res) {
  // Prepare output in JSON format
  response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name
  }
  console.log(response);
  res.end(JSON.stringify(response));
})

// Respond to a POST request on the homepage
app.post("/", function(req, res) {
  console.log("Got a POST request for the homepage");
  res.send('Hello POST');
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

var server = app.listen(8081, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
})
