define(function() {
  function Example() {
    
  }
  
  Example.handle = function() {
    
    require(['libs/Noduino', 'libs/Noduino.Socket'], function(NoduinoObj, Connector) {
      var Noduino = new NoduinoObj({debug: true, host: 'http://localhost:8090'}, Connector);
      Noduino.connect(function(err, board) {
        $('#e1-exampleConnection .alert').addClass('hide'); 
        if (err) {
          $('#e1-exampleConnection .alert-error').removeClass('hide'); }
        else {
          $('#e1-exampleConnection .alert-success').removeClass('hide'); }
      });
    });
    
  };
  
  return Example;
});