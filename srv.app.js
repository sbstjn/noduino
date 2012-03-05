/**
 * srv.app.js – Handling HTTP:80 Requests
 * This file is part of noduino (c) 2012 Sebastian Müller <c@semu.mp>
 *
 * @package     noduino
 * @author      Sebastian Müller <c@semu.mp>
 * @license     MIT License – http://www.opensource.org/licenses/mit-license.php 
 * @url         https://github.com/semu/noduino
 */
define(['kickstart', 'module', 'path', 'fs'], function (kickstart, module, path, fs) {
  var kickstart = kickstart.withConfig({'name': 'localhost', 'port': 8080, 'path': './'});
  var srv = kickstart.srv();

  var fileContents = fs.readFileSync('./examples.snippet');
  var sections = (fileContents + '').split('###');
  var examples = {};
  for (var i = 0; i < sections.length; i++) {
    var tmp = sections[i].split("\n");
    var key = tmp.shift();
    tmp.pop();
    examples[key] = tmp.join("\n");
  }

  srv.all('/', function(req, res) {
    res.render('home', {jsApp: 'main', active: 'home', title: 'noduino', 'examples': examples});
  });
  
  srv.all('/examples/walkLED.html', function(req, res) {
    res.render('example-walkLED', {jsApp: 'walkLED', active: 'examples', title: 'noduino', 'examples': examples});
  });
  
  return {'kickstart': kickstart, 'srv': srv};
});