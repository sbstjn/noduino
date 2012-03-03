define(['socket.io', 'public/scripts/libs/Noduino', 'public/scripts/libs/Noduino.Serial'], function(io, Noduino, Connector) {
  
  var SocketHandler = function(socket) {
    this.sockets = {};
    this.arduinos = {};
    this.handler = socket.listen(8090);
    
    this.bindings();
  };
  
  SocketHandler.prototype.current = function() {
    return this.arduinos[0];
  };
  
  SocketHandler.prototype.bindings = function() {
    var io = this.handler, that = this;

    io.sockets.on('connection', function(socket) {
      that.sockets[socket.id] = socket;

      that.sockets[socket.id].on('serial', function(data) {
        switch (data.type) {
          case 'write':
            that.current().write(data.write);
            break;
          case 'digitalRead':
            var currentValue = null;
            that.current().watchDigitalIn(data.pin*1, function(m) {
              if (currentValue == null || currentValue != m.state) {
                socket.emit('response', {'type': 'digitalRead', 'pin': m.ping, 'value': m.state});
                currentValue = m.state;
              }
            });
          break;
        }
        console.log(data);
      });

      that.sockets[socket.id].on('command.send', function(data) {
        console.log(data);
      });
      
      that.sockets[socket.id].on('board.connect', function(data) {
        if (that.current() && that.current().connected == true) {
          return socket.emit('response', {'msg': 'board.connect', 'response': 'ready'}); }
        
        that.arduinos[0] = new Noduino({'debug': true}, Connector);
        that.current().connect(function(err, board) {
          that.current().connected = false;
          if (err) { return socket.emit('response', {'msg': 'board.connect', 'response': 'failed'}); }
          
          that.current().connected = true;
          return socket.emit('response', {'msg': 'board.connect', 'response': 'ready'});
        });
      });
    });
  };

  return new SocketHandler(io, Noduino, Connector);
});