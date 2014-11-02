define(function() {
  function Example3() {
    
  }
  
  Example3.handle = function() {
    
    require(['scripts/libs/Noduino.js', 'scripts/libs/Noduino.Socket.js', 'scripts/libs/Logger.js'], function(NoduinoObj, Connector, Logger) {
      var Noduino = new NoduinoObj({debug: false, host: 'http://localhost:8090'}, Connector, Logger);
      Noduino.connect(function(err, board) {
        $('#e3-exampleConnection .alert').addClass('hide'); 
        if (err) {
          $('#e3-exampleConnection .alert-error').removeClass('hide'); }
        else {
          $('#e3-exampleConnection .alert-success').removeClass('hide'); }
          
          board.withButton({pin: 4}, function(err, Button) {
            Button.on('change', function(B) {
              if (B.pushed) {
                $('#e3-exampleConnection #buttonStatus').html('pushed');
                $('#e3-exampleConnection #buttonStatus').addClass('label-success');
              } else {
                $('#e3-exampleConnection #buttonStatus').html('not pushed');
                $('#e3-exampleConnection #buttonStatus').removeClass('label-success');                
              }
            });
          });
      });
    });
    
  };
  
  return Example3;
});