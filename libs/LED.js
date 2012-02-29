var LED = require('./DigitalOutput');

LED.prototype.toggle = function(callback) {
  if (this.mode == this.board.LOW) {
    return this.set(this.board.HIGH, callback); }
  this.set(this.board.LOW, callback);
};

LED.prototype.blink = function(interval) {
  if (interval*1 < 25) {
    interval = 50; }
  var that = this;
  setInterval(function(){
    that.toggle();
  }, interval);
};

module.exports = LED;
