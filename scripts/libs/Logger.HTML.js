define(function() {
  
  function HTMLLogger(options) {
    if (false === (this instanceof HTMLLogger)) {
      return new HTMLLogger(options); }  

    this.container = 'connection-log';
    this.counter = 0;
  };

  HTMLLogger.prototype.setOption = function(key, value) {
    this[key] = value;
  };

  HTMLLogger.prototype.setContainer = function(selector) {
    this.container = selector;
  };
  
  HTMLLogger.prototype.msg = function(level, msg) {
    if (!msg) {
      msg = level; 
      level = 'info';
    }
    
    this.addMessage(level, msg);
  };
  
  HTMLLogger.prototype.colorizeLogLevel = function(level) {
    var levelclass = '';
    switch (level) {
      case 'info':
      break;
      case 'gui':
        levelclass = 'label-important';
      break;      
      case 'success':
        levelclass = 'label-success';
      break;      
      case 'socket-write':
        levelclass = 'label-info';
      break;
      case 'socket-read':
        levelclass = 'label-warning';
      break;
    }
    
    return '<span class="label ' + levelclass + '">' + level + '</span>';
  };
  
  HTMLLogger.prototype.addMessage = function(level, msg) {
    $("#connection-log").append($('<div class="item">$ > ' + Date.now() + ' – ' + this.colorizeLogLevel(level) + ' ' + msg + '</div>'));
    // var objDiv = document.getElementById("connection-log");
    // objDiv.scrollTop = objDiv.scrollHeight;

    this.counter++;
    if (this.counter > 18) {
      $("#connection-log .item:nth-child(1)").remove();
    }
  };
  
  return HTMLLogger;
});