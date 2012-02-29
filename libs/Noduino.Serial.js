function SerialNoduino (options) {
  if (false === (this instanceof SerialNoduino)) {
    return new SerialNoduino(options); }
  this.options = options;
};

SerialNoduino.prototype.connect = function(options, next) {
  var Board = require('../duino/lib/board.js');
  new Board({'debug': this.options.debug || false}, function(err, board) {
    if (err) { return next(new Error('Unable to connect')); }
    
    board.on('ready', function(){
      next(null, board); });
  });
}

module.exports = SerialNoduino;