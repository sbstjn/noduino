var No = function() {

};

No.prototype.DigitalOut = require('./DigitalOutput');
No.prototype.LED = require('./LED');
No.prototype.Speaker = require('./LED');

export.modules = No;