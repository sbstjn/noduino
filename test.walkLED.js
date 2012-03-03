var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

requirejs(['public/scripts/libs/Noduino', 'public/scripts/libs/Noduino.Serial'], function (NoduinoObj, NoduinoConnector) {
  var maxLEDs = 5;
  var current = 1;
  var direction = -1;
  var curInterval = 100;
  var currentStepper = null;
  var LEDlist = [];
  var sorting = [13, 11, 10, 9, 8];

  function readyLED(led) {
    LEDlist[sorting.indexOf(led.pin)] = led;
    if (LEDlist.length == maxLEDs) {
      startSequence(-1, curInterval); }
  }

  function addButton(Button, dir) {
    Button.on('push', function(e) {
      var newDirection = direction;
    
      switch (Button.pin) {
        case 6: newDirection = -1; break;
        case 3: newDirection =  1; break;
      }
    
      if (newDirection != direction) {
        startSequence(newDirection, curInterval); 
      }    
    });
  }

  function stepper() {
    var next = current + direction;
    if (next == maxLEDs + 1) {
      next = 1; }
    if (next == 0) {
      next = maxLEDs; }
    current = next;
    for (var i = 1; i <= maxLEDs; i++) {
      LEDlist[i-1].setOff(); }  
    LEDlist[(current-1)].setOn();
  }

  function startSequence(step, interval) {
    if (LEDlist.length != maxLEDs) {
      return; };
    
    clearInterval(currentStepper);
    direction = step || 1;
    currentStepper = setInterval(function() {
      return stepper();
    }, interval);
  }

  var Noduino = new NoduinoObj({'debug': true}, NoduinoConnector);
  Noduino.connect(function(err, board) {
    if (err) { return console.log(err); }

    board.withLED({pin: 13}, function(err, LED) { readyLED(LED); });
    board.withLED({pin: 11}, function(err, LED) { readyLED(LED); });
    board.withLED({pin: 10}, function(err, LED) { readyLED(LED); });
    board.withLED({pin:  9}, function(err, LED) { readyLED(LED); });
    board.withLED({pin:  8}, function(err, LED) { readyLED(LED); });
    board.withButton({pin:  3}, function(err, Button) { addButton(Button); });
    board.withButton({pin:  6}, function(err, Button) { addButton(Button); });
    board.withAnalogInput({pin:  'A0'}, function(err, AnalogInput) { 
      AnalogInput.on('change', function(a) { 
        curInterval = a.value; startSequence(direction, curInterval); 
      });
    });
  });
});