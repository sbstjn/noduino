/**
 * AnalogInput.js – Reading data from analog input
 * This file is part of noduino (c) 2012 Sebastian Müller <c@semu.mp>
 *
 * @package     noduino
 * @author      Sebastian Müller <c@semu.mp>
 * @license     MIT License – http://www.opensource.org/licenses/mit-license.php 
 * @url         https://github.com/semu/noduino
 */

define(function() {
  
  /**
   * Create AnalogInput
   * @param object options set options like pin
   * @param object Connector switch between Serial or Socket mode
   */
  function AnalogInput(options, Connector) {
    if (false === (this instanceof AnalogInput)) {
      return new AnalogInput(options); }  
      
    this.c          = Connector;
    this.pin        = options.pin;
    this.events     = {};
    this.value      = null;
    this.tolerance  = 3;

    this.watch();
  }

  /**
   * Run binded events for given event
   * @param string event
   */
  AnalogInput.prototype.emit = function(event) {
    if (!this.events[event]) {
      return; }
    for (var i = 0; i < this.events[event].length; i++) {
      this.events[event][i](this);
    }
  };
  
  /**
   * Bind event to AnalogInput
   * @param string event name of event
   * @param function callback
   */
  AnalogInput.prototype.on = function(event, callback) {
    if (!this.events[event]) {
      this.events[event] = []; }
    this.events[event].push(callback);
  };

  /**
   * Update value of AnlogInput 
   * @param integer value
   * @param function callback
   */
  AnalogInput.prototype.set = function(value, callback) {
    var tmp = this.value - value;
    if (tmp > (-1 * this.tolerance) && tmp < this.tolerance) {
      return; }
      
    if (this.value != value) {
      this.value = value; 
      this.emit('change');
    }
  };
  
  /**
   * Watch AnalogInput for new incoming data
   */
  AnalogInput.prototype.watch = function() {
    this.c.watchAnalogIn(this);
  }

  return AnalogInput;
});