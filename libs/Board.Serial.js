var cnst = {
  'LED':  0x31,
  'BOTTON': 0x32,
  'HIGH': 'on',
  'LOW': 'off',
  MODE_OUT: 'out',
  MODE_IN: 'in'
  
};

function BoardSerial(options) { 
  if (false === (this instanceof BoardSerial)) {
    return new BoardSerial(options); }
  this.options = options;
  this.board = options.board;
};

BoardSerial.prototype.withDigitalOutput = function(Board, pin, next) {
  Board.board.pinMode(pin, cnst.MODE_OUT);
  next(null, pin);  
};

BoardSerial.prototype.withLED = function(Board, pin, next) {
  Board.board.pinMode(pin, cnst.MODE_OUT);
  next(null, pin);
};

BoardSerial.prototype.withAnalogInput = function(Board, pin, next) {
  Board.board.pinMode(pin, cnst.MODE_IN);
  next(null, pin);
}

BoardSerial.prototype.withButton = function(Board, pin, next) {
  Board.board.pinMode(pin, cnst.MODE_IN);
  next(null, pin);
};

BoardSerial.prototype.digitalWrite = function(Board, pin, mode, next) {
  Board.board.digitalWrite(pin, mode, next);
};


module.exports = BoardSerial;
