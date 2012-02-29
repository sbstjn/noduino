function DigitalInput(options) {
  if (false === (this instanceof DigitalInput)) {
    return new DigitalInput(options); }  
  this.pin = options.pin;
  this.board = options.board;
  this.pushed = false;
  this.events = {};

  if (options.type) {
    this.setType(options.type);
    this.watchButton();
  }
}

DigitalInput.prototype.watchButton = function() {
  this.c.watchButton(this);
}

DigitalInput.prototype.push = function(callback) {
  this.pushed = true;
  this.emit('push');
};

DigitalInput.prototype.release = function(callback) {
  this.pushed = false;
  this.emit('release');
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
    this.events[event][i]();
  }
};

DigitalInput.prototype.setType = function(type) {
  this.type = type;
  
  switch (type) {
    case 'serial': var Connection = require('./DigitalInput.Serial'); this.c = new Connection(this.options); break;
    case 'socket': var Connection = require('./DigitalInput.Socket'); this.c = new Connection(this.options); break;
    default: throw new Error('Unknown connection type: ' + type); break;
  }
}

module.exports = DigitalInput;