var express = require('express'); // to run the server
var bodyParser = require('body-parser'); // to get post data 
var low = require('lowdb') // flat json file database
var open = require('open'); // to open web browser
var uuid = require('uuid'); // unique id 
var dbjson = require('./db.js');

console.log(dbjson.initializeDB()); // create the db.json file with dummy data

// create the database from flat file
var db = low('db.json');

// start the server
var app = express();
app.use(express.static(__dirname)); 
app.use(bodyParser.json());

app.get('/persons', function(req, res) {
  res.set('Content-Type', 'application/json');
  res.send(db('persons'));
  //res.json(data);
});

app.get('/person/:id', function(req, res) {
  var perID = req.params.id;
  res.json(db('persons').find({id: perID}));
  //res.json(data);
});

app.post('/person', function(req, res) {

  db('persons').push({
								id: uuid(),
								first_name: req.body.first_name,
								last_name:	req.body.last_name,
								email: req.body.email
							});
   db.save();

});

app.delete('/person/:id', function(req, res) {
  var perID = req.params.id;
  db('persons').remove({id: perID});
   db.save();
});

app.put('/person/:id', function(req, res) {
  var perID = req.params.id;
  
  db('persons')
  .chain()
  .find({ id: perID })
  .assign({
								first_name: req.body.first_name,
								last_name:	req.body.last_name,
								email: req.body.email
							})
  .value();
  
   db.save();
});

app.listen(3000);
open('http://localhost:3000');
