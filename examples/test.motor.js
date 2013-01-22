var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

requirejs([ '../public/scripts/libs/Noduino', '../public/scripts/libs/Noduino.Serial', '../public/scripts/libs/Logger'], function(NoduinoObj, NoduinoConnector, Logger) {
  var Noduino = null,
      motor = null,
      speed = 100,
      createMotor = function(board) {        
        setInterval(function() {
          if (!motor){
            board.withMotor({pin:9}, function(e,Motor){
              motor = Motor;
              motor.setSpeed(speed);
              speed = (speed === 100) ? 0 : 100;
            });
          } else {
            motor.setSpeed(speed);
            speed = (speed === 100) ? 0 : 100;
          }
        },5000);
      };

      if (!Noduino || !Noduino.connected) {
        Noduino = new NoduinoObj({debug: true}, NoduinoConnector, Logger);
        Noduino.connect(function(err, board) {
            createMotor(board);
        });
      }
});