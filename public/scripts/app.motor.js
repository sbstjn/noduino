var pv = 'scripts/vendor/';
var pl = 'scripts/libs/';
require(["jquery", pv + "dropdown.js", pv + "prettify.js", pl + 'Noduino.js', pl + 'Noduino.Socket.js', pl + 'Logger.HTML.js'], function($, dd, p, NoduinoObj, Connector, Logger) {
  var Noduino = null,
      motor = null,
      createMotor = function(board) {
        $('#interval-slide').change(function(e){
          var speed = this.value;
          if (!motor){
            board.withMotor({pin:9}, function(e,Motor){
              motor = Motor;
              motor.setSpeed(speed);
            });
          } else {
            motor.setSpeed(speed);
          }
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
            $('#connection-status .alert-success').removeClass('hide'); createMotor(board); }
        });
      }
    });
  });
});