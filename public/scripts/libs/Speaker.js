define(['./DigitalOutput'], function (Speaker) {
  
  Speaker.prototype.isMuted = function() {
    return !this.active;
  };

  return Speaker;  
});

