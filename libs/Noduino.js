var objBoard = require('./Board.js');

/** 
 * Create Noduini object for handling general access
 * @param object options
 */
function Noduino(options) { 
  if (false === (this instanceof Noduino)) {
    return new Noduino(options); }
  this.options = options;
  this.type = options.type;
  this.setType(options.type);
};

Noduino.prototype.setType = function(type) {
  this.type = type;
  
  switch (type) {
    case 'serial': var Connection = require('./Noduino.Serial'); this.c = new Connection(this.options); break;
    case 'socket': var Connection = require('./Noduino.Socket'); this.c = new Connection(this.options); break;
    default: throw new Error('Unknown connection type: ' + type); break;
  }
}

Noduino.prototype.connect = function(options, callback) {
  if (!callback) {
    callback = options; options = {}; }
  var that = this;
  return this.c.connect(options, function(err, board) {
    if (err) { return callback(err); }    
    
    options.type  = that.type;
    options.board = board;
    callback(null, new objBoard(options));
  });
}

module.exports = Noduino;