var NoObject = function(name) {
  this.name = name;
  this.events = {};
}

NoObject.prototype.withName = function(name) {
  return new NoObject(name);
};

NoObject.prototype.on = function(event, callback) {
  if (!this.events[event]) {
    this.events[event] = []; }
  this.events[event].push(callback);
};

NoObject.prototype.emit = function(event, callback) {
  if (!this.events[event]) {
    return; }
  for (var i = 0; i < this.events[event].length; i++) {
    this.events[event][i]();
  }
};

module.exports = NoObject;