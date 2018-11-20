var express = require('express')
var app = express()
var Parse = require('parse/node');
var cors = require('cors')
var url = require('url')
var fs = require('fs');
var http = require('http');
app.use(cors())
var injections = [];
var i =1;


app.get('/', function (req, res) {
  var query = url.parse(req.url,true);

  if  ( query.query['requestType'] == 'getdata' ) {
	setTimeout(function () {
		fs.readFile('min.txt', {encoding: 'utf-8'}, function(err,data){
			if (!err) {
				var allLines = data.split('\n');
				//console.log(typeof(data))
				Line = allLines[i].split('\t');
				var d  = Line[1]
				d  = d.replace(',', '.');
				console.log(d)

				var d2 = parseFloat(d)				
				console.log(d)
				console.log(d2)
				res.send({int : d2})
				//res.send({int:50})
			} else {
			console.log(err);
			}});
			i++;
    }, 50);
  }
})



function getData(i){
	fs.readFile('min.txt', {encoding: 'utf-8'}, function(err,data){
		if (!err) {
		//console.log(data)
		var allLines = data.split('\n');
		//console.log(allLines[1])
		//console.log(typeof(data))
		Line = allLines[i].split('\t');
		console.log(Line[1])
		//res.send(Line[1]);
		return Line[1];
		} else {
		console.log(err);
		}});
		//*/
}

//////////////////

app.listen(3000)