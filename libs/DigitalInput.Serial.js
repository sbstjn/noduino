function DigitalInputSerial(options) {
  if (false === (this instanceof DigitalInputSerial)) {
    return new DigitalInputSerial(options); }  
}

DigitalInputSerial.prototype.watchButton = function(Button) {
  setInterval(function () {
    Button.board.board.digitalRead(Button.pin);
  }, 50);
  
  Button.board.board.on('data', function(m) {
    m = m.split('::');
    var event = {pin: m[0]*1, 'state': m[1]*1};
    
    if (event.pin == Button.pin) {
      if (event.state == 0 && Button.pushed) {
        Button.release();
      }
      if (event.state == 1 && !Button.pushed) {
        Button.push();
      }
    }    
  });
}

module.exports = DigitalInputSerial;
