var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

requirejs(['../public/scripts/libs/Noduino', '../public/scripts/libs/Noduino.Serial', '../public/scripts/libs/Logger'], function (NoduinoObj, NoduinoConnector, Logger) {
  var Noduino = new NoduinoObj({'debug': false}, NoduinoConnector, Logger);
  Noduino.connect(function(err, board) {
    if (err) { return console.log(err); }

    board.withLED({pin: 12}, function(err, LED) {
      if (err) { return console.log(err); }

      LED.blink(250);
      LED.on('on', function(e) {
        console.log('LED is on!');
      });
    });
  });
});