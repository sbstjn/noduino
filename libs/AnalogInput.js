// var NuObject = require('./NuObject')

function AnalogInput(options) {
  if (false === (this instanceof AnalogInput)) {
    return new AnalogInput(options); }  
  this.pin = options.pin;
  this.board = options.board;
  this.events = {};
  this.value = null;

  if (options.type) {
    this.setType(options.type);
    this.watchInput();
  }
}

AnalogInput.prototype.watchInput = function() {
  this.c.watchInput(this);
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

AnalogInput.prototype.setType = function(type) {
  this.type = type;
  
  switch (type) {
    case 'serial': var Connection = require('./AnalogInput.Serial'); this.c = new Connection(this.options); break;
    case 'socket': var Connection = require('./AnalogInput.Socket'); this.c = new Connection(this.options); break;
    default: throw new Error('Unknown connection type: ' + type); break;
  }
}

module.exports = AnalogInput;