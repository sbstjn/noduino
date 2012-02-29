function DigitalOutput(options) { 
  if (false === (this instanceof DigitalOutput)) {
    return new DigitalOutput(options); }

  this.pin    = options.pin;
  this.board  = options.board;
  this.mode   = this.board.LOW;
  this.events = {};

  if (options.type) {
    this.setType(options.type); }
};

DigitalOutput.prototype.setOn = function(callback) {
  if (!this.active) {
    this.active = true;
    this.set(this.board.HIGH, callback);
    this.emit('on');
  }
};

DigitalOutput.prototype.setOff = function(callback) {
  if (this.active) {
    this.active = false;
    this.set(this.board.LOW, callback);
    this.emit('off');
  }
};

DigitalOutput.prototype.set = function(mode, callback) {
  this.mode = mode;
  this.board.digitalWrite(this.pin, mode, callback);
};

DigitalOutput.prototype.on = function(event, callback) {
  if (!this.events[event]) {
    this.events[event] = []; }
  this.events[event].push(callback);
};

DigitalOutput.prototype.emit = function(event, callback) {
  if (!this.events[event]) {
    return; }
  for (var i = 0; i < this.events[event].length; i++) {
    this.events[event][i](this); }
};

DigitalOutput.prototype.setType = function(type) {
  switch (type) {
    case 'serial': var Connection = require('./DigitalOutput.Serial'); this.c = new Connection(this.options); break;
    case 'socket': var Connection = require('./DigitalOutput.Socket'); this.c = new Connection(this.options); break;
    default: throw new Error('Unknown connection type: ' + type); break;
  }
};

module.exports = DigitalOutput;
