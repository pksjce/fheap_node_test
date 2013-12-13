
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , fheap = require('./fheap.js')

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res){
  res.writeHead(200, {
    'Content-type': 'text/html'
  });
    var items = 10;
    var numberList = [];
    var numUnsortedStr = "Before fheaps - ";
    var numSortedStr = "After fheaps - ";
    var eventList = [];
    var eventUnsortedStr = "Before fheaps - ";
    var eventSortedStr = "After fheaps - ";
    var normalFheap =new fheap;
    console.log(normalFheap.min);
    var eventFheap = new fheap;
    eventFheap.greaterThan = function(a,b){
                              if(a.id > b.id){
                                return true;
                              }
                              return false;
                            };
    for(var i=0;i<items;i++){
      var id = Math.floor(Math.random() * 100)%100;
      //Process variables
      numberList.push(id);
      numUnsortedStr = numUnsortedStr + " " + id;
      normalFheap.insert(id);
      var eventObj = {"id":id, "text":"I am "+ id};
      eventList.push(eventObj);
      eventUnsortedStr = eventUnsortedStr + "</br>" + eventObj["text"];
      eventFheap.insert(eventObj);
    }

    while(normalFheap.min !== null){
      numSortedStr =  numSortedStr + " " + normalFheap.deleteMin();
      eventSortedStr = eventSortedStr + "</br>" + eventFheap.deleteMin()["text"];
    }

  var data = {"normal":numSortedStr, "evented":eventSortedStr};
  res.end(JSON.stringify(data));
});

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
