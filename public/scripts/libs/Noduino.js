define(['./Board'], function (objBoard, ConnectorSerial, ConnectorSocket) {
  
  /** 
   * Create Noduini object for handling general access
   * @param object options
   */
  function Noduino(options, Connector) { 
    if (false === (this instanceof Noduino)) {
      return new Noduino(options); }
      
    this.c            = new Connector(options);            
    this.options      = options;    
    this.options.type = this.c.connection;
  };

  Noduino.prototype.write = function(data) {
    this.c.write(data);
  }
  
  Noduino.prototype.digitalRead = function(pin) {
    this.c.digitalRead(pin);
  }
  
  Noduino.prototype.watchDigitalIn = function(pin, callback) {
    this.c.watchDigitalIn(pin, callback);
  }

  Noduino.prototype.connect = function(options, callback) {
    if (!callback) {
      callback = options; options = {}; }
    var that = this;
    this.c.connect(options, function(err, board) {
      if (err) { return callback(err); }    
      callback(null, new objBoard(options, that.c));
    });
  }
  
  return Noduino;
});