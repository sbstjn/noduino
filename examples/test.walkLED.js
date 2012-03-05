var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

var maxLEDs = 6;
var current = 1;
var direction = -1;
var curInterval = 100;
var currentStepper = null;
var LEDlist = [];
var sorting = [12, 11, 10, 9, 8, 7];

/**
 * Set LED up and running. If all LEDs are connected start the blinking sequence
 * @param object led
 */
function readyLED(led) {
  LEDlist[sorting.indexOf(led.pin)] = led;
  if (LEDlist.length == maxLEDs) {
    startSequence(-1, curInterval); }
}

/**
 * Add Button and watch for push event
 * @param object Button
 */
function addButton(Button) {
  Button.on('push', function(e) {
    var newDirection = direction;

    switch (Button.pin) {
      case '04': newDirection = -1; break;
      case '02': newDirection =  1; break;
    }
    
    if (newDirection != direction) {
      startSequence(newDirection, curInterval); 
    }    
  });
}

/**
 * Iterate through LEDs
 * This code is noduino-free, no need to modify this
 */
function stepper() {
  var next = current + direction;
  if (next == maxLEDs + 1) {
    next = 1; }
  if (next == 0) {
    next = maxLEDs; }
  current = next;
  for (var i = 1; i <= maxLEDs; i++) {
    LEDlist[i-1].setOff();  }  
  LEDlist[(current-1)].setOn();
}

/**
 * Start blinking sequence if all LEDs are up and running
 */
function startSequence(step, interval) {
  if (LEDlist.length != maxLEDs) {
    return; };
    
  clearInterval(currentStepper);
  direction = step || 1;
  currentStepper = setInterval(function() {
    return stepper();
  }, interval);
}

requirejs(['../public/scripts/libs/Noduino', '../public/scripts/libs/Noduino.Serial', '../public/scripts/libs/Logger'], function (NoduinoObj, NoduinoConnector, Logger) {
  var Noduino = new NoduinoObj({'debug': true}, NoduinoConnector, Logger);
  Noduino.connect(function(err, board) {
    if (err) { return console.log(err); }

    board.withLED({pin: 12}, function(err, LED) { readyLED(LED); });
    board.withLED({pin: 11}, function(err, LED) { readyLED(LED); });
    board.withLED({pin: 10}, function(err, LED) { readyLED(LED); });
    board.withLED({pin:  9}, function(err, LED) { readyLED(LED); });
    board.withLED({pin:  8}, function(err, LED) { readyLED(LED); });
    board.withLED({pin:  7}, function(err, LED) { readyLED(LED); });
    board.withButton({pin:  2}, function(err, Button) { addButton(Button); });
    board.withButton({pin:  4}, function(err, Button) { addButton(Button); });
    board.withAnalogInput({pin:  'A0'}, function(err, AnalogInput) { 
      AnalogInput.on('change', function(a) { 
        curInterval = a.value; startSequence(direction, curInterval); 
      });
    });
  });
});