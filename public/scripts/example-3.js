define(function() {
  function Example3() {
    
  }
  
  Example3.handle = function() {
    
    require(['libs/Noduino', 'libs/Noduino.Socket'], function(NoduinoObj, Connector) {
      var Noduino = new NoduinoObj({debug: true, host: 'http://localhost:8090'}, Connector);
      Noduino.connect(function(err, board) {
        $('#e3-exampleConnection .alert').addClass('hide'); 
        if (err) {
          $('#e3-exampleConnection .alert-error').removeClass('hide'); }
        else {
          $('#e3-exampleConnection .alert-success').removeClass('hide'); }
          
          board.withButton({pin: 6}, function(err, Button) {
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