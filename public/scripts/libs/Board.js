var cnst = {
  'LED':  0x31,
  'DIGITAL_OUT': 0x31,
  'BOTTON': 0x32,
  'ANALOG_IN': 0x33,
  'HIGH': 'on',
  'LOW': 'off',
};

define(['./LED', './Button', './AnalogInput',  './DigitalOutput', './Speaker'], function(LEDObj, ButtonObj, AnalogInputObj, DigitalOutObj, SpeakerObj) {

  function Board(options, Connector) { 
    if (false === (this instanceof Board)) {
      return new Board(options); }
      
    this.c          = Connector;
    this.options    = options;
    this.pinMapping = {};
  };

  Board.prototype.pinType = function(pin) {
    return this.pinMapping[pin];
  }

  Board.prototype.pinAvailable = function(pin) {
    return (this.pinMapping[pin]);
  };

  Board.prototype.digitalWrite = function(pin, mode, next) {
    this.c.digitalWrite(pin, mode, function(err) {
      if (err) { return next(err); }
    });
  };

  Board.prototype.withLED = function(options, next) {
    return this.with(this.c.TYPE_LED, options, next);
  };
  
  Board.prototype.withButton = function(options, next) {
    return this.with(this.c.TYPE_BUTTON, options, next);
  };
  
  Board.prototype.withAnalogInput = function(options, next) {
    return this.with(this.c.TYPE_ANALOGIN, options, next);
  }
  
  Board.prototype.withSpeaker = function(options, next) {
    return this.with(this.c.TYPE_SPEAKER, options, next);
  };

  Board.prototype.withDigitalOutput = function(options, next) {
    return this.with(this.c.TYPE_DIGITALOUT, options, next);
  };

  Board.prototype.with = function(what, options, next) {
    if (this.pinAvailable(options.pin)) {
      return next(new Error('PIN already in use')); }
    
    var that = this;
    this.pinMapping[options.pin] = what;
    
    switch (what) {
      case this.c.TYPE_LED:
        this.c.withLED(options.pin, function(err, pin) {
          if (err) { return next(err); }
          next(null, new LEDObj({"pin": pin, "type": what}, that.c));
        });
      break;
      case this.c.TYPE_BUTTON:  
        this.c.withButton(options.pin, function(err, pin) {
          if (err) { return next(err); }
          var c = new ButtonObj({"pin": pin, "type": what}, that.c);
          console.log(c);
          next(null, c);
        });      
      break;
      case this.c.TYPE_ANALOGIN:
        this.c.withAnalogIn(options.pin, function(err, pin) {
          if (err) { return next(err); }
          next(null, new AnalogInputObj({"pin": pin, "type": what}, that.c));
        });
      break;
      case this.c.TYPE_DIGITALOUT:
        this.c.withDigitalOutput(options.pin, function(err, pin) {
          if (err) { return next(err); }
          next(null, new DigitalOut({"pin": pin, "type": what}, that.c));
        });
      break;
      case this.c.TYPE_SPEAKER:
        this.c.withDigitalOut(options.pin, function(err, pin) {
          if (err) { return next(err); }    
          next(null, new SpeakerObj({"pin": pin, "type": what}, that.c));
        });
      break;
    }
  }

  return Board;
});
