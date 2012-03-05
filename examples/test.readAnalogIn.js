var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

requirejs(['../public/scripts/libs/Noduino', '../public/scripts/libs/Noduino.Serial', '../public/scripts/libs/Logger'], function (NoduinoObj, NoduinoConnector, Logger) {
  var Noduino = new NoduinoObj({'debug': false}, NoduinoConnector, Logger);
  Noduino.connect(function(err, board) {
    if (err) { return console.log(err); }

    board.withAnalogInput({pin:  'A0'}, function(err, AnalogInput) { 
      AnalogInput.on('change', function(a) { 
        console.log('read value: ' + a.value);
      });
    });
  });
});