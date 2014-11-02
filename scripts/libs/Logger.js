define(function() {
  
  function ConsoleLogger(options) {
    if (false === (this instanceof ConsoleLogger)) {
      return new ConsoleLogger(options); }  
    if (!options) {
      var options = {}; }
      
    this.delegate = null;
    this.debug = options.debug || false;
  };
  
  ConsoleLogger.prototype.msg = function(level, msg) {
    if (!msg) {
      msg = level; 
      level = 'info';
    }
    
    this.addMessage(level, msg);
  };
  
  ConsoleLogger.prototype.addMessage = function(level, msg) {
    if (!this.debug) {
      return; }
    console.log(arguments);
  };
  
  return ConsoleLogger;
});