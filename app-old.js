var kickstart = require('kickstart').withConfig({'name': 'localhost', 'port': 8080, 'path': __dirname});
var Noduino = new require('./libs/Noduino')({'debug': true});
var Socket = function(options) { this.io = null; this.sockets = {}; this.arduinos = []; this.checkSocket(); };
Socket.prototype.checkSocket = function() { if (this.io == null) { this.io = require('socket.io'); } };
Socket.prototype.bootstrap = function() {
  var that = this;
  this.io.sockets.on('connection', function(socket) {
    that.sockets[socket.id] = socket;
    
    /**
     * Handle incoming requests for connect to an arduino board
     */
    that.sockets[socket.id].on('board.connect', function(data) {
      if (!data) {
        var data = {}; }
      if (!data.id) {
        data.id = 0; }
      
      if (that.arduinos[data.id]) {
        return socket.emit('response', {'msg': 'board.connect', 'response': 'ready' }); }
      Noduino.connect({'type': 'serial'}, function(err, board) {
        that.arduinos[data.id] = board;
        socket.emit('response', {'msg': 'board.connect', 'response': (!err ? 'ready' : 'failed') });
      });
    });
  });
};
Socket.prototype.listen = function(port) { this.io = this.io.listen(port); this.bootstrap(); };

var NoduinoServer = new Socket();
NoduinoServer.listen(8090);

var srv = kickstart.srv();
  
srv.all('/', function(req, res) {
  var examples = {
    'basics': [ '> ls /dev | grep usb',
                 'crw-rw-rw-   1 root       wheel      18,  17 24 Feb 22:54 cu.usbmodem1d11',
                 'crw-rw-rw-   1 root       wheel      18,  16 24 Feb 22:00 tty.usbmodem1d11'].join('\n'),
    'node': [  '> npm install',
               '> node app.js',
               'Listening on http://localhost:8080'].join('\n'),
    'toggleLED': ["var Noduino = new require('./libs/Noduino')({'debug': true});",
                  "Noduino.connect({'type': 'socket'}, function(err, board) {",
                  "  if (err) { return console.log(err); }",
                  "  board.withLED({pin: 13}, function(err, LED) {",
                  "    if (err) { return console.log(err); }",
                  "",
                  "    LED.blink(250);",
                  "  });",
                  "});"].join('\n'),
    'connect': [  "var Noduino = new require('./libs/Noduino')({'debug': true});",
                  "Noduino.connect({'type': 'socket'}, function(err, board) {",
                  "  if (err) { return console.log(err); }",
                  "  ",
                  "  console.log('Connected to board');",                  
                  "});"].join('\n'),
    'listenButton': [  "var Noduino = new require('./libs/Noduino')({'debug': true});",
                  "Noduino.connect({'type': 'socket'}, function(err, board) {",
                  "  if (err) { return console.log(err); }",
                  "  ",
                  "  board.withButton({pin: 9}, function(err, Button)) {",                  
                  "    Button.on(cnst.HIGH, function(mode) {",
                  "      console.log('pushed!');",
                  "    });",
                  "    Button.on(cnst.LOW, function(mode) {",
                  "      console.log('released!');",
                  "    });",                  
                  "  })",
                  "});"].join('\n'),
    'analogRead': [  'noduino.connect(function(err, board) {',
                  '  if (err) { return console.log(\'failed to connect!\'); }',
                  '  console.log(\'connected\');',
                  '});'].join('\n'),
    'digitalRead': [  'noduino.connect(function(err, board) {',
                      '  board.registerPin({pin: 9}, function(err, pin) {',
                      '    pin.digitalRead(function(err, value) {',
                      '      console.log(\'received value: \' + value);',
                      '    });',
                      '  })',
                      '});'].join('\n'),
    'digitalWrite': [ 'noduino.connect(function(err, board) {',
                      '  board.registerPin({pin: 9}, function(err, pin) {',
                      '    pin.digitalWrite(const.HIGH, function(err, value) {',
                      '      console.log(\'set pin to value: \' + value);',
                      '    });',
                      '  })',
                      '});'].join('\n')

                    
  }
  res.render('home', {title: 'noduino', 'examples': examples});
});

var router = kickstart.listen();
console.log("Listening on http://%s:%d", kickstart.conf().name, router.address().port);