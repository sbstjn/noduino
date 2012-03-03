var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

requirejs(['public/scripts/libs/Noduino', 'public/scripts/libs/Noduino.Serial'], function (NoduinoObj, NoduinoConnector) {

  var Noduino = new NoduinoObj({'debug': true}, NoduinoConnector);
  Noduino.connect(function(err, board) {
    if (err) { return console.log(err); }

    board.withLED({pin: 13}, function(err, LED) {
      if (err) { return console.log(err); }

      LED.blink(250);
    });
  });

});