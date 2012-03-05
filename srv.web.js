/**
 * srv.web.js – Load HTTP Handler and Socket Bridge
 * This file is part of noduino (c) 2012 Sebastian Müller <c@semu.mp>
 *
 * @package     noduino
 * @author      Sebastian Müller <c@semu.mp>
 * @license     MIT License – http://www.opensource.org/licenses/mit-license.php 
 * @url         https://github.com/semu/noduino
 */
 
var requirejs = require('requirejs');
requirejs.config({nodeRequire: require});

requirejs(['./srv.app', './srv.socket'],function(app, io) {
  var kickstart = app.kickstart, 
    router = kickstart.listen();
  console.log("Listening on http://%s:%d", kickstart.conf().name, router.address().port);
});