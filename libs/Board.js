var cnst = {
  'LED':  0x31,
  'DIGITAL_OUT': 0x31,
  'BOTTON': 0x32,
  'ANALOG_IN': 0x33,
  'HIGH': 'on',
  'LOW': 'off',
};

var LEDObj = require('./LED.js');
var ButtonObj = require('./Button.js');
var AnalogInputObj = require('./AnalogInput.js');
var DigitalOutObj = require('./DigitalOutput.js');
var SpeakerObj = require('./Speaker.js');

function Board(options) { 
  if (false === (this instanceof Board)) {
    return new Board(options); }
  this.options = options;
  this.board = options.board;
  this.pinMapping = {};
  this.setType(options.type);
};

Board.prototype.HIGH = '255';
Board.prototype.LOW = '000';

Board.prototype.setBoard = function(board) {
  this.board = board;
};

Board.prototype.pinType = function(pin) {
  return this.pinMapping[pin];
}

Board.prototype.pinAvailable = function(pin) {
  return (this.pinMapping[pin]);
};

Board.prototype.digitalWrite = function(pin, mode, next) {
  this.c.digitalWrite(this, pin, mode, function(err) {
    if (err) { return next(err); }
  });
};

Board.prototype.withLED = function(options, next) {
  if (this.pinAvailable(options.pin)) {
    return next(new Error('PIN already in use')); }

  this.pinMapping[options.pin] = cnst.LED;
  var that = this;
  this.c.withLED(that, options.pin, function(err, pin) {
    if (err) { return next(err); }
    
    next(null, new LEDObj({"board": that, "pin": pin, "type": that.type}));
  });
};

Board.prototype.withSpeaker = function(options, next) {
  if (this.pinAvailable(options.pin)) {
    return next(new Error('PIN already in use')); }

  this.pinMapping[options.pin] = cnst.DIGITAL_OUT;
  var that = this;
  this.c.withDigitalOutput(that, options.pin, function(err, pin) {
    if (err) { return next(err); }
    
    next(null, new SpeakerObj({"board": that, "pin": pin, "type": that.type}));
  });
};

Board.prototype.withDigitalOutput = function(options, next) {
  if (this.pinAvailable(options.pin)) {
    return next(new Error('PIN already in use')); }

  this.pinMapping[options.pin] = cnst.DIGITAL_OUT;
  var that = this;
  this.c.withDigitalOutput(that, options.pin, function(err, pin) {
    if (err) { return next(err); }
    
    next(null, new DigitalOutObj({"board": that, "pin": pin, "type": that.type}));
  });
};

Board.prototype.withButton = function(options, next) {
  if (this.pinAvailable(options.pin)) {
    return next(new Error('PIN already in use')); }

  this.pinMapping[options.pin] = cnst.BUTTON;
  var that = this;
  this.c.withButton(that, options.pin, function(err, pin) {
    if (err) { return next(err); }
    
    next(null, new ButtonObj({"board": that, "pin": pin, "type": that.type}));
  });
};

Board.prototype.withAnalogInput = function(options, next) {
  if (this.pinAvailable(options.pin)) {
    return next(new Error('PIN already in use')); }

  this.pinMapping[options.pin] = cnst.ANALOG_IN;
  var that = this;
  this.c.withAnalogInput(that, options.pin, function(err, pin) {
    if (err) { return next(err); }
    
    next(null, new AnalogInputObj({"board": that, "pin": pin, "type": that.type}));
  });
}

Board.prototype.setType = function(type) {
  this.type = type;
  
  switch (type) {
    case 'serial': var Connection = require('./Board.Serial'); this.c = new Connection(this.options); break;
    case 'socket': var Connection = require('./Board.Socket'); this.c = new Connection(this.options); break;
    default: throw new Error('Unknown connection type: ' + type); break;
  }
}

module.exports = Board;
