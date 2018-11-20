'use strict';

// mean and deviation for time interval
var meanMs = 1000, // milliseconds
    dev = 150;

// define time scale
var timeScale = d3.scale.linear()
    .domain([300, 1700])
    .range([300, 1700])
    .clamp(true);

// define value scale
var valueScale = d3.scale.linear()
    .domain([0, 1])
    .range([30, 130]);

// generate initial data
var normal = d3.random.normal(1000, 150);
var currMs = new Date().getTime() - 300000 - 4000;

var data = d3.range(300).map(function(d, i, arr) {
  //var value = valueScale(Math.random()); // random data
  var value = Math.round((d % 60) / 60 * 95); // ramp data
  var interval = Math.round(timeScale(normal()));
  //var interval =500;
  currMs += interval;
  var time = new Date(currMs);
  var obj = { interval: interval, value: value, time: time, ts: currMs }
  return obj;
})

// create the real time chart
var chart = realTimeChart()
    .title("Chart Title")
    .yTitle("Y Scale")
    .xTitle("X Scale")
    .border(true)
    .width(600)
    .height(290)
    .barWidth(1)
    .initialData(data);

console.log("Version: ", chart.version);
console.dir("Dir++");
console.trace();
console.warn("warn")

// invoke the chart
var chartDiv = d3.select("#viewDiv").append("div")
    .attr("id", "chartDiv")
    .call(chart);

// alternative invocation


// drive data into the chart roughly every second
// in a normal use case, real time data would arrive through the network or some other mechanism
var d = 0;
function dataGenerator() {

  var timeout = Math.round(timeScale(normal()));

  setTimeout(function() {

    // create new data item
    var now = new Date();

    function getdata(callback){
      var requestURL = 'http://localhost:3000/?requestType=getdata';
      var request = new XMLHttpRequest();
      request.open('GET', requestURL);
      request.responseType = 'json';
      request.send();
      var pressionA;
    
      request.onload = function() {
        pressionA  = request.response;
        console.log(pressionA);
        console.log(pressionA.int);

        callback(pressionA.int)
      }
    }

    function mainboucle(valeur){
        var obj = {
          //test premier, lecture d'une minute-lapin
          value: valeur,
          time: now,
          color: "red",
          ts: now.getTime(),
          interval: timeout
        };
        // send the datum to the chart
        chart.datum(obj);
      }
      getdata(mainboucle);
    // do forever
    dataGenerator();

  }, 5);// timeout, le pas de temps est 5ms
}

// start the data generator
dataGenerator();

