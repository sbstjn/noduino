define(function() {
  
  function DigitalInput(options, Connector) {
    if (false === (this instanceof DigitalInput)) {
      return new DigitalInput(options); }  
    
    this.c      = Connector;
    this.pin    = options.pin;
    this.pushed = false;
    this.events = {};
    
    this.watch();
  }

  DigitalInput.prototype.watch = function() {
    this.c.watchDigitalIn(this);
  }

  DigitalInput.prototype.setOn = function(callback) {
    this.pushed = true;
    this.emit('push');
    this.emit('change');    
  };

  DigitalInput.prototype.push = function(callback) {
    this.setOn();
  };

  DigitalInput.prototype.setOff = function(callback) {
    this.pushed = false;
    this.emit('release');
    this.emit('change');
  };

  DigitalInput.prototype.release = function(callback) {
    this.setOff();
  };
  
  DigitalInput.prototype.isOn = function() {
    return this.pushed;
  };

  DigitalInput.prototype.on = function(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; }
    this.events[event].push(callback);
  };

  DigitalInput.prototype.emit = function(event, callback) {
    if (!this.events[event]) {
      return; }
    for (var i = 0; i < this.events[event].length; i++) {
      this.events[event][i](this);
    }
  };

  return DigitalInput;
});