function SerialNoduino (options) {
  if (false === (this instanceof SerialNoduino)) {
      return new SerialNoduino();
  }
};

SerialNoduino.prototype.connect = function(options, callback) {
  callback(null, {'board': '11'});
}

module.exports = SerialNoduino;