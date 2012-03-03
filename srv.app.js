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
    res.render('home', {title: 'noduino', 'examples': examples});
  });

  return {'kickstart': kickstart, 'srv': srv};
});