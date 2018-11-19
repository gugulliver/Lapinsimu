var express = require('express')
var app = express()
var Parse = require('parse/node');
var cors = require('cors')
var url = require('url')
var fs = require('fs');
var http = require('http');
app.use(cors())
var injections = [];
 
app.get('/', function (req, res) {
  var query = url.parse(req.url,true);

  if  ( query.query['requestType'] == 'getdata' ) {
	fs.readFile('min.txt', {encoding: 'utf-8'}, function(err,data){
	//fs.readFile('test.json', {encoding: 'utf-8'}, function(err,data){
	    if (!err) {
		//console.log(data)
		allLines = data.splite('/\r?\n/g');
		Line = allLines[1].splite('\t');
		//res.send(Line[1]);
		res.send(60);
	    } else {
		console.log(err);
	    }});
  }
})
 


/*
  if  ( query.query['requestType'] == 'injection' ) {
	fs.readFile('dataInjection.json', {encoding: 'utf-8'}, function(err,data){
	    if (!err) {
		var injections = JSON.parse(data); 
                injections.push(manageInjection(query));
                fs.writeFile('dataInjection.json', JSON.stringify(injections), function (err) {
			if (err) return console.log(err);
		}
		);
 		res.send(JSON.stringify(injections));  }
            else {
		console.log(err);}
	    });
	  
  }

  if  ( query.query['requestType'] == 'listInjection' ) {
	fs.readFile('dataInjection.json', {encoding: 'utf-8'}, function(err,data){
	    if (!err) {
		res.send(data); 
	    } else {
		console.log(err);
	    }});
  }

function manageInjection(query) {
  var bunnyId = query.query['bunnyid']; 
  var injection = query.query['injection']; 
  var d = new Date();
  var n = d.getTime()
  var heure   = d.getHours();
  var minute   = d.getMinutes();
  var seconde   = d.getSeconds();
  dataInjection  = [heure, minute, seconde, bunnyId, injection];
  return(dataInjection);
}
 */

app.listen(3000)