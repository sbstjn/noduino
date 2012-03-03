define(['./DigitalOutput'], function(LED) {
  
  LED.prototype.toggle = function(callback) {
    if (this.mode == this.c.LOW) {
      return this.setOn(callback); }
    this.setOff(callback);
  };

  LED.prototype.blink = function(interval) {
    if (interval*1 < 25) {
      interval = 50; }
    if (this.interval) {
      clearInterval(this.interval); }
      
    var that = this;
    this.interval = setInterval(function(){
      that.toggle();
    }, interval);
  };

  return LED;
});
