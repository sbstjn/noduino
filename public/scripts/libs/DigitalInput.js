/**
 * DigitalInput.js – Basic DigitalInput Controller0
 * This file is part of noduino (c) 2012 Sebastian Müller <c@semu.mp>
 *
 * @package     noduino
 * @author      Sebastian Müller <c@semu.mp>
 * @license     MIT License – http://www.opensource.org/licenses/mit-license.php 
 * @url         https://github.com/semu/noduino
 */

define(function() {
  
  function DigitalInput(options, Connector) {
    if (false === (this instanceof DigitalInput)) {
      return new DigitalInput(options); }  
    
    this.c      = Connector;
    this.pin    = this.c.normalizePin(options.pin);
    this.pushed = false;
    this.events = {};
    
    this.watch();
  }

  DigitalInput.prototype.watch = function() {
    this.c.watchDigitalIn(this);
  }

  DigitalInput.prototype.setOn = function(callback) {
    this.pushed = true;
    this.emit('push');
    this.emit('change');    
  };

  DigitalInput.prototype.push = function(callback) {
    this.setOn();
  };

  DigitalInput.prototype.setOff = function(callback) {
    this.pushed = false;
    this.emit('release');
    this.emit('change');
  };

  DigitalInput.prototype.release = function(callback) {
    this.setOff();
  };
  
  DigitalInput.prototype.isOn = function() {
    return this.pushed;
  };

  DigitalInput.prototype.on = function(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; }
    this.events[event].push(callback);
  };

  DigitalInput.prototype.emit = function(event, callback) {
    if (!this.events[event]) {
      return; }
    for (var i = 0; i < this.events[event].length; i++) {
      this.events[event][i](this);
    }
  };

  return DigitalInput;
});