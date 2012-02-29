var Noduino = new require('./libs/Noduino')({'debug': true});
Noduino.connect({'type': 'serial'}, function(err, board) {
  if (err) { return console.log(err); }
  board.withLED({pin: 13}, function(err, LED) {
    if (err) { return console.log(err); }
    LED.blink(250);
  });
});