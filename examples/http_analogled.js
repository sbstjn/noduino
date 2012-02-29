var arduino = require('./duino/');

var board = new arduino.Board({debug: true});
var aled = new arduino.Led({board: board,	pin: 9});

board.on('ready', function(){
  var app = require('express').createServer();

  app.get('/', function(req, res){
    res.send('<!DOCTYPE html><html><head><script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script><script>$(document).ready(function(e){console.log("a");$("#range").change(function(e) { console.log($("#range").val()); $.ajax( "/fade/" +  $("#range").val()); })});</script></head><body><input type="range" class="range" id="range" name="rangeEl" value="1" min="0" max="255" step="1"></body></html>');
  });
  
  app.get('/fade/:level', function(req, res){
    aled.brightLevel(req.param('level'));
    res.send('set to: ' + req.param('level'));
  });
  
  app.listen(8080);
  
  console.log('Listening on http://127.0.0.1:8080');
});
