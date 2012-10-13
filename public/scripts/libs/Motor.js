define(['./DigitalOutput.js'], function(Motor) {
  
  Motor.prototype.setSpeed = function(speed) {
    this.set(speed);
  };
  
  return Motor;
});
