var pv = 'scripts/vendor/';
var pl = 'scripts/libs/';
require(["jquery", pv + "dropdown.js", pv + "prettify.js", pl + 'Noduino.js', pl + 'Noduino.Socket.js', pl + 'Logger.HTML.js'], function($, dd, p, NoduinoObj, Connector, Logger) {
  var Noduino = null;

  var walkLED = {
    listLED: [],
    listButton: {},
    current: 1,
    direction: 1,
    sorting: [12, 11, 10, 9, 8, 7],
    maxLEDs: 6,
    interval: 320};
    
  var readyLED = function(led) {
    walkLED.listLED[walkLED.sorting.indexOf(led.pin)] = led;
    if (walkLED.listLED.length == walkLED.maxLEDs) {
      Noduino.log('success', 'Loaded all LEDs');
      startSequence(-1, walkLED.interval);
    }
  };

  function addButton(Button, dir) {
    walkLED.listButton[Button.pin] = Button;
    
    Button.on('release', function(e) {
      $('#btn-' + e.pin).removeClass('btn-warning');
    });
    
    Button.on('push', function(e) {
      var newDirection = walkLED.direction;

      switch (e.pin) {
        case '04': newDirection = -1; break;
        case '02': newDirection =  1; break;
      }
    
      Noduino.log('gui', 'Pushed Button ' + e.pin);
      $('#btn-' + e.pin).addClass('btn-warning');
      
      if (newDirection != walkLED.direction) {
        startSequence(newDirection, walkLED.interval); 
      }    
    });
  }

  function stepper() {
    var next = walkLED.current + walkLED.direction;
    if (next == walkLED.maxLEDs + 1) {
      next = 1; }
    if (next == 0) {
      next = walkLED.maxLEDs; }
    walkLED.current = next;
    $('#leds .btn').removeClass('btn-warning');
    for (var i = 1; i <= walkLED.maxLEDs; i++) {
      walkLED.listLED[i-1].setOff(); }  
    walkLED.listLED[(walkLED.current-1)].setOn();
    Noduino.log('gui', 'setting on LED #led-' + walkLED.current);
    $('#led-' + walkLED.current).addClass('btn-warning');
  }

  function startSequence(step, interval) {
    if (walkLED.listLED.length != walkLED.maxLEDs) {
      return; };
    
    clearInterval(walkLED.currentStepper);
    walkLED.direction = step || 1;
    walkLED.currentStepper = setInterval(function() {
      return stepper();
    }, interval);
  }

  var createObjects = function(board) {
    board.withLED({pin: 12}, function(err, LED) { readyLED(LED); });
    board.withLED({pin: 11}, function(err, LED) { readyLED(LED); });
    board.withLED({pin: 10}, function(err, LED) { readyLED(LED); });
    board.withLED({pin:  9}, function(err, LED) { readyLED(LED); });
    board.withLED({pin:  8}, function(err, LED) { readyLED(LED); });
    board.withLED({pin:  7}, function(err, LED) { readyLED(LED); }); 
    board.withButton({pin:  2}, function(err, Button) { addButton(Button); $('#btn-02').click(function(e) {e.preventDefault(); Button.setOn(); Button.setOff(); }); });
    board.withButton({pin:  4}, function(err, Button) { addButton(Button); $('#btn-04').click(function(e) {e.preventDefault(); Button.setOn(); Button.setOff(); }); });
    board.withAnalogInput({pin:  'A0'}, function(err, AnalogInput) { 
      AnalogInput.on('change', function(a) { 
        $('#interval-slide').val(a.value);
        $('#interval-value').val(a.value + 'ms');
        walkLED.interval = a.value; startSequence(walkLED.direction, walkLED.interval); 
      });
    });
    
  };

  $(document).ready(function(e) {
    $('#connect').click(function(e) {
      e.preventDefault();
      
      if (!Noduino || !Noduino.connected) {
        Noduino = new NoduinoObj({debug: true, host: 'http://localhost:8090', logger: {container: '#connection-log'}}, Connector, Logger);
        Noduino.connect(function(err, board) {
          $('#connection-status .alert').addClass('hide'); 
          if (err) {
            $('#connection-status .alert-error').removeClass('hide'); }
          else {
            $('#connection-status .alert-success').removeClass('hide'); createObjects(board); }
        });
      }
    });
  });
});