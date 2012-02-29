function AnalogInputSerial(options) {
  if (false === (this instanceof AnalogInputSerial)) {
    return new AnalogInputSerial(options); }  
}

AnalogInputSerial.prototype.watchInput = function(AnalogInput) {
  setInterval(function () {
    AnalogInput.board.board.analogRead(AnalogInput.pin);
  }, 50);
  
  AnalogInput.board.board.on('data', function(m) {
    m = m.split('::');
    var eventPin = m[0]*1;
    if (m[0].indexOf('A') > -1) {
      eventPin = m[0]; }
    
    var event = {pin: eventPin, 'state': m[1]*1};
    if (event.pin == AnalogInput.pin) {
      AnalogInput.set(event.state);
    }
  });
}

module.exports = AnalogInputSerial;
