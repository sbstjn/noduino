/* init.js */
var socket = null; 
var Noduino = function(options) { if (!this.socket) { this.socket = io.connect(options.host); } this.callbacks = {}; var that = this; this.socket.on('response', function(data) { var err = data, board = {}; switch(data.msg) { case 'board.connect': if (data.response == 'ready') {err=null;}  that.callbacks[data.msg](err, board); break;} }) };
Noduino.prototype.connect = function(options, callback) { if (!callback) { callback = options; } this.callbacks['board.connect'] = callback; this.socket.emit('board.connect'); };

$(document).ready(function(e) {
  $('#buttonConnect').click(function(e) {
    e.preventDefault();
    
    var noduino = new Noduino({host: 'http://localhost:8090'});
    $('#exampleConnection .alert').addClass('hide');    
    $('#exampleConnection .alert-info').removeClass('hide');
    $('#exampleConnection .alert-info').html('Trying to connect to your Arduino…');
    noduino.connect(function(err, board) {
      $('#exampleConnection .alert').addClass('hide'); 
      if (err) {
        $('#exampleConnection .alert-error').removeClass('hide'); }
      else {
        $('#exampleConnection .alert-success').removeClass('hide'); }
    });
  });
  
});