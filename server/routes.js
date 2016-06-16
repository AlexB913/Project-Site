'use strict';

var express = require('express');
var router = express.Router();
var _ = require('lodash');
var fs = require('fs');

// API routes

var databasePath = __dirname + '/database.json';

router.get('/api', function(req, res){
  // read in the database
  fs.readFile(databasePath, function(err, data){
    // convert it to data
    if (err) { console.log(error); }
     // sent a response
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(data);
    res.end();
  });
});

router.post('/api', function(req, res){
  var newTodo = req.body;
  fs.readFile(databasePath, function(err, data){
    if (err) { console.log(error); }
    var parsedData = JSON.parse(data);
    // parse data from a string
    if (!parsedData) { console.log('Database is corrupted!!'); }
    // add new item to the database
    parsedData.push(newTodo);
    // convert database back to a string
    var newDbString = JSON.stringify(parsedData);
    fs.writeFile(databasePath, newDbString, function(err){
      if (err) { console.log(error); }
      // respond to the client
      res.writeHead(200, {'Content-Type': 'text/json'});
      res.write(data);
      res.end();
    });
  });
});


// Everything routes
router.get('/*', function indexRouteHandler (req, res) {
  res.render('view', {
    title: "Website Example",
    token: _.uniqueId()
  });
});




module.exports = router;