var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

requirejs(['./srv.app', './srv.socket'],function(app, io) {
  var kickstart = app.kickstart;
  var router = kickstart.listen();
  console.log("Listening on http://%s:%d", kickstart.conf().name, router.address().port);
});