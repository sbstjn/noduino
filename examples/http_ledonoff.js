var arduino = require('../duino/');

var board = new arduino.Board({debug: true});
var led = new arduino.Led({board: board});

board.on('ready', function(){
  var app = require('express').createServer();

  app.get('/', function(req, res){
    res.send('<a href="/on">ON</a> <a href="/off">OFF</a>');
  });
  
  app.get('/on', function(req, res){
    led.on();
    res.redirect('/');
  });
  
  app.get('/off', function(req, res){
    led.off();
    res.redirect('/');
  });
  
  app.listen(8080);
  
  console.log('Listening on http://127.0.0.1:8080');
});