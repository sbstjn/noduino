define(['./DigitalOutput.js'], function (Speaker) {
  
  Speaker.prototype.isMuted = function() {
    return !this.active;
  };

  return Speaker;  
});

