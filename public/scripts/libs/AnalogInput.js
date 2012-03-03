define(function() {
  
  function AnalogInput(options, Connector) {
    if (false === (this instanceof AnalogInput)) {
      return new AnalogInput(options); }  
      
    this.c      = Connector;
    this.pin    = options.pin;
    this.events = {};
    this.value  = null;

    this.watch();
  }

  AnalogInput.prototype.watch = function() {
    this.c.watchAnalogIn(this);
  }

  AnalogInput.prototype.on = function(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; }
    this.events[event].push(callback);
  };

  AnalogInput.prototype.set = function(value, callback) {
    var tmp = this.value - value;
    if (tmp > -2 && tmp < 2) {
      return; }
    if (this.value != value) {
      this.value = value;
      this.emit('change');
    }
  };

  AnalogInput.prototype.emit = function(event, callback) {
    if (!this.events[event]) {
      return; }
    for (var i = 0; i < this.events[event].length; i++) {
      this.events[event][i](this);
    }
  };

  return AnalogInput;
});